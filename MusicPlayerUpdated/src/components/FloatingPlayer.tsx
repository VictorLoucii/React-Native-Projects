import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { FONTsize, spacing } from '../constants/dimensions';
import { fonts } from '../constants/fonts';
// import { colors } from '../constants/colors';
import { GoToNext, GoToPrevButton, PlayPauseButton } from './PlayerControl';
import { Slider } from 'react-native-awesome-slider';
import { useSharedValue } from 'react-native-reanimated';
import MovingText from './MovingText';
import { useNavigation, useTheme } from '@react-navigation/native';
import TrackPlayer, { useActiveTrack, useProgress } from 'react-native-track-player';
import { CustomTheme } from '../theme/CustomTheme';


const imageUrl = 'https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/894/325x325/1747405970_LDM0rs3Cip_IRV1.png';

const FloatingPlayer = () => {

    const { colors } = useTheme() as CustomTheme;

    const progress = useSharedValue(0);
    const min = useSharedValue(0);
    const max = useSharedValue(1);
    const navigation = useNavigation();
    const activeTrack = useActiveTrack()
    const { position, duration } = useProgress();
    console.log('position:---', position, 'duration:----', duration);
    const isSliding = useSharedValue(false);

    //update the progress bar value inside a useEffect() to ensure it's not executed during render otherwise you'll get an error:[Reanimated] Writing to `value` during component render. Please ensure that you don't access the `value` property nor use `set` method of a shared value while React is rendering a component.
    useEffect(() => {
        //condition for the slider when the user is not sliding:
        if (!isSliding.value) {  //this means: "If isSliding.value is false..."
            progress.value = duration > 0 ? position / duration : 0;
            console.log("progress value:----", progress.value);
        }
    }, [position, duration, progress])

    const handleGoToPlayerScreen = () => {
        navigation.navigate('PlayerScreen');
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.bkGroundClr }]}>
            <View style={styles.sliderContainer}>
                <Slider
                    progress={progress}
                    minimumValue={min}
                    maximumValue={max}
                    theme={{
                        minimumTrackTintColor: colors.minTintColor,
                        maximumTrackTintColor: colors.maxtTintColor,
                    }}
                    containerStyle={{
                        // height:20,
                    }}
                    renderBubble={() => <View />}
                    thumbWidth={40}
                    renderThumb={() => (
                        <View style={styles.invisibleTouchSensitiveContainer}>
                            <View style={[styles.thumbVisualContainer, { backgroundColor: colors.minTintColor }]} />
                        </View>
                    )}
                    onSlidingStart={() => (isSliding.value = true)}
                    onValueChange={async (value) => {
                        await TrackPlayer.seekTo(value * duration);
                    }}
                    onSlidingComplete={async (value) => {
                        if (!isSliding.value) return;
                        isSliding.value = false;
                        await TrackPlayer.seekTo(value * duration);
                    }}
                />
            </View>

            <View style={styles.floatingPlayerContainer}>
                <TouchableOpacity
                    style={styles.imageArtistTitleContainer}
                    activeOpacity={0.85}
                    onPress={handleGoToPlayerScreen}
                >
                    <Image
                        source={{ uri: activeTrack?.artwork || 'https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/875/325x325/sky-high-x-feel-good-mashup-1744110058-9Z7X0XldXy.jpg' }}
                        style={styles.floatingImage}
                    />
                    <View style={styles.songDetails}>
                        <MovingText
                            text={activeTrack?.title ?? 'no track playing'}
                            animationThreshold={15}
                            style={[styles.title, { color: colors.textPrimary }]}
                        />
                        {/* Use a normal Text component for the artist, as it's less likely to need scrolling */}
                        {/* This also prevents two scrolling animations at once, which can be distracting */}
                        <Text style={[styles.artist, { color: colors.textSecondary }]}>
                            {activeTrack?.artist ?? 'no artist'}
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.playerControl}>
                    <GoToPrevButton />
                    <PlayPauseButton />
                    <GoToNext />
                </TouchableOpacity>
            </View>

        </View>

    )
}

export default FloatingPlayer

const styles = StyleSheet.create({
    container: {

        position: 'absolute', // Takes the component out of the normal layout flow
        bottom: 0,            // Sticks it to the bottom
        left: 0,              // Sticks it to the left edge
        right: 0,             // Sticks it to the right edge

        // Add a background color to hide content scrolling behind it
        // backgroundColor: colors.bkGroundClr,
        // Now use padding for internal spacing, which is its correct use
        paddingTop: spacing.small,
        // paddingBottom: spacing.large, // Padding to avoid the phone's home bar

    },
    sliderContainer: {
        zIndex: 1,

    },
    invisibleTouchSensitiveContainer: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    thumbVisualContainer: {
        height: 20,
        width: 20,
        borderRadius: 10,
        // backgroundColor: colors.minTintColor,
        // backgroundColor: 'rgba(255, 0, 0, 0.2)' // translucent red

    },
    floatingPlayerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.small,
        width: '100%'

    },
    imageArtistTitleContainer: {
        // paddingHorizontal: spacing.medium,
        // flexDirection: 'row',
        // paddingBottom: 50,
        // alignItems: 'center',
        // gap:spacing.small,
        flex: 1,  // This is KEY. It makes this component expand.
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.medium,
        // paddingHorizontal: spacing.small,
    },
    floatingImage: {
        height: 66.67,
        width: 66.67,
        resizeMode: 'cover',
    },
    songDetails: {
        flex: 1,
    },

    title: {
        fontFamily: fonts.Medium,
        fontSize: FONTsize.large,
        // color: colors.textPrimary,
    },
    artist: {
        // color: colors.textSecondary,
        fontSize: FONTsize.medium,
        fontFamily: fonts.Regular

    },
    playerControl: {
        flexDirection: 'row',
        gap: spacing.medium,

    }
})

//  you do not need to add any playback logic to your FloatingPlayer liked you did in SongCardWithCategory.tsx, LikedScreen.tsx or worry about the system notification.
// Your current architecture is correct. The FloatingPlayer should only display the current state of the player and provide controls (buttons). It should not be responsible for building or managing the playlist queu