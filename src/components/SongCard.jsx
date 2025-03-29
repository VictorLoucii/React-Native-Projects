import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { fontFamilies } from '../constants/fonts';
import { fontSize, spacing } from '../constants/dimensions';
import TrackPlayer from 'react-native-track-player';
import { useTheme } from '@react-navigation/native';

const imageUrl =
  'https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/000/936/325x325/royalty-1619082030-xBgqGZWLw9.jpg';
const SongCard = ({ item, containerStyle, imageStyle, handlePlay }) => {
  const { colors } = useTheme();
  // const handlePlay = async () => {
  //   // await TrackPlayer.pause()
  //   await TrackPlayer.add(item);
  //   console.log('loaded item: ', item);
  //   await TrackPlayer.play();
  // };

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={() => handlePlay(item)}
    >
      <Image
        source={{ uri: item.artwork }}
        style={[styles.coverImage, imageStyle]}
      />
      <Text style={[styles.title, {color: colors.textPrimary}]} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={[styles.artist, {color: colors.textSecondary}]}>{item.artist}</Text>
    </TouchableOpacity>
  );
};

export default SongCard;

const styles = StyleSheet.create({
  container: {
    // height: 290,
    // width: 220,
  },
  coverImage: {
    width: 220,
    height: 220,
    borderRadius: 10,
  },
  title: {
    // color: colors.textPrimary,
    fontFamily: fontFamilies.medium,
    textAlign: 'center',
    fontSize: fontSize.medium,
    paddingVertical: spacing.xtraSmall,
  },
  artist: {
    // color: colors.textSecondary,
    textAlign: 'center',
    fontSize: fontSize.medium,
    fontFamily: fontFamilies.regular,
  },
});
