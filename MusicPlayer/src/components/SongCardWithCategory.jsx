//@ts-check
import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import { fontFamilies } from '../constants/fonts';
import { fontSize, spacing } from '../constants/dimensions';
import SongCard from './SongCard';
import TrackPlayer from 'react-native-track-player';
import { useTheme } from '@react-navigation/native';

const SongCardWithCategory = ({ item }) => {
  const { colors } = useTheme();
  //creating a function that will play songs in queue:
  const handPlayTrack = async (selectedSong, songs = item.songs) => {
    // const songs = item.songs;  you can do this if you don't want to pass songs = item.songs
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
    <View style={styles.container}>
      <Text style={[styles.headingText, {color: colors.textPrimary}]}>{item.title}</Text>
      <FlatList
        data={item.songs}
        renderItem={({item}) => ( 
          <SongCard 
            item = {item}
            handlePlay = {(selectedSong) => {
              console.log('handlePlay was called!');
              console.log('selected song: ', selectedSong);
              handPlayTrack(selectedSong,item.songs)
            }}
          />
        )}
        showsHorizontalScrollIndicator = {false}
        horizontal={true}
        ItemSeparatorComponent={
          <View style={{ marginHorizontal: spacing.small }} />
        }
        contentContainerStyle={{
          paddingHorizontal: spacing.large,
        }}
      />
    </View>
  );
};

export default SongCardWithCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingText: {
    fontSize: fontSize.large,
    // fontFamily: 'Gilroy-Bold'
    fontFamily: fontFamilies.bold,
    paddingVertical: spacing.large,
    paddingHorizontal: spacing.large,
  },
});
