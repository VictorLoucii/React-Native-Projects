
import { PermissionsAndroid, Platform } from 'react-native';
import RNFS from 'react-native-fs';
import MediaMeta from 'react-native-media-meta';
import { SongsList } from '../data/SongsList';

// Define the structure of a Track object, which react-native-track-player uses and export it so that it can be used in other files as well
export interface Track {
  url: string; // The path to the file
  title: string;
  artist: string;
  album: string;
  artwork?: string; //this means: artwork is an optional property (because of the ?)If it is present, it must be of type string
  duration: number; // in seconds
}

/**
 * Requests permission to read audio files from the device's storage.
 * @returns {Promise<boolean>}This is a JSDoc tag/notation. It tells the reader (and tools like VS Code) what the below function (requestStoragePermission) returns. requestStoragePermission() is an asynchronous function. It returns a Promise, which is of type boolean — i.e. true if permission is granted or false if denied.
 */

//This function asks the user for permission to access music files on Android devices:
export async function requestStoragePermission(): Promise<boolean> {

  if (Platform.OS !== 'android') return true; // If the platform is not Android (e.g., iOS), return true (no need to ask permission).

  const apiLevel = Platform.Version as number; // Gets the Android version (API level), like 30, 31, 33, etc.

  try {

    // Declaring a variable 'permission' that will store the correct permission string depending on API level.
    // permission is a variable that will store either the READ_MEDIA_AUDIO string or the READ_EXTERNAL_STORAGE string and nothing else.
    let permission: typeof PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO | typeof PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
    console.log(PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO);
    console.log(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
    //note:PermissionsAndroid.PERMISSIONS is an object that contains strings representing Android permission names.These are just predefined constant strings used to request permissions from the Android system.


    // Newer Android versions (API 33+) use READ_MEDIA_AUDIO:
    if (apiLevel >= 33) {
      permission = PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO;
    }
    //  Older ones use READ_EXTERNAL_STORAGE: 
    else {
      permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
    }


    // Asks the user for the permission and stores the result:
    const granted = await PermissionsAndroid.request(permission, {
      title: 'Music Access Permission',
      message: 'This app needs access to your music files to play them.',
      buttonPositive: 'Allow',
      buttonNegative: 'Deny',
      buttonNeutral: 'Ask Me Later',
    });

    //Returns true if user allowed access, else false:
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.error('Failed to request storage permission', err);
    return false;
  }
}

/**
 * Recursively scans directories to find all audio files.
 * @returns {Promise<string[]>} This is a JSDoc tag/notation. It tells the reader (and tools like VS Code) what the below function (findAudioFiles) returns. findAudioFiles() is an asynchronous function.
It returns a Promise, which eventually gives you a string[] — i.e. an array of file paths for music files found on the device. for e.g:
[
  "file:///storage/emulated/0/Music/song1.mp3",
  "file:///storage/emulated/0/Downloads/song2.m4a"
]
 */
//This function searches for all music/audio files on the device and returns their paths:
async function findAudioFiles(): Promise<string[]> {
  const audioExtensions = /\.(mp3|m4a|aac|wav|flac|ogg)$/i;  // this is a regular expression to match common audio file types.

  let allAudioFiles: string[] = [];  //allAudioFiles is declared as a variable using let. 
  // : string[] tells TypeScript that this variable will hold an array of strings. 
  // = [] initializes it as an empty array at the beginning.

  // Common directories where music is stored on Android
  //These are the folders it will scan (like Music, Downloads, or full storage):
  const musicDirs = [
    RNFS.MusicDirectoryPath,
    RNFS.DownloadDirectoryPath,
    RNFS.ExternalStorageDirectoryPath, // Be cautious, this scans the entire external storage
  ];

  //The below function scanDir is a recursive async function that scans a given folder (directory) and finds all audio files inside it, including files inside subfolders (recursively). It uses the react-native-fs (RNFS) library.
  const scanDir = async (dirPath: string) => {  //dirPath is the full path of the directory/folder
    try {
      const items = await RNFS.readDir(dirPath); // List files/folders
      for (const item of items) {
        if (item.isDirectory()) {
          // Avoid scanning Android system folders for performance and relevance
          if (item.name.toLowerCase() !== 'android') {
            await scanDir(item.path);// scan inside this folder
          }
        } else if (item.isFile() && audioExtensions.test(item.name)) {
          allAudioFiles.push(item.path); // it's an audio file, add it in allAudioFiles
        }
      }
    } catch (error) {
      // It's common to hit permission errors on certain system folders, we can ignore them
      // console.warn('Could not read directory:', dirPath, error);
      console.log('error:---', error);
    }
  };

  // Run scans in parallel
  //Scans all 3 directories in parallel for better performance:
  await Promise.all(musicDirs.map(dir => scanDir(dir)));

  // Remove duplicates that might occur from overlapping directory scans
  return [...new Set(allAudioFiles)];
}

/**
 * The main function to call from your app. It handles permissions,
 * finds files, and extracts their metadata.
 * @returns {Promise<Track[]>} This is a JSDoc tag/notation. It tells the reader (and tools like VS Code) what the below function (loadLocalTracks) returns. loadLocalTracks() is an asynchronous function. It returns a Promise, which eventually gives you an array of Track objects
 */

//loadLocalTracks is a function that asks the user for permission to access music files on Android devices. This is the main function your app will call. It Asks permission ✅Scans for audio files ✅Extracts metadata from each file ✅Returns a list of valid Track objects:
export async function loadLocalTracks(): Promise<Track[]> {
  // If permission denied, exit early:
  const hasPermission = await requestStoragePermission();
  if (!hasPermission) {
    console.log('Storage permission not granted. Cannot load local tracks.');
    return []; // Return empty array if no permission
  }

  console.log('Scanning for audio files...');
  const filePaths = await findAudioFiles();  //Get all file paths of audio files
  console.log(`Found ${filePaths.length} audio files. Extracting metadata...`);

  const tracks: Track[] = []; //tracks is declared as a constant variable. 
  // : Track[] tells TypeScript that this variable will hold an array of Track objects. 
  // = [] initializes it as an empty array at the beginning.

  for (const path of filePaths) {
    try {
      // react-native-media-meta library reads the ID3 tags from the file
      const metadata = await MediaMeta.get(path); //Reads title, artist, album, cover image (if available), and duration using react-native-media-meta

      //Skip files shorter than 1 second (1000 ms):
      if (metadata.duration && parseInt(metadata.duration, 10) > 1000) { // Filter out very short files
        const track: Track = {
          //url: Must be prefixed with file:// for TrackPlayer also Fallbacks are used if data is missing (e.g., file name as title)
          url: `file://${path}`, // CRITICAL: TrackPlayer needs the 'file://' prefix
          // Use .trim() to clean the metadata before the fallback check ---
          title: metadata.title?.trim() || path.split('/').pop()?.replace(/\.[^/.]+$/, "") || 'Unknown Title',
          artist: metadata.artist?.trim() || 'Unknown Artist',
          album: metadata.album?.trim() || 'Unknown Album',
          artwork: metadata.thumb ? `data:image/jpeg;base64,${metadata.thumb}` : undefined,
          duration: metadata.duration ? Math.floor(parseInt(metadata.duration, 10) / 1000) : 0,
        };
        tracks.push(track); //Adds it to the array
      }
    } catch (error) {
      console.error('Error getting metadata for:', path, error);
    }
  }

  console.log(`Successfully processed ${tracks.length} tracks.`);
  return tracks; // Finally returns the list of all processed tracks.
}


/**
 * Fetches ALL songs from both static lists and the device,
 * combines them, and removes duplicates.
 * @returns {Promise<Track[]>} A promise that resolves to a single, clean array of all unique tracks.
 */
export const LoadAllSongs = async () => {

  // --- Step 1: get static songs(in my case from SupbaBase urls)
  const staticSongs: Track[] = SongsList.flatMap(category => (
    category.songs.map((song) => ({  //returning song object with key 'duration'
      ...song,
      duration: 0,
    }))
  ));
  //step 2: get local songs(from local files/folders):
  const localSongs = await loadLocalTracks();
  console.log('Static Songs Found:', staticSongs.length);
  console.log('Local Songs Found:', localSongs.length);

  // --- Step 3: Combine and Deduplicate(remove duplicates) ---
  const combinedSongsList = [...staticSongs, ...localSongs];
  const uniqueSongs: Track[] = [];
  const seenUrls = new Set<string>();


  for (const song of combinedSongsList) {
    if (!seenUrls.has(song.url)) {
      seenUrls.add(song.url);  //add method for set
      uniqueSongs.push(song);     //push method for array
    }
  }
  // console.log('combinedSongsList:---', combinedSongsList);
  console.log('combinedSongsList LENGTH:---', combinedSongsList.length);

  // Sort songs alphabetically by title for a nice, clean list
  uniqueSongs.sort((a, b) => a.title.localeCompare(b.title));

  console.log(`Finished processing. Total unique songs: ${uniqueSongs.length}`);

  return uniqueSongs

}




//explanation:

// In this line:

// ```ts
// const granted = await PermissionsAndroid.request(permission, {
//   title: 'Music Access Permission',
//   message: 'This app needs access to your music files to play them.',
//   buttonPositive: 'Allow',
//   buttonNegative: 'Deny',
//   buttonNeutral: 'Ask Me Later',
// });
// ```

// You're calling:

// ```ts
// PermissionsAndroid.request(permission, options)
// ```

// Let's break it down:

// ---

// ### ✅ `permission` (1st argument)

// This is the **permission you want to request**.

// It's set earlier based on the Android version:

// ```ts
// let permission;

// if (apiLevel >= 33) {
//   permission = PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO;
// } else {
//   permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
// }
// ```

// So this will be either:

// * `"android.permission.READ_MEDIA_AUDIO"` for API 33+
// * `"android.permission.READ_EXTERNAL_STORAGE"` for older versions

// ---

// ### ✅ The Object `{ title, message, buttonPositive, ... }` (2nd argument)

// This is the **rationale object**, also called `PermissionRationale`.

// It explains **why** you're asking for the permission. Android shows this to the user **when needed**, especially if they denied the permission before.

// Each key:

// * **`title`**: Title of the popup dialog.
// * **`message`**: Message shown to the user explaining why the app needs this permission.
// * **`buttonPositive`**: Label for the “Allow” button.
// * **`buttonNegative`**: Label for the “Deny” button.
// * **`buttonNeutral`**: Label for the optional “Ask Me Later” button.

// ### Example Popup

// On Android, this could show a dialog like:

// > **Music Access Permission**
// > This app needs access to your music files to play them.
// > \[Deny] \[Ask Me Later] \[Allow]


// ### 📄 Code Explanation:

// ```ts
// const scanDir = async (dirPath: string) => {
// ```

// * Declares an **asynchronous function** called `scanDir`.
// * Takes a single parameter `dirPath`, which is the full path of a folder (as a `string`).

// ---

// ```ts
// const items = await RNFS.readDir(dirPath); // List files/folders
// ```

// * Uses `RNFS.readDir()` to read all items (files and folders) inside `dirPath`.
// * `items` is an array of file/folder objects, each having properties like `.isDirectory()`, `.name`, `.path`, etc.

// for Example:

// If your folder contains:

// /storage/emulated/0/Music/

//   ├── MyFolder/          <- a subdirectory
//   ├── song1.mp3          <- a file
//   ├── song2.wav          <- a file

// Then items will look like:
// [
//   {
//     name: "MyFolder",
//     path: "/storage/emulated/0/Music/MyFolder",
//     isDirectory: () => true,
//     isFile: () => false
//   },
//   {
//     name: "song1.mp3",
//     path: "/storage/emulated/0/Music/song1.mp3",
//     isDirectory: () => false,
//     isFile: () => true
//   },
//   ...
// ]


// ---

// ```ts
// for (const item of items) {
// ```

// * Loops through each item found in the directory.

// ---

// ```ts
// if (item.isDirectory()) {
// ```

// * Checks if the item is a **folder** (i.e., a directory).

// ---

// ```ts
// if (item.name.toLowerCase() !== 'android') {
//   await scanDir(item.path); // scan inside this folder
// }
// ```

// * Avoids scanning folders named 'android' (system folders) for performance and safety.
// * If it's not named 'android' then recursively call scanDir by passing item.path as it's arugment which scans the contents of that subfolder.

// ---

// ```ts
// } else if (item.isFile() && audioExtensions.test(item.name)) {
//   allAudioFiles.push(item.path); // it's an audio file, add it
// }
// ```

// * If the item is a **file**, it checks if the file extension matches audio types (like `.mp3`, `.wav`, etc.).
// * If it is an audio file, it **adds its path** to the `allAudioFiles` array.

// Let’s break down this line step by step:

// ```ts
// await Promise.all(musicDirs.map(dir => scanDir(dir)));
// ```

// ---

// ### 🔍 What's happening here?

// #### 1. `musicDirs`

// This is an array of directory paths to scan for audio files:

// ```ts
// const musicDirs = [
//   RNFS.MusicDirectoryPath,
//   RNFS.DownloadDirectoryPath,
//   RNFS.ExternalStorageDirectoryPath,
// ];
// ```

// #### 2. `musicDirs.map(dir => scanDir(dir))`

// 'dir' is just a variable name representing each element inside the musicDirs array.
// This takes every path in `musicDirs` and **calls `scanDir()`** on it:

// * `scanDir()` is an `async` function that scans a directory and subdirectories for audio files.
// * `.map(...)` transforms each path into a **Promise** returned by `scanDir(...)`.

// So after this `.map(...)`, you get something like:

// ```ts
// [
//   Promise<scan results of music dir>,
//   Promise<scan results of download dir>,
//   Promise<scan results of external storage>
// ]
// ```

// #### 3. `Promise.all([...])`

// This waits for **all of those promises to finish** at the same time (in parallel).
// It’s **faster** than doing one after another.

// #### 4. `await`

// This pauses the function until **all directories have been scanned**.

// Let's break down this line:

// ```ts
// return [...new Set(allAudioFiles)];
// ```

// ### ✅ What it does:

// It **removes duplicate file paths** from the `allAudioFiles` array and returns a new array with only **unique** values.

// ---

// ### 🔍 Step-by-step explanation:

// 1. **`new Set(allAudioFiles)`**

//    * A `Set` in JavaScript is a collection of **unique values only**.
//    * So if `allAudioFiles` contains duplicate paths (like the same song being present in both `/Music` and `/Download`), using a `Set` will automatically **filter them out**.

// 2. **`[...new Set(...)]`**

//    * This uses the **spread operator (`...`)** to convert the `Set` back into a regular JavaScript **array**.
//    * Because `Set` isn’t an array by default, this turns it back into a format like:
//      `['song1.mp3', 'song2.mp3', ...]`

//explanation:
// ```ts
// export async function loadLocalTracks(): Promise<Track[]>
// ```

// ### 📌 What it means:

// * `loadLocalTracks` is an **`async` function**, meaning:

//   * It will **always return a Promise**.
//   * You must use `await` or `.then()` to handle its result.

// * `Promise<Track[]>` means:

//   * This Promise will eventually **resolve** to an **array of `Track` objects**.
//   * The typescript type `Track[]` refers to(which we defined earlier):

//     ```ts
//     interface Track {
//       url: string;
//       title: string;
//       artist: string;
//       album: string;
//       artwork?: string;
//       duration: number;
//     }
//     ```
// ### ✅ Example Usage:

// ```ts
// const tracks = await loadLocalTracks();  // tracks is of type Track[]
// console.log(tracks[0].title);            // Access a property of the first track

//explanation:

// ```ts
//   const hasPermission = await requestStoragePermission();
// ```

// * Calls the `requestStoragePermission()` function.
// * `await` waits until permission is granted or denied.
// * Result is stored in `hasPermission` (either `true` or `false`).

// ```ts
//   if (!hasPermission) {
//     console.log('Storage permission not granted. Cannot load local tracks.');
//     return []; // Return empty array if no permission
//   }
// ```

// * If permission was **not granted**, it:

//   * Logs a message to the console.
//   * Returns an **empty array** to indicate no tracks could be loaded.
//   * Exits the function early.


// ```ts
//   console.log('Scanning for audio files...');
//   const filePaths = await findAudioFiles();  // Get all file paths of audio files
// ```

// * Logs a message that scanning is starting.
// * Calls `findAudioFiles()` which searches the filesystem for audio files.
// * `filePaths` now contains an array of string paths to those audio files.

// ---

// ```ts
//   console.log(`Found ${filePaths.length} audio files. Extracting metadata...`);

// filePaths is an array of strings, each string being the full path to an audio file.
// filePaths.length gives the number of audio files found.
// if you have 15 valid audio files in the scanned folders, then:
// filePaths.length === 15
// ```

// * Logs how many audio files were found and that metadata extraction will start.

// ---

// ```ts
//   const tracks: Track[] = [];
// ```

// //tracks is declared as a constant variable.
// // : Track[] tells TypeScript that this variable will hold an array of Track objects.
// // = [] initializes it as an empty array at the beginning..

// ---

// ```ts
//   for (const path of filePaths) {
// ```

// This is a **`for...of` loop** in TypeScript/JavaScript. It is used to **iterate over the values** of an iterable (like an array).

// ---

// ### 🔹 `filePaths`:

// * `filePaths` is an **array of strings** which was declared earlier in the code in statement: onst filePaths = await findAudioFiles(); .
// * Each string is a **full file path** to an audio file on the device.
// * For example:

//   ```ts
//   filePaths = [
//     "/storage/emulated/0/Music/song1.mp3",
//     "/storage/emulated/0/Download/song2.mp3",
//     ...
//   ];
//   ```

// ### 🔹 `path`:

// * In each loop iteration, `path` will hold the **current file path string** from the `filePaths` array.
// * So, if `filePaths.length === 3`, this loop will run **3 times**, and each time `path` will be:

//   1. `"/storage/emulated/0/Music/song1.mp3"`
//   2. `"/storage/emulated/0/Download/song2.mp3"`
//   3. etc.

// ---

// ###Example:

// ```ts
// for (const path of filePaths) {
//   console.log(path);
// }
// ```

// This would print each file path in the console.

// * `filePaths` = array of file paths (strings).
// * `path` = single file path from that array in the current loop iteration.

// ---

// ```ts
//     try {
//       const metadata = await MediaMeta.get(path);
// ```

// * Inside a `try` block to safely handle errors.
// * Calls `MediaMeta.get(path)` to read metadata (like title, artist, duration) from the file.
// * `await` ensures the function waits for the result.

// ---

// ```ts
//       if (metadata.duration && parseInt(metadata.duration, 10) > 1000) {
// ```
// This line checks two things before using a track:

// Whether the track has a valid duration.

// Whether the duration is greater than 1000 milliseconds (i.e. more than 1 second).

// ✅Explanation:
// 1. metadata.duration
// Checks if the duration field exists and is not null/undefined/empty.

// duration is a string in milliseconds (e.g., "345000" for 5 minutes 45 seconds).

// This ensures that there's actually a duration value before trying to use it.

// 2. parseInt(metadata.duration, 10)
// Converts the duration string to a number using base 10.

// Example: parseInt("345000", 10) → 345000.

// 3. > 1000
// Filters out very short audio clips (less than 1 second).

// 1000 milliseconds = 1 second.

// ---

// ```ts
//         const track: Track = {
// ```

// * Creates a new object of type `Track`.

// ---

// ```ts
//           url: `file://${path}`,
// ```

// * Adds a `file://` prefix to make it a valid media URL for `react-native-track-player`.

// ---

// ```ts
//           title: metadata.title || path.split('/').pop()?.replace(/\.[^/.]+$/, "") || 'Unknown Title',
// ```

// * Uses metadata title **if available**.
// * Else, extracts the filename from the path (and removes the `.mp3` extension).
// * Else, falls back to `'Unknown Title'`.

// ---

// ```ts
//           artist: metadata.artist || 'Unknown Artist',
//           album: metadata.album || 'Unknown Album',
// ```

// * Uses metadata values if present.
// * Otherwise, uses fallbacks.

// ---

// ```ts
//           artwork: metadata.thumb ? `data:image/jpeg;base64,${metadata.thumb}` : undefined,
// ```

// * If artwork (thumbnail) is available in base64 format:

//   * Converts it into a data URL that can be used in `<Image>` tags.
// * Else sets it to `undefined`.

// ---

// ```ts
//           duration: metadata.duration ? Math.floor(parseInt(metadata.duration, 10) / 1000) : 0,
// ```

// * Converts `duration` from milliseconds to **seconds**.
// * If not available, defaults to `0`.

// ---

// ```ts
//         };
//         tracks.push(track);
// ```

// * Finalizes the `track` object.
// * Adds it to the `tracks` array.

// ---

// ```ts
//     } catch (error) {
//       console.error('Error getting metadata for:', path, error);
//     }
// ```

// * If something fails while reading metadata (like corrupt file or no read access), it:

//   * Logs the error with the specific file path.

// ---

// ```ts
//   console.log(`Successfully processed ${tracks.length} tracks.`);
// ```

// * After processing all paths, logs how many tracks were successfully prepared.

// ---

// ```ts
//   return tracks;
// }
// ```

// * Returns the final `tracks` array back to the caller.