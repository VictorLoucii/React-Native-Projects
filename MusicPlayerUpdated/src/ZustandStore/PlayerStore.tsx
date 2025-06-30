import { create } from 'zustand';

// Define the shape of your store's state and actions
interface PlayerState {
  activePlaylistId: string | null;
  setActivePlaylistId: (playlistId: string | null) => void;  //setActivePlaylistId is a function. It takes one argument named playlistId. The argument must be of type string or null. It returns nothing (void means no return value).
  // ... other player states like activeTrack, isPlaying, etc.
}

export const usePlayerStore = create<PlayerState>((set) => ({
  // The State:
  activePlaylistId: null, // Initially, no playlist is active

  // The Action:
  // This is a function that takes a new playlistId (i.e categoryId which will come from SongCardWithCategory.tsx) and updates the state.
  setActivePlaylistId: (playlistId) => set({ activePlaylistId: playlistId }),

  // ... other initial states and actions
}));

// Explanation:
// setActivePlaylistId: (playlistId) => set(...): This defines the action.
// It's a function that accepts one argument, playlistId.
// When called, it uses Zustand's set function to update the activePlaylistId in the store with the new value that was passed in.
// So, when you call setActivePlaylistId('Recommended for You') from your component, you are telling Zustand, "Update the activePlaylistId in the global store to be 'Recommended for You'."