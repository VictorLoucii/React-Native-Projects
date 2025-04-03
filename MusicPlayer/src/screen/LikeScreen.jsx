//@ts-check
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React from 'react';

//constants:
import { fontSize, iconSizes, spacing } from '../constants/dimensions';

//icons:
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { fontFamilies } from '../constants/fonts';
import SongCard from '../components/SongCard';
import FloatingPlayer from '../components/FloatingPlayer';
import useLikedSongs from '../store/likeStore';
import { useNavigation, useTheme } from '@react-navigation/native';
import TrackPlayer from 'react-native-track-player';

const LikeScreen = () => {
  const { colors } = useTheme();
  const { likedSongs } = useLikedSongs();
  const navigation = useNavigation();

  const goToPrevScreen = () => {
    navigation.goBack();
  };
    const handPlayTrack = async (selectedSong, songs = likedSongs) => {
      // const songs = likedSongs;  you can do this if you don't want to pass songs = item.songs as a parameter
      console.log('selected song----- ', selectedSong);
      console.log('songs:------ ', songs)
      // find the index of the song user clicked on
      const trackIndex = songs.findIndex(
        (track) => track.url === selectedSong.url
      )
      console.log('trackIndex:----- ', trackIndex);
      //if track doesn't exist
      if(trackIndex === -1) return;
      // create two array of songs :
      const beforeTracks = songs.slice(0, trackIndex);   //array**before** the clicked song.
      const afterTracks = songs.slice(trackIndex + 1);  //array**after** the clicked song.
  
      await TrackPlayer.reset();
  
      await TrackPlayer.add(selectedSong);
      await TrackPlayer.add(afterTracks);
      await TrackPlayer.add(beforeTracks);
  
      await TrackPlayer.play();
    };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={goToPrevScreen}>
          <AntDesign
            name={'arrowleft'}
            color={colors.iconPrimary}
            size={iconSizes.medium}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <SimpleLineIcons
            name={'equalizer'}
            color={colors.iconPrimary}
            size={iconSizes.medium}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        ListHeaderComponent={<Text style={[styles.headingText, {color: colors.textPrimary}]}>Liked Song</Text>}
        data={likedSongs}
        numColumns={2}
        renderItem={({ item }) => (
          <SongCard
            containerStyle={{ width: '47%' }}
            imageStyle={{
              height: 160,
              width: 160,
            }}
            item={item}
            handlePlay={(item) =>{
              handPlayTrack(item, likedSongs);
            }}
          />
        )} //renderItem and SongCard component ends here
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginVertical: spacing.large,
        }}
        contentContainerStyle={{
          paddingBottom: 400,
          paddingHorizontal: 20,
        }}
      />
      <FloatingPlayer />
    </View>
  );
};

export default LikeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.background,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.medium,
    paddingTop: spacing.medium,
  },
  headingText: {
    fontSize: fontSize.xtraLarge,
    // color: colors.textPrimary,
    // fontFamily: 'Gilroy-Bold'
    fontFamily: fontFamilies.bold,
    paddingVertical: spacing.large,
    // paddingHorizontal: spacing.large,
  },
});
