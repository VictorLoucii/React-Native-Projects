import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

//vector icons:
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'



import { iconSizes } from '../constants/dimensions'
// import { colors } from '../constants/colors'
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player'
import { useTheme } from '@react-navigation/native'
import { CustomTheme } from 'src/theme/CustomTheme'


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

    //skip to next track music player control:
    const skipToNextSong = async () => {
        try {
            await TrackPlayer.skipToNext();
        }
        catch (e) {
            console.log('Error:----', e);
        }
    };

    return (
        <View>
            <TouchableOpacity
                onPress={skipToNextSong}
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



