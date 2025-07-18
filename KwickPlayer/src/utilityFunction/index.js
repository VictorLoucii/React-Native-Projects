export const formatSecondsToMinute = (seconds) => {
    const minutes = Math.floor(seconds/60);
    const remainingSeconds = Math.floor(seconds%60);

    const formatedMinutes = String(minutes).padStart(2,'0');
    const formatedSeconds = String(remainingSeconds).padStart(2,'0');

    return(`${formatedMinutes}:${formatedSeconds}`);

}

export const isExist = (songs, track) => {
    if(!track || !track.url) return false;   // ✅ Prevents crash if track is undefined
    return songs.some( song => song.url === track.url)  // returns `true` if **at least one** element/song object satisfies the condition. Otherwise, `false`
}


// ### **What is the `index.js` file in this context?**  
// In JavaScript and React projects, `index.js` is commonly used as an entry point for modules or applications. The reason for having multiple `index.js` files in different folders is that each serves as a module entry point, making imports cleaner.  

// For example, a root `index.js` file is typically the main entry point of a React Native project. However, inside utility or store folders, an `index.js` file can serve as an entry point for utility functions, making them easier to import elsewhere.  

// ### **Why name it `index.js`?**  
// - When a directory contains an `index.js` file, you can import from the folder directly instead of specifying the filename.  
//   ```js
//   import { isExist } from '../utils'; 
//   ```
//   Instead of:  
//   ```js
//   import { isExist } from '../utils/index.js';
//   ```
// - This makes the project structure cleaner and imports more readable.


// ### **Explanation of the `isExist` function:**  
// ```js
// export const isExist = (songs, track) => {
//     return songs.some(song => song.url === track.url);
// }
// ```
// This function checks if a given track already exists in the `songs` list based on its `url` property.

// #### **How it works:**
// 1. The function takes two parameters:
//    - `songs`: An array of song objects this is state.likedSongs which was initially an empty array defined in likeStore.jsx. It gets updated when new songs are added.
//    - `track`: A song object to check ths is newSong(a track object) which was passed from file PlayerScreen.jsx to likeStore.js and finally to index.js(this file).
// 2. It uses the `.some()` method, which:
//    - Iterates over `songs` array and returns `true` if **at least one** song in the array has the same `url` as `track.url`.
//    - Otherwise, it returns `false`.
// 3. The function helps prevent duplicate songs from being added to the liked songs list.

// In your project, this function is used inside `likeStore.jsx` to prevent adding the same song multiple times to the `likedSongs` array.