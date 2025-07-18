import { create } from 'zustand';
import { isExist } from '../utilityFunction';
import AsyncStorage from '@react-native-async-storage/async-storage';


//create a hook/store:
const useLikedSongs = create((set) => ({
  likedSongs: [],  // ✅ Initial state: Liked songs list is empty

  addToLiked: async (newSong) => {  //add aysnc keyword here (parent function)
    console.log('newSong:-----',newSong);
    let updatedSongs; // Declare variable to store updated  Zustand state

    set((state) => {  //don't put async keyword here, it should be in the parent function
     // ✅ Check if the song already exists in the likedSongs list by call the 'isExist' function which has been defined in module index.js in utitlityFunction folder
      const isAlreadyExist = isExist(state.likedSongs, newSong);

       // ✅ If song exists → remove it (unlike), otherwise → add it to the beginning
      updatedSongs = isAlreadyExist 
      ? state.likedSongs.filter((item) => item.url !== newSong.url)  //remove duplicates
      : [newSong, ...state.likedSongs];   // ✅ Add new song to the beginning

      return { likedSongs: updatedSongs }; // ✅ Keeps Zustand state update function synchronous
    });
    // ✅ Perform async operation AFTER updating Zustand state, it should be outside the Zustand 'set' function
    await AsyncStorage.setItem('likedSongs', JSON.stringify(updatedSongs));
  },
  loadLikedSongs: async() => {
    try{
      // ✅ Fetch liked songs from AsyncStorage
      const storedLikedSongs = await AsyncStorage.getItem('likedSongs')
      console.log('loadLikedSongs in async storage:-----', storedLikedSongs || 'no data found');
      if(storedLikedSongs){
      // ✅ Update Zustand state with stored liked songs after parsing JSON
        set({ likedSongs: JSON.parse(storedLikedSongs)});
      }
    }
    catch(error){
      console.log('error: ======', error);
    }
  }
}));

export default useLikedSongs;

// In `likeStore.jsx`, you're using **Zustand**, a global lightweight state management library for React. Let's break down the `create((set) => ({ ... }))` function and clarify how `set`, `state.likedSongs`, and `newSong` work.

// ---

// ### **1. What is `set` in `create((set) => ({ ... }))`?**
// - `set` is a function provided by Zustand to update the state.
// - Zustand’s `create` function allows you to define a **store**, which holds state and functions to update it.
// - When you call `set()`, you update the state inside the store.

// #### **Example of `set` in action:**
// ```js
// set((state) => ({ likedSongs: [...state.likedSongs, newSong] }));
// ```
// - `state` refers to the current Zustand store.
// - The function updates `likedSongs` by adding `newSong` to the array.

// ---

// ### **2. What is `state.likedSongs`?**
// - `state.likedSongs` represents the array of liked songs stored in Zustand.
// - The initial state of `likedSongs` is defined when calling `create`:
//   ```js
//   const useLikedSongs = create((set) => ({
//       likedSongs: [], // Initially, likedSongs is an empty array
//   }));
//   ```
// - `state` is automatically managed by Zustand, so you don’t need to define it separately.

// ---

// ### **3. What is `newSong`, and where is it defined?**
// - `newSong` is a parameter(activeTrack) passed into the `addToLiked` function defined in file 'PlayerSCreen.jsx'.
// - It is the track (song) that a user wants to add to the liked songs list.

// #### **Example usage:**
// In `PlayerScreen.jsx`, when the user presses the heart icon, the following function is called:
// ```js
// <TouchableOpacity onPress={() => addToLiked(activeTrack)}>
// ```
// Here, `activeTrack` is passed as `newSong` in:
// ```js
// addToLiked(activeTrack);
// ```
// So `newSong` is **defined dynamically** when calling `addToLiked`, rather than being declared inside `likeStore.jsx`.

// ---

// ### **4. How does `addToLiked` work?**
// ```js
// addToLiked: (newSong) => {
//     set((state) => {
//       let isAlreadyExist = isExist(state.likedSongs, newSong);

//       const updatedSongs = isAlreadyExist
//         ? state.likedSongs // If the song exists, keep the list unchanged
//         : [newSong, ...state.likedSongs]; // Otherwise, add it to the list

//       return {
//         likedSongs: updatedSongs, // Update Zustand state
//       };
//     });
//   },
// ```
// - It checks if `newSong` already exists using `isExist()`.
// - If `newSong` **already exists**, `likedSongs` remains unchanged.
// - If `newSong` **does not exist**, it is added to `likedSongs`.

// ---

// ### **Final Summary:**
// - `set`: Zustand’s function for updating the state.
// - `state.likedSongs`: Zustand’s internal state, initialized as an empty array.
// - `newSong`: A parameter representing a song, passed dynamically when calling `addToLiked`.
// - Zustand automatically manages the store, so you don’t need to explicitly define `state` elsewhere.