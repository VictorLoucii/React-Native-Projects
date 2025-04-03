//@ts-check
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, { act, useEffect, useState } from 'react';
//constants:
import { fontSize, iconSizes, spacing } from '../constants/dimensions';
import { fontFamilies } from '../constants/fonts';

import SongCard from '../components/SongCard';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import PlayerRepeatToggle from '../components/PlayerRepeatToggle';
import PlayerShuffle from '../components/PlayerShuffleToggle';
import PlayerProgressBar from '../components/PlayerProgressBar';
import {
  GoToNextButton,
  GoToPreviousButton,
  PlayPauseButton,
} from '../components/PlayerControls';
import TrackPlayer, { useActiveTrack } from 'react-native-track-player';
import { useNavigation, useTheme } from '@react-navigation/native';
import useLikedSongs from '../store/likeStore';
import { isExist } from '../utils';

const imageUri =
  'https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/000/287/325x325/mortals-feat-laura-brehm-1586948734-yFnA6l5Geq.jpg';

const PlayerScreen = () => {
  const { colors } = useTheme();

  const { likedSongs, addToLiked } = useLikedSongs();
  console.log('liked songs:---', likedSongs);
  const navigation = useNavigation();
  const activeTrack = useActiveTrack();
  console.log('Active track:----', activeTrack);
  const [isMute, setIsMute] = useState(false);

  useEffect(() => {
    setVolumeIcon();
  }, [])

  const setVolumeIcon = async() => {
    const volume = await TrackPlayer.getVolume();
    setIsMute(volume === 0? true : false);
  }
  // const isLiked = false;
  const goToPrevScreen = () => {
    navigation.goBack();
  }
  // if(!activeTrack){
  //   return(
  //     <View style = {{justifyContent: 'center', alignItems: 'center', flex: 1}} >
  //       <ActivityIndicator size={'large'} color={colors.iconPrimary} />
  //     </View>
  //   )
  // }
  
  const handleToggleVolume = () => {
    TrackPlayer.setVolume(isMute? 1: 0);
    setIsMute(!isMute);
  }


  return (
    <View style={[styles.container, {backgroundColor: colors.background,}]}>
      {/* header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={goToPrevScreen}>
          <AntDesign
            name={'arrowleft'}
            size={iconSizes.large}
            color={colors.iconPrimary}
          />
        </TouchableOpacity>
        <Text style={[styles.headerText, {color: colors.textPrimary,}]}>Now Playing</Text>
      </View>
      {/* Image */}
      <View style={styles.coverImageContainer}>
        <Image
          source={{ uri: activeTrack?.artwork ?? 'No image' }}
          style={styles.coverImage}
        />
      </View>
      {/* render title, artist name and heart icon */}
      <View style={styles.titleRowHeartContainer}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, {color: colors.textPrimary,}]}>
            {activeTrack?.title ?? 'unknown title'}
          </Text>
          <Text style={[styles.artist, {color: colors.textSecondary,}]}>
            {activeTrack?.artist ?? 'unknown artist'}
          </Text>
        </View>
        <TouchableOpacity onPress={() => addToLiked(activeTrack)}>
          <AntDesign
            name={isExist(likedSongs, activeTrack) ? 'heart' : 'hearto'}
            color={colors.iconSecondary}
            size={iconSizes.medium}
          />
        </TouchableOpacity>
      </View>
      {/* render player controls */}
      <View style={styles.playerControlContainer}>
        <TouchableOpacity style={styles.volumeWrapper}
          onPress={handleToggleVolume}
        >
          <Feather
            name={isMute ? 'volume-x' : 'volume-1'}
            size={iconSizes.large}
            color={colors.iconSecondary}
          />
        </TouchableOpacity>
        <View style={styles.repeatShuffleWrapper}>
          <PlayerRepeatToggle />
          <PlayerShuffle />
        </View>
      </View>
      {/* player progress bar */}
      <PlayerProgressBar />
      <View style={styles.playPauseContainer}>
        <GoToPreviousButton />
        <PlayPauseButton />
        <GoToNextButton />
      </View>
    </View>
  );
};

export default PlayerScreen;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: colors.background,
    flex: 1,
    paddingHorizontal: spacing.large,
    paddingTop: spacing.large,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  headerText: {
    fontSize: fontSize.xtraLarge,
    // color: colors.textPrimary,
    fontFamily: fontFamilies.medium,
    flex: 1,
    textAlign: 'center',
  },
  coverImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.xtraLarge,
  },
  coverImage: {
    height: 300,
    width: 300,
    // borderRadius: spacing.small,
    alignItems: 'center',
  },
  titleRowHeartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: fontSize.large,
    // color: colors.textPrimary,
    fontFamily: fontFamilies.bold,
  },
  artist: {
    fontSize: fontSize.medium,
    // color: colors.textSecondary,
    fontFamily: fontFamilies.medium,
  },
  playerControlContainer: {
    marginVertical: spacing.large,
    flexDirection: 'row',
    alignItems: 'center',
  },
  volumeWrapper: {
    // width: '90%',   //this can be substitue for flex: 1
    flex: 1, //Since volumeWrapper(TouchableOpacity which contains volume icon) has flex: 1, it stretches to take up all available space as much as possible inside its parent (playerControlContainer).The View (which contains the shuffle and repeat buttons) remains on the right side because it doesn't have flex: 1, meaning it only takes up the space it needs.
  },
  repeatShuffleWrapper: {
    flexDirection: 'row',
    gap: spacing.medium,
  },
  playPauseContainer: {
    marginVertical: spacing.xtraLarge,
    flexDirection: 'row',
    gap: spacing.xtraLarge,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
