
import { create } from 'zustand';
import { LoadAllSongs, Track } from '../services/MusicFileService'; 

// Define the state and actions for the store
interface SearchState {
  isSearchActive: boolean;
  searchQuery: string;
  allSongsForSearch: Track[];
  filteredSongs: Track[];
  searchInAllSongs: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  toggleSearch: (isActive: boolean) => void;
}

//defined a hook/store:
const useSearchStore = create<SearchState>((set, get) => ({
  // Initial State
  isSearchActive: false,
  searchQuery: '',
  allSongsForSearch: [], //this array will hold the master list
  filteredSongs: [],

  // Actions (The Functions to Change State):

  searchInAllSongs: async () => {
    // Prevent re-loading using get() if we already have the songs
    if (get().allSongsForSearch.length > 0) return;

    const allTracks = await LoadAllSongs();
    set({ allSongsForSearch: allTracks });
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
    //case: if the query is an empty string
    if (query === '') {
      set({ filteredSongs: [] });  //empty array
      return;
    }
    //case: if the query is not an empty string
    const allSongs = get().allSongsForSearch; //using get() for better performance
    const results = allSongs.filter(
      song =>
        song.title.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase())
    );
    set({ filteredSongs: results });
  },

  toggleSearch: (isActive) => {
    set({ isSearchActive: isActive });  //do this when isActive is true

    // When search is deactivated, clear the query and results
    if (!isActive) { //do this when isActive is false
      set({ searchQuery: '', filteredSongs: [] });
    }
  },
}));

export default useSearchStore;

//This file is the "brain" of your search functionality. Understanding it is key to building the rest of the feature.

// The purpose of this file is to create a global state store using Zustand. This store will hold all the data and logic related to searching in one central place, so that any component in your app (like the Header or your screens) can access it without needing to pass props down through many layers.

// Detailed Statement-by-Statement Explanation
// Imports
// Generated typescript
// import { create } from 'zustand';
// import { LoadAllSongs, Track } from '../services/MusicFileService';


// import { create } from 'zustand';: This imports the main function from the Zustand library that is used to create a new store.

// import { LoadAllSongs, Track } from '...';: This imports two things from your service file:

// LoadAllSongs: The powerful, reusable function you created that fetches, combines, and deduplicates every song in the app.

// Track: The TypeScript interface that defines the "shape" of a song object.

// The SearchState Interface (The Blueprint)
// Generated typescript
// interface SearchState {
//   isSearchActive: boolean;
//   searchQuery: string;
//   allSongsForSearch: Track[];
//   filteredSongs: Track[];
//   searchInAllSongs: () => Promise<void>;
//   setSearchQuery: (query: string) => void;
//   toggleSearch: (isActive: boolean) => void;
// }

// This is a TypeScript interface. It acts as a strict contract or blueprint. It declares what the store must contain.

// isSearchActive: boolean;: A simple true/false flag to know if the search UI should be visible.

// searchQuery: string;: Will hold the text the user is currently typing in the search bar.

// allSongsForSearch: Track[];: This will hold the master list of every unique song. We load this once for performance.

// filteredSongs: Track[];: This will hold the results of the search, which is what the UI will actually display.

// searchInAllSongs: () => Promise<void>;: Defines a function that takes no arguments and returns a Promise (because it's async). void means it doesn't return a value; its job is to update the state.

// setSearchQuery: (query: string) => void;: Defines a function that takes a string (the search text) and returns nothing.

// toggleSearch: (isActive: boolean) => void;: Defines a function that takes a boolean to turn search on or off and returns nothing.

// create<SearchState>((set, get) => ({ ... })) (The Factory)
// Generated typescript
// const useSearchStore = create<SearchState>((set, get) => ({
//   // ... store content ...
// }));

// const useSearchStore = ...: We are creating a new custom hook called useSearchStore. This is what your components will use to access the store.

// create<SearchState>: We call the create function and pass our SearchState interface as a generic type. This tells Zustand, "The store you are creating must follow the rules of the SearchState blueprint." This provides type safety and autocomplete.

// (set, get) =>: The create function gives you a "factory" function. This factory receives two essential tools from Zustand as arguments:

// set: The function you call to update the state.

// get: The function you can call inside an action to read the current state without triggering a re-render. This is crucial for performance.

// => ({ ... }): The factory function returns a single object that contains both the initial state values and the action functions that can change them.

// The Initial State
// Generated typescript
// // Initial State
// isSearchActive: false,
// searchQuery: '',
// allSongsForSearch: [],
// filteredSongs: [],

// This section defines the default values for your state when the app first loads.

// isSearchActive is false (search is off).

// searchQuery is an empty string.

// allSongsForSearch and filteredSongs start as empty arrays.

// The Actions (The Functions to Change State)
// Generated typescript
// searchInAllSongs: async () => {
//   if (get().allSongsForSearch.length > 0) return;

//   const allTracks = await LoadAllSongs();
//   set({ allSongsForSearch: allTracks });
// },

