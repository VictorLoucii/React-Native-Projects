import TrackPlayer, { Capability, RepeatMode } from "react-native-track-player";
import { useRef, useEffect } from "react";

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

