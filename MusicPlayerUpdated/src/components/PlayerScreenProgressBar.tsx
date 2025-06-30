import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useSharedValue } from 'react-native-reanimated'
import { Slider } from 'react-native-awesome-slider';
import { colors } from '../constants/colors';
import { FONTsize, spacing } from '../constants/dimensions';
import TrackPlayer, { useProgress } from 'react-native-track-player';
import { fonts } from '../constants/fonts';
import { formatSecondsToMinute } from '../utilityFunction';

const PlayerScreenProgressBar = () => {

    const { duration, position } = useProgress();
    // console.log('position:---',position,'duration:----',duration);

    const progress = useSharedValue(0); // This controls the slider visual position (0 to 1)
    const min = useSharedValue(0);
    const max = useSharedValue(1);

    const isSliding = useSharedValue(false); //isSliding: a flag to know if the user is currently dragging the slider, initially set to false

    //update the progress bar value inside a useEffect() to ensure it's not executed during render otherwise you'll get an error:[Reanimated] Writing to `value` during component render. Please ensure that you don't access the `value` property nor use `set` method of a shared value while React is rendering a component.
    useEffect(() => {
         //condition for the slider when the user is not sliding:
        if (!isSliding.value) {  //this means: "If isSliding.value is false..."
            progress.value = duration > 0 ? position / duration : 0;
            console.log("progress value:----", progress.value);
        }
    },[position,duration, progress])

    const trackElapsedTime = formatSecondsToMinute(position);
    const trackRemainingTime = formatSecondsToMinute(duration - position);

    return (
        <View style={styles.container}>
            <View>

                <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>{trackElapsedTime}</Text>
                    <Text style={styles.timeText}>{trackRemainingTime}</Text>
                </View>

                <Slider
                    progress={progress}
                    minimumValue={min}
                    maximumValue={max}
                    theme={{
                        minimumTrackTintColor: colors.minTintColor,
                        maximumTrackTintColor: colors.maxtTintColor,

                    }}
                    // renderBubble={() => null}
                    onSlidingStart={() => (isSliding.value = true)}
                    onValueChange={async (value) => {
                        await TrackPlayer.seekTo(value * duration);
                    }}
                    onSlidingComplete={async (value) => {
                        if (!isSliding.value) return;
                        isSliding.value = false;
                        await TrackPlayer.seekTo(value * duration);
                    }}
                    containerStyle={{

                    }}
                />
            </View>
        </View>
    )
}

export default PlayerScreenProgressBar

const styles = StyleSheet.create({
    container: {

    },
    timeContainer: {
        marginVertical: spacing.xtraLarge,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.medium,

    },
    timeText: {
        fontSize: FONTsize.medium,
        fontFamily: fonts.Regular,
        color: colors.textPrimary,
        opacity: 0.75,

    },
})