// @ts-check
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
//constants:
import { fontSize, iconSizes, spacing } from '../constants/dimensions';
import { fontFamilies } from '../constants/fonts';
//components:
import { GoToPreviousButton } from './PlayerControls';
import { PlayPauseButton } from './PlayerControls';
import { GoToNextButton } from './PlayerControls';
// awesome slider contents:
import { useSharedValue } from 'react-native-reanimated';
import { Slider } from 'react-native-awesome-slider';
import MovingText from './MovingText';
import { useNavigation, useTheme } from '@react-navigation/native';


const imageUrl = 'https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/861/325x325/live-your-life-1741654856-2nQueoDu5k.png';
const FloatingPlayer = () => {
    const { colors } = useTheme();
    const progress = useSharedValue(30);
    const min = useSharedValue(0);
    const max = useSharedValue(1);
    const navigation = useNavigation();

    const handleOpenPlayerScreen = () => {
        navigation.navigate('Player_Screen');
    }

    return (
        <View>
            <View style={{ zIndex: 1 }}>
                <Slider
                    progress={progress}
                    minimumValue={min}
                    maximumValue={max}
                    theme={{
                        minimumTrackTintColor: colors.minTintColor,
                        maximumTrackTintColor: colors.maxTintColor,
                    }}
                    renderBubble={() => <View />}
                    // containerStyle={{
                    //     height:5,
                    // }}    
                />
            </View>
            <TouchableOpacity 
            activeOpacity={0.4} 
            style={styles.container}
            onPress={handleOpenPlayerScreen}
            >
                <Image source={{ uri: imageUrl }}
                    style={styles.coverImage}
                />
                <View style={styles.titleContainer}>
                    <MovingText text={'Chaff and Dust'}
                    style = {[styles.title, {color: colors.textPrimary}]}
                    animationThreshold={10}
                />
                    <Text style={[styles.artist, {color: colors.textSecondary}]}>Alan Walker</Text> 
                </View>
                <View style={styles.playerControlContainer}>
                    <GoToPreviousButton iconStyle={iconSizes.xtraLarge} />
                    <PlayPauseButton iconStyle={iconSizes.xtraLarge} />
                    <GoToNextButton iconStyle={iconSizes.xtraLarge} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default FloatingPlayer

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    coverImage: {
        height: 60,
        width: 60,
        resizeMode: 'cover',
    },
    titleContainer: {
        flex: 1,
        paddingHorizontal: spacing.small,
        overflow: 'hidden',
        marginLeft: spacing.small,
        marginRight: spacing.small,
    },
    title: {
        // color: colors.textPrimary,
        fontSize: fontSize.large,
        fontFamily: fontFamilies.medium,
    },
    artist: {
        // color: colors.textSecondary,
        fontSize: fontSize.medium,
    },
    playerControlContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        paddingRight: spacing.medium,

    }
})