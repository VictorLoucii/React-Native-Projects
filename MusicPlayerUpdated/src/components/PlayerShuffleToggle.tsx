import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { colors } from '../constants/colors'
import { iconSizes } from '../constants/dimensions'
import TrackPlayer from 'react-native-track-player'

const PlayerShuffleToggle = () => {

    // Fisher-Yates Shuffle algorithm
    const fisherYatesShuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    const shuffleSongs = async () => {
        let Queue = await TrackPlayer.getQueue();
        console.log("Queue:----", Queue);

        await TrackPlayer.reset();// Clear the current queue

        // Queue.sort(() => Math.random() - 0.5); // Apply shuffle using sort (not optimal)
        fisherYatesShuffle(Queue); // calling the function, Applying shuffle using Fisher-Yates Shuffle** algorithm (optimal)

        await TrackPlayer.add(Queue);
        await TrackPlayer.play();
    }

    return (
        <View>
            <TouchableOpacity
                onPress={shuffleSongs}
            >
                <MaterialCommunityIcons
                    name={'shuffle'}
                    size={iconSizes.large}
                    color={colors.iconSecondary}
                />
            </TouchableOpacity>
        </View>
    )
}

export default PlayerShuffleToggle

const styles = StyleSheet.create({})