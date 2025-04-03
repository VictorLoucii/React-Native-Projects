// @ts-check
import { TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { iconSizes } from "../constants/dimensions";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { useTheme } from "@react-navigation/native";
import TrackPlayer, { State, usePlaybackState } from "react-native-track-player";

export const GoToPreviousButton = ({ iconStyle = iconSizes.large }) => {
  const { colors } = useTheme();

  const handlePreviousTrack = async () => {
    try {
      await TrackPlayer.skipToPrevious();
    } catch (error) {
      console.log("No previous track available", error);
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.4} onPress={handlePreviousTrack}>
      <MaterialCommunityIcons
        name={"skip-previous-outline"}
        size={iconStyle}
        color={colors.iconPrimary}
      />
    </TouchableOpacity>
  );
};

export const PlayPauseButton = ({ iconStyle = iconSizes.large }) => {
  const { colors } = useTheme();
  const playbackState = usePlaybackState();

  const handlePlayPause = async () => {
    if (playbackState.state === State.Playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.4} onPress={handlePlayPause}>
      <FontAwesome6
        name={playbackState.state === State.Playing ? "pause" : "play"}
        size={iconStyle}
        color={colors.iconPrimary}
      />
    </TouchableOpacity>
  );
};

export const GoToNextButton = ({ iconStyle = iconSizes.large }) => {
  const { colors } = useTheme();

  const handleNextTrack = async () => {
    try {
      await TrackPlayer.skipToNext();
    } catch (error) {
      console.log("No next track available", error);
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.4} onPress={handleNextTrack}>
      <MaterialCommunityIcons
        name={"skip-next-outline"}
        size={iconStyle}
        color={colors.iconPrimary}
      />
    </TouchableOpacity>
  );
};

