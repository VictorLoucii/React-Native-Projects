//from video:
// import { useCallback, useEffect, useState } from 'react';
// import TrackPlayer from 'react-native-track-player';

// export const useTrackPlayerRepeatMode = () => {
//   const [repeatMode, setRepeatMode] = useState(null);
//   //below useCallback hook is used for better performance
//   const changeRepeatMode = useCallback(async (repeatMode) => {
//     await TrackPlayer.setRepeatMode(repeatMode);
//         setRepeatMode(repeatMode);
//   }, []);
//   useEffect(() => {
//     TrackPlayer.getRepeatMode().then(setRepeatMode);
//   }, []);

//   return {repeatMode, changeRepeatMode};
// };


//from chatgpt:
import { useCallback, useEffect, useState } from 'react';
import TrackPlayer from 'react-native-track-player';

export const useTrackPlayerRepeatMode = () => {
  const [repeatMode, setRepeatMode] = useState(null);

  // below useCallback hook is used for better performance
  const changeRepeatMode = useCallback(async (mode) => {
    await TrackPlayer.setRepeatMode(mode);
    setRepeatMode(mode); // Ensure the state updates when the mode changes
  }, []);

  useEffect(() => {
    TrackPlayer.getRepeatMode().then(setRepeatMode);
  }, []);

  return { repeatMode, changeRepeatMode }; 
};
