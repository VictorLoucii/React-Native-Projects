import { Image, ImageStyle, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { FC } from 'react'
import { fonts } from '../constants/fonts'
import { FONTsize, spacing } from '../constants/dimensions'
// import { colors } from '../constants/colors'
import TrackPlayer from 'react-native-track-player'
import { useTheme } from '@react-navigation/native'
import { CustomTheme } from '../theme/CustomTheme'

const imageUrl = 'https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/836/850x850/mortals-funk-remix-1737075671-f0Fq4IOd7G.jpg'

// Export this type so it can be used elsewhere
export type SongProps = {
  url: string;
  title: string;
  artist: string;
  artwork?: string; // Make artwork optional here
  album?: string;
  duration?: number; // Add optional duration
}

type SongCardProps = {
  containerStyle?: StyleProp<ViewStyle>,
  imageStyle?: StyleProp<ImageStyle>,
  data: SongProps,
  handlePlay?: (song: SongProps) => void
}


const SongCard: FC<SongCardProps> = ({ data, containerStyle, imageStyle, handlePlay }) => {

  const { colors } = useTheme() as CustomTheme;

  // const handlePlay = async () => {
  //   console.log('data:----', data);
  //   await TrackPlayer.add(data);
  //   // await TrackPlayer.play();
  //   await TrackPlayer.pause();

  // }

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={() => {
        console.log("Playing:", data.title);
        handlePlay?.(data);
      }}


    >
      <Image
        // If data.artwork exists use it, otherwise use a placeholder image
        source={{ uri: data.artwork || 'https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/875/325x325/sky-high-x-feel-good-mashup-1744110058-9Z7X0XldXy.jpg' }}
        style={[styles.coverImage, imageStyle]}
      />
         {/* ADD numberOfLines={1} HERE TO TRUNCATE LONG TITLES */}
      <Text 
        style={[styles.title, { color: colors.textPrimary }]}
        numberOfLines={1}
      >
        {data.title}</Text>
      <Text 
        style={[styles.artist, { color: colors.textSecondary }]}
        numberOfLines={1}
      >
        {data.artist}</Text>
    </TouchableOpacity>
  )
}

export default SongCard

const styles = StyleSheet.create({
  container: {
    width: 280,
    height: 300,

  },
  coverImage: {
    height: 242.39,
    width: '100%',
    borderRadius: spacing.medium
  },
  title: {
    fontFamily: fonts.Medium,
    fontSize: FONTsize.large,
    // color: colors.textPrimary,
    textAlign: 'center',
    paddingVertical: spacing.small
  },
  artist: {
    fontFamily: fonts.Regular,
    fontSize: FONTsize.medium,
    // color: colors.textSecondary,
    textAlign: 'center',

  }
})