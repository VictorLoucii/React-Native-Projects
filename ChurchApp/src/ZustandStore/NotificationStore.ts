import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the shape of the store's state and actions
interface NotificationState {
  isNotificationsEnabled: boolean;
  toggleNotifications: () => void;  //toggleNotifications is a function that return void/nothing 
}

// Create the store
export const useNotificationStore = create<NotificationState>()(
  // Use the 'persist' middleware to save the setting to AsyncStorage
  persist(
    (set) => ({
      // Initial state
      isNotificationsEnabled: true, // Default to true

      // Action to toggle the state
      toggleNotifications: () =>
        set((state) => ({ isNotificationsEnabled: !state.isNotificationsEnabled })),
    }),
    {
      name: 'notification-storage', // assigned unique name for the storage item
      storage: createJSONStorage(() => AsyncStorage), // specify AsyncStorage as the storage medium
    }
  )
);

// Explanation:
// We create a simple store that holds one piece of state: isNotificationsEnabled.
// The toggleNotifications action allows any component to flip this boolean value.
// We use the persist middleware with AsyncStorage, which is crucial. This will automatically save the user's notification preference on their device, so it's remembered the next time they open the app