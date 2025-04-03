const { Event, default: TrackPlayer } = require('react-native-track-player');

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
