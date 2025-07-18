import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

//vector icons:
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'



import { iconSizes } from '../constants/dimensions'
// import { colors } from '../constants/colors'
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player'
import { useTheme } from '@react-navigation/native'
import { CustomTheme } from '../theme/CustomTheme'
import { useShuffleStore } from '../ZustandStore/ShuffleStore'


export const GoToPrevButton = () => {

    const { colors } = useTheme() as CustomTheme;  //note that this colors object is coming from the files DarkMode/LightMode in theme folder not from the colors.js file in the constants folder


    //skip to previous track music player control:
    const skipToPrevSong = async () => {
        try {
            await TrackPlayer.skipToPrevious();
        }
        catch (e) {
            console.log('Error:----', e);
        }
    };


    return (
        <View>
            <TouchableOpacity
                onPress={skipToPrevSong}
            >
                <MaterialCommunityIcons
                    name={'skip-previous-outline'}
                    size={iconSizes.xtraLarge}
                    color={colors.iconPrimary}
                />
            </TouchableOpacity>
        </View>
    )
}

export const PlayPauseButton = () => {

    const { colors } = useTheme() as CustomTheme;

    const playBackState = usePlaybackState();

    //muisc player play/pause functionality:
    const playPauseSong = async () => {
        try {
            if (playBackState.state === State.Playing) {
                await TrackPlayer.pause();
            }
            else {
                await TrackPlayer.play();
            }
        }
        catch (e) {
            console.log('Error:---', e);
        }
    };

    return (
        <View>
            <TouchableOpacity
                onPress={playPauseSong}
            >
                <AntDesign
                    name={playBackState.state === State.Playing ? 'pause' : 'play'}
                    size={iconSizes.xtraLarge}
                    color={colors.iconPrimary}
                />

            </TouchableOpacity>
        </View>
    )
}

export const GoToNext = () => {

    const { colors } = useTheme() as CustomTheme;
    const { isShuffleOn } = useShuffleStore();

    //note: don't use fischeyates shuffle algorithm here (check doc notes)

        const skipToNextSong = async () => {
        try {
            // Check if shuffle mode is on
            if (isShuffleOn) {
                // --- SHUFFLE LOGIC ---
                const queue = await TrackPlayer.getQueue();
                if (queue.length <= 1) {
                    // If there is only 1 song in the queue, just restart it or do nothing
                    await TrackPlayer.seekTo(0);
                    return;
                }

                const currentTrackIndex = await TrackPlayer.getActiveTrackIndex();
                let nextTrackIndex;

                // Keep picking a random track until it's different from the current one
                //do while loop executes once even if the condition is false
                do {
                    nextTrackIndex = Math.floor(Math.random() * queue.length);
                } while (nextTrackIndex === currentTrackIndex && queue.length > 1);

                await TrackPlayer.skip(nextTrackIndex);

            } else {
                // it runs when isShuffleOn state is false/off
                await TrackPlayer.skipToNext();
            }
        }
        catch (e) {
            console.log('Error skipping to next song:----', e);
        }
    };


    return (
        <View>
            <TouchableOpacity
                // dont do this: onPress={() => skipToNextSong} , check document notes for better explanation
                onPress={skipToNextSong}  //or call it as an anonymous function : onPress={() => skipToNextSong()}
            >
                <MaterialCommunityIcons
                    name={'skip-next-outline'}
                    size={iconSizes.xtraLarge}
                    color={colors.iconPrimary}
                />
            </TouchableOpacity>
        </View>
    )
}