// Purpose: To load the master list of all songs, but only do it once.

// if (get().allSongsForSearch.length > 0) return;: This is a critical performance optimization. It uses get() to check the current state. If the master list already has songs in it, it does nothing and exits early. This prevents the app from re-scanning the entire device every time.

// const allTracks = await LoadAllSongs();: If the list is empty, it calls your reusable service function to get all unique songs.

// set({ allSongsForSearch: allTracks });: It uses set to update the state, populating the allSongsForSearch array with the master list.

// Generated typescript
// setSearchQuery: (query) => {
//   set({ searchQuery: query });
//   if (query === '') {
//     set({ filteredSongs: [] });
//     return;
//   }
//   const allSongs = get().allSongsForSearch;
//   const results = allSongs.filter(
//     song =>
//       song.title.toLowerCase().includes(query.toLowerCase()) ||
//       song.artist.toLowerCase().includes(query.toLowerCase())
//   );
//   set({ filteredSongs: results });
// },

// Purpose: To perform the actual search logic.

// set({ searchQuery: query });: It first updates the searchQuery state so the search bar in the UI shows what the user is typing.

// if (query === '') { ... }: If the user clears the search bar, this clears the filteredSongs array, hiding the results.

// const allSongs = get().allSongsForSearch;: It gets the master list from the state.

// The Goal of the .filter() Callback

// The .filter() method loops through every song in the allSongs array. For each song, it executes the callback function you provide. The job of that callback function is to return either true or false.

// If the function returns true, the song is kept and included in the new results array.

// If the function returns false, the song is discarded.

// The Callback Function Explained

// Your callback function is:

// Generated javascript
// song =>
//   song.title.toLowerCase().includes(query.toLowerCase()) ||
//   song.artist.toLowerCase().includes(query.toLowerCase())


// This function performs two checks, connected by an OR (||) operator.

// song.title.toLowerCase().includes(query.toLowerCase()):

// song.title: Takes the title of the current song (e.g., "Fell For A Demon").

// .toLowerCase(): Converts it to lowercase ("fell for a demon").

// query.toLowerCase(): Takes the user's search text (e.g., "Demon") and also converts it to lowercase ("demon").

// .includes(): This is a string method that checks if the first string contains the second string. It returns true or false.

// Result: Does "fell for a demon" include "demon"? Yes (true).

// song.artist.toLowerCase().includes(query.toLowerCase()):

// This does the exact same process, but with the song's artist property.

// The || (OR) operator means that if EITHER the title check OR the artist check returns true, the entire condition is considered true, and the song is kept.

// Example Walkthrough

// Let's imagine your allSongs array has these three songs:

// Generated javascript
// [
//   { title: 'Fell For A Demon', artist: 'boy-epic' },
//   { title: 'Cybernetic', artist: 'Rameses B' },
//   { title: 'Apart', artist: 'Sub-human' }
// ]

// And the user types man into the search bar, so query is "man".

// The .filter() loop begins:

// Iteration 1: song = { title: 'Fell For A Demon', artist: 'boy-epic' }

// Check 1 (Title):

// song.title.toLowerCase() becomes "fell for a demon".

// query.toLowerCase() becomes "man".

// Does "fell for a demon" include "man"? No (false).

// Check 2 (Artist):

// song.artist.toLowerCase() becomes "boy-epic".

// query.toLowerCase() is "man".

// Does "boy-epic" include "man"? No (false).

// Final Result: false || false is false. This song is discarded.

// Iteration 2: song = { title: 'Cybernetic', artist: 'Rameses B' }

// Check 1 (Title):

// "cybernetic".includes("man")? No (false).

// Check 2 (Artist):

// "rameses b".includes("man")? No (false).

// Final Result: false || false is false. This song is discarded.

// Iteration 3: song = { title: 'Apart', artist: 'Sub-human' }

// Check 1 (Title):

// "apart".includes("man")? No (false).

// Check 2 (Artist):

// "sub-human".includes("man")? Yes (true).

// Final Result: false || true is true. This song is kept!

// The Final results Array

// After the loop is finished, the .filter() method returns its new array containing only the songs that passed the test. In this example, the results variable would be:

// Generated javascript
// [
//   { title: 'Apart', artist: 'Sub-human' }
// ]

// This is then set as the filteredSongs in your Zustand store, and your UI will update to show only this one song.

// set({ filteredSongs: results });: It updates the filteredSongs state with the search results.

// Generated typescript
// toggleSearch: (isActive) => {
//   set({ isSearchActive: isActive });
//   if (!isActive) {
//     set({ searchQuery: '', filteredSongs: [] });
//   }
// },

// Purpose: To turn the search mode on and off.

// set({ isSearchActive: isActive });: This flips the main isSearchActive switch. this happens when isActive is true.

// if (!isActive) { ... }: This is a crucial cleanup step. When the user deactivates search (e.g., presses a "back" button), this ensures that the searchQuery and filteredSongs are cleared, resetting the state for the next time they use the search feature. This happens when isActive is false.