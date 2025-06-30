const { Event, default: TrackPlayer } = require('react-native-track-player');

//Import AsyncStorage to save data to the device's storage.
const AsyncStorage = require('@react-native-async-storage/async-storage').default;

//Define constant keys to avoid typos when saving/loading.
const PLAYER_STATE_KEY = 'playerStateQueue';
const PLAYER_TRACK_INDEX_KEY = 'playerTrackIndex';


module.exports = async function () {

    TrackPlayer.addEventListener(Event.RemotePause, () => {
        console.log('Event.RemotePause');
        TrackPlayer.pause();
    });

    TrackPlayer.addEventListener(Event.RemotePlay, () => {
        console.log('Event.RemotePlay');
        TrackPlayer.play();
    });

    TrackPlayer.addEventListener(Event.RemoteNext, () => {
        console.log('Event.RemoteNext');
        TrackPlayer.skipToNext();
    });

    TrackPlayer.addEventListener(Event.RemotePrevious, () => {
        console.log('Event.RemotePrevious');
        TrackPlayer.skipToPrevious();
    });



    //  PlaybackActiveTrackChanged listener to save the state when the track changes(Listener to save the state when the track changes) ---
    TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, async (event) => {

        if (event.track) {
            try {
                // Get the current list of songs (the queue) from the player.
                const queue = await TrackPlayer.getQueue();
                // Get the index of the track that is now active.
                const trackIndex = await TrackPlayer.getActiveTrackIndex();

                if (trackIndex != null) {
                    // Important stuff below:
                    // THIS IS THE FIX  for error: database or disk is full
                    // Create a new "lightweight" queue that does NOT include the large artwork data.
                    // We map over the queue and for each track, we create a new object
                    // that has all properties EXCEPT for 'artwork'.
                    const lightweightQueue = queue.map(track => {
                        const { artwork, ...rest } = track; // Destructure to separate artwork from the rest
                        return rest; // Return only the essential track data
                    })
                    // Now Save both the queue and the current index to AsyncStorage.
                    // We must use JSON.stringify because AsyncStorage can only store strings.
                    await AsyncStorage.setItem(PLAYER_STATE_KEY, JSON.stringify(lightweightQueue));
                    await AsyncStorage.setItem(PLAYER_TRACK_INDEX_KEY, JSON.stringify(trackIndex));

                    console.log('Track Player state saved successfully.');
                }

            } catch (e) {
                console.error('Failed to save Track player state.', e);
            }
        }
    });

};

// This file is an **event handler function** for `react-native-track-player`. It listens for remote control events (such as play, pause, next, and previous) and performs the corresponding actions in your music player.

// ### **Step-by-Step Explanation**
// 1. **Importing TrackPlayer and Event:**
//    ```js
//    const { Event, default: TrackPlayer } = require("react-native-track-player");
//    ```
//    - `Event`: Contains predefined event names (e.g., `RemotePause`, `RemotePlay`, etc.).
//    - `TrackPlayer`: The main module that controls playback.

// 2. **Exporting an Async Function:**
// //what is module.exports?
// In **Node.js (or CommonJS modules in JavaScript)**, `module.exports` is used to **export functions, objects, or variables** from one file so they can be used in another.

// #### **Breaking it Down:**
// ```js
// module.exports = async function() { ... };
// ```
// - This means we are **exporting an anonymous async function**.
// - This function will be **called automatically** by `react-native-track-player` when the service starts.
// - Other parts of your code (like `registerPlaybackService` defined in index.js) can import and use it.

// 3. **Adding Event Listeners:**
//    Each `TrackPlayer.addEventListener` call listens for a specific event and executes a callback function when the event occurs.

//    - **Pause Event**
//      ```js
//      TrackPlayer.addEventListener(Event.RemotePause, () => {
//          console.log('Event.RemotePause');
//          TrackPlayer.pause();
//      });
//      ```
//      - Triggered when the user presses the "Pause" button (e.g., on Bluetooth headphones or lock screen).
//      - Logs `"Event.RemotePause"` to the console.
//      - Calls `TrackPlayer.pause()` to pause playback.

//    - **Play Event**
//      ```js
//      TrackPlayer.addEventListener(Event.RemotePlay, () => {
//          console.log('Event.RemotePlay');
//          TrackPlayer.play();
//      });
//      ```
//      - Triggered when the user presses the "Play" button.
//      - Logs `"Event.RemotePlay"`.
//      - Calls `TrackPlayer.play()` to resume playback.

//    - **Next Track Event**
//      ```js
//      TrackPlayer.addEventListener(Event.RemoteNext, () => {
//          console.log('Event.RemoteNext');
//          TrackPlayer.skipToNext();
//      });
//      ```
//      - Triggered when the user presses the "Next" button.
//      - Logs `"Event.RemoteNext"`.
//      - Calls `TrackPlayer.skipToNext()` to jump to the next track.

//    - **Previous Track Event**
//      ```js
//      TrackPlayer.addEventListener(Event.RemotePrevious, () => {
//          console.log('Event.RemotePrevious');
//          TrackPlayer.skipToPrevious();
//      });
//      ```
//      - Triggered when the user presses the "Previous" button.
//      - Logs `"Event.RemotePrevious"`.
//      - Calls `TrackPlayer.skipToPrevious()` to go back to the previous track.

// ### **When and Why Is This Used?**
// - This function is used to **handle remote control events** (Bluetooth devices, lock screen controls, notification controls).
// - It **must be registered in the service file** (usually `service.js`) when setting up `react-native-track-player`.

//Why service.js is the Best Place to Save State of the track player?

// It's Always Running: The Playback Service (service.js) is designed by react-native-track-player to be a persistent, background-aware part of your application. It stays alive even when your UI is in the background.

// Centralized Event Handling: It's already the designated "central hub" for listening to all TrackPlayer events. The PlaybackTrackChanged event is the most reliable trigger for when the state needs to be saved. Placing the save logic here keeps all related event handling in one logical place.

// Reliability: If you were to put this save logic inside a React component, it might not run if the component is unmounted or if the app is backgrounded. The service is the most reliable place to ensure the save operation happens every time the track changes.