import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { iconSizes } from '../constants/dimensions';
import { colors } from '../constants/colors';
import { useTrackPlayerRepeatMode } from '../hooks/UseTrackPlayerRepeateMode';
import { RepeatMode } from 'react-native-track-player';

const PlayerRepeatToggle = () => {

  const { repeatMode, changeRepeatMode } = useTrackPlayerRepeatMode(); //calling the hook 'useTrackPlayerRepeatMode' defined in useTrackPlayerRepeatMode.jsx

  const repeatOrder = [RepeatMode.Off, RepeatMode.Track, RepeatMode.Queue]; //here repeatOrder is an array which looks like this: [0,1,2]
  console.log('repeat mode:--- ', repeatMode);

  const toggleRepeatMode = () => {
    if (repeatMode === null) return;

    const currentIndex = repeatOrder.indexOf(repeatMode);
    console.log('current index:-----', currentIndex);
    const nextIndex = (currentIndex + 1) % repeatOrder.length;
    console.log('next index: ----', nextIndex);
    changeRepeatMode(repeatOrder[nextIndex]);  // calling the function 'changeRepeatMode' defined in hook 'useTrackPlayerRepeatMode' while Passing the actual RepeatMode value
   };

  let iconName = 'repeat';
  switch (repeatMode) {
    case RepeatMode.Off:
      iconName = 'repeat-off';
      break;
    case RepeatMode.Queue:
      iconName = 'repeat';
      break;
    case RepeatMode.Track:
      iconName = 'repeat-once';
      break;
  }

  return (
    <TouchableOpacity onPress={toggleRepeatMode}>
      <MaterialCommunityIcons
        name={iconName}
        size={iconSizes.large}
        color={colors.iconSecondary}
      />
    </TouchableOpacity>
  );
};

export default PlayerRepeatToggle;

const styles = StyleSheet.create({});
