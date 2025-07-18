import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ShuffleState {
    isShuffleOn: boolean;
    toggleShuffle: () => void;
}

// Create the store with persistence
export const useShuffleStore = create<ShuffleState>()(
    persist(
        (set) => ({
            // Initial state
            isShuffleOn: false,

            // Action to toggle the shuffle state
            toggleShuffle: () => set((state) => ({ isShuffleOn: !state.isShuffleOn })),
        }),
        {
            name: 'shuffle-storage', // The key under which the state will be stored in AsyncStorage
            storage: createJSONStorage(() => AsyncStorage), // Specify AsyncStorage as the storage medium
        }
    )
);

