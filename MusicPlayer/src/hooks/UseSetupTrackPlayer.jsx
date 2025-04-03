import { useEffect, useRef } from "react";
import TrackPlayer, { Capability, RatingType, RepeatMode } from "react-native-track-player"

const setupPlayer = async() => {
    await TrackPlayer.setupPlayer({
        maxCacheSize: 1024 * 10,
    });
    await TrackPlayer.updateOptions({  //note: don't use 'udpate' here, getting error when we use 'update()'
        ratingType: RatingType.Heart,
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
}

export const useSetupPlayer = ( {onLoad} ) =>{
    const isInitialized = useRef(false);
    //add logic for setup player
    useEffect(() => { 
        setupPlayer().then(() => {
            isInitialized.current = true;
            onLoad();
            console.log('Setup player success')

        }).catch((error) => {
            isInitialized.current = false;
            console.log('error: ',error);
        })
    },[])

}


// Here’s what happens step by step:

// The useSetupPlayer hook is called.

// Inside useEffect, setupPlayer() is called asynchronously.

// setupPlayer runs:

// Calls TrackPlayer.setupPlayer().

// Updates the player with capabilities.

// Sets volume and repeat mode.

// If setupPlayer() resolves successfully:

// The .then block runs:

// Sets isInitialized.current = true;

// Calls onLoad()

// Logs "Setup player success"

// If an error occurs:

// The .catch block runs:

// Logs the error.

// assigns isInitialized = false; 