//original UseSetUpPlayer.tsx file:

import TrackPlayer, { Capability, RepeatMode } from "react-native-track-player";
import { useRef, useEffect } from "react";

//Import AsyncStorage to load data from the device's storage.
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the same constant keys to ensure consistency.
const PLAYER_STATE_KEY = 'playerStateQueue';
const PLAYER_TRACK_INDEX_KEY = 'playerTrackIndex';

const setUpPlayer = async () => {
    await TrackPlayer.setupPlayer({
        maxCacheSize: 1024 * 10,
    });
    await TrackPlayer.updateOptions({  //note: don't write: 'udpate()' here, getting error when we use 'update()'
        // ratingType: RatingType.Heart,
        capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
            Capability.Stop,
        ],
        compactCapabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
            Capability.Stop,
        ],
    })
    await TrackPlayer.setVolume(0.5);
    await TrackPlayer.setRepeatMode(RepeatMode.Queue);

     // logic to restore the saved state ---
    try {
        // Attempt to get the saved queue and index from storage.
        const savedQueueJSON = await AsyncStorage.getItem(PLAYER_STATE_KEY);
        const savedTrackIndexJSON = await AsyncStorage.getItem(PLAYER_TRACK_INDEX_KEY);

        // Check if both values actually exist (they won't on the very first app launch).
        if (savedQueueJSON != null && savedTrackIndexJSON != null) {
            // If they exist, parse them from JSON strings back into usable data.
            const savedQueue = JSON.parse(savedQueueJSON);
            const savedTrackIndex = JSON.parse(savedTrackIndexJSON);

            // Safety Check: Only restore if the queue has songs and the index is valid.
            if (savedQueue.length > 0 && savedTrackIndex < savedQueue.length) {
                console.log('Restoring saved Track player state...');
                // First, add the entire saved queue back to the player.
                await TrackPlayer.add(savedQueue);
                // Then, skip to the track that was playing last.
                await TrackPlayer.skip(savedTrackIndex);
                // The player will be in a "ready" state, paused at the last track.
            }
        }

    } catch (e) {
        console.error("Failed to restore player state.", e);
    }
}

export const UseSetUpPlayer = ({ onLoad }) => {
    const isInitialized = useRef(false);

    useEffect(() => {
        setUpPlayer().then(() => {
            isInitialized.current = true;
            console.log('Set up player success');
            onLoad();
        }).catch((error) => {
            isInitialized.current = false;
            console.log('Error:-----', error);
        })

    }, [])
}

//Why UseSetUpPlayer.tsx is the Best Place to Restore State of the Track player?

// It Runs Exactly Once at Startup: Your custom hook is designed to run only one time when the app first launches (useEffect with an empty dependency array []). This is the perfect and only time you should be restoring state. You don't want to accidentally restore the old queue in the middle of a user's session.

// Correct Order of Operations: Your hook already handles the TrackPlayer.setupPlayer() call. It is critical that you restore the queue after the player has been set up, but before the rest of your app's UI might try to interact with the player. Your hook's structure guarantees this correct sequence.

// Separation of Concerns: UseSetUpPlayer.tsx has one job: initializing the player. Restoring its previous state is a core part of a robust initialization process. Keeping this logic here makes your code clean and easy to understand. The rest of your app doesn't need to know how the player got its initial queue; it just knows that by the time it's ready, the player is correctly set up.

// The "Anti-Pattern" (What Not to Do)

// The alternative would be to scatter this logic across various screen components. For example:

// Trying to restore the queue in App.tsx.

// Trying to save the queue in PlayerScreen.tsx.

// This would be a mistake because it would lead to race conditions, repeated and unnecessary save/load operations, and code that is much harder to debug.

// Conclusion: Your current approach of modifying these two specific files is the clean, efficient, and correct architectural pattern for this feature.