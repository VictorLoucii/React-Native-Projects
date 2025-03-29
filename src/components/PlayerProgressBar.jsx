//@ts-check
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { fontFamilies } from '../constants/fonts';
import { fontSize, spacing } from '../constants/dimensions';
import { Slider } from 'react-native-awesome-slider';
import { useSharedValue } from 'react-native-reanimated';
import TrackPlayer, { useProgress } from 'react-native-track-player';
import { formatSecondsToMinute } from '../utils';
import { useTheme } from '@react-navigation/native';

const PlayerProgressBar = () => {
  const { colors } = useTheme();
  const {duration, position} = useProgress();
  console.log('track position: ----', position,'total duration:---', duration);

  const progress = useSharedValue(0.7);
  const min = useSharedValue(0);
  const max = useSharedValue(1);
  const isSliding = useSharedValue(false);

  if(!isSliding.value){
    progress.value = duration > 0 ? position/duration : 0;
  }

  const trackElapsedTime = formatSecondsToMinute(position);
  const trackRemainingTime = formatSecondsToMinute(duration - position);

  return (
    <View>
      <View style={styles.timeRow}>
        <Text style={[styles.timeText, {color: colors.textPrimary}]}>{trackElapsedTime}</Text>
        <Text style={[styles.timeText, {color: colors.textPrimary}]}>{'-'}{trackRemainingTime}</Text>
      </View>
      <Slider
        style={styles.sliderContainer}
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        theme={{
          minimumTrackTintColor: colors.minTintColor,
          maximumTrackTintColor: colors.maxTintColor,
        }}
        containerStyle={{
          height: 7,
          borderRadius: spacing.small,
        }}
        thumbWidth={spacing.medium}
        // renderBubble={() => null}
        onSlidingStart={() => (isSliding.value = true)}
        onValueChange={async(value) => {
          await TrackPlayer.seekTo(value * duration);
        }}
        onSlidingComplete={async(value) => {
          if(!isSliding.value) return;
          isSliding.value = false;
          await TrackPlayer.seekTo(value * duration);
        }}
      />
    </View>
  );
};

export default PlayerProgressBar;

const styles = StyleSheet.create({
  timeRow: {
    marginVertical:spacing.large,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    // color: colors.textPrimary,
    fontFamily: fontFamilies.regular,
    fontSize: fontSize.medium,
    opacity: 0.75,
  },
  sliderContainer:{
    marginVertical: spacing.small,
  }
});
