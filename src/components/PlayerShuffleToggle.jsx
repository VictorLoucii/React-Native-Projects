import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { iconSizes } from '../constants/dimensions'
import { colors } from '../constants/colors'
import TrackPlayer from 'react-native-track-player'

const PlayerShuffle = () => {
  const shuffle = async() => {
    let queue = await TrackPlayer.getQueue();
    console.log('queue:----',queue);
    await TrackPlayer.reset();
    queue.sort(() => Math.random() - 0.5);
    await TrackPlayer.add(queue);
    await TrackPlayer.play();

  }
  return (
    <TouchableOpacity onPress={shuffle} >
        <MaterialCommunityIcons 
            name = {'shuffle'} 
            size = {iconSizes.large}
            color = {colors.iconSecondary}
        />
    </TouchableOpacity>
  )
}

export default PlayerShuffle

const styles = StyleSheet.create({})