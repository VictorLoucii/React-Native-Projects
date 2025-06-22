import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'
import { iconSizes } from '../constants/dimensions'
import { useTrackPlayerRepeatMode } from '../hooks/UseTrackPlayerRepeateMode'
import { RepeatMode } from 'react-native-track-player'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const PlayerRepeatToggle = () => {
    const { repeatMode, changeRepeatMode } = useTrackPlayerRepeatMode(); //Calling the custom hook 'useTrackPlayerRepeatMode' defined in 'useTrackPlayerRepeatMode.js' and destructuring the returned state variable 'repeatMode' and the function 'changeRepeatMode'

    console.log('repeateMode:----', repeatMode);
    const repeatModeArray = [RepeatMode.Off, RepeatMode.Track, RepeatMode.Queue];
    console.log('repeatModeArray:----', repeatModeArray)



    const toggleRepeateMode = () => {
        if (repeatMode === null) return;  //dont put:  if (repeatMode === 0),check notes
        const currentIndex = repeatModeArray.indexOf(repeatMode);
        console.log('currentIndex:---', currentIndex); //to check it click on the repeat icon 
        const nextIndex = (currentIndex + 1) % repeatModeArray.length;
        console.log('nextIndex:-----', nextIndex); //to check it click on the repeat icon 

        changeRepeatMode(repeatModeArray[nextIndex])  // calling the function 'changeRepeatMode' defined in hook 'useTrackPlayerRepeatMode' while Passing the actual RepeatMode value

    };
    let iconName = 'repeat';  //initial/default icon appearance or fallback value
    switch (repeatMode) {
        case RepeatMode.Off:
            iconName = 'repeat-off';
            break;
        case RepeatMode.Track:
            iconName = 'repeat-once';
            break;
        case RepeatMode.Queue:
            iconName = 'repeat';
            break;
    }

    return (
        <View>
            <TouchableOpacity
                onPress={toggleRepeateMode}
            >
                <MaterialCommunityIcons
                    name={iconName}
                    size={iconSizes.large}
                    color={colors.iconSecondary}
                />
            </TouchableOpacity>
        </View>
    )
}

export default PlayerRepeatToggle

const styles = StyleSheet.create({})