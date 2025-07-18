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



// ### ❓ What is mode?

// `mode` is a **parameter** passed to `changeRepeatMode`.

// Example usage might look like:

// ```js
// changeRepeatMode(TrackPlayer.RepeatMode.Track);   // repeat current track
// changeRepeatMode(TrackPlayer.RepeatMode.Queue);   // repeat the queue
// changeRepeatMode(TrackPlayer.RepeatMode.Off);     // repeat off
// ```

// So `mode` is expected to be one of the constants from `TrackPlayer.RepeatMode` enum.

// ---

// ### ✅ Full list of valid `mode` values from `react-native-track-player`:

// These come from the library:

// ```js
// TrackPlayer.RepeatMode.Off     // 0
// TrackPlayer.RepeatMode.Track   // 1
// TrackPlayer.RepeatMode.Queue   // 2
// ```

// > These constants tell the player what to repeat:

// * `Off`: no repeating
// * `Track`: repeat the same song
// * `Queue`: repeat the entire playlist

// ---

// ### 🔁 Explanation of your custom hook `useTrackPlayerRepeatMode`:

// * `repeatMode` is a state variable that stores the **current repeat mode**.
// * `changeRepeatMode(mode)` is a function to **set the new repeat mode**.
// * `useEffect(() => { ... }, [])` runs once on mount to **load the current repeat mode** from TrackPlayer and store it in state.

// ---

// ### ✅ Final verdict:

// Your code is **correct**, and `mode` is just a placeholder for whatever repeat mode value you pass in.

// If you want stricter typing with TypeScript, you could write:

// ```ts
// const changeRepeatMode = useCallback(async (mode: RepeatModeType) => { ... });
// ```

// Let me know if you're using TypeScript and want the full type support for this.
