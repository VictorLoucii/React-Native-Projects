import { create } from 'zustand';
import { supabase } from '../../supabase';

/**
 * This file defines a Zustand store for managing the user's profile data.
 * It handles fetching the profile, updating it locally for instant UI changes,
 * and clearing it on logout.
 */

// Define the TypeScript interface for the shape of a single profile
interface Profile {
  username: string | null;
  avatar_url: string | null;
  phone_number: string | null;
  email: string | null; // <-- ADD THIS LINE

}

// Define the interface for the store's state and actions
interface ProfileStore {
  profile: Profile | null; // Holds the user's profile data
  loading: boolean;        // True when the profile is being fetched
  fetchProfile: () => Promise<void>; // Action to fetch profile from Supabase
  updateProfile: (newProfileData: Partial<Profile>) => void; // Action to update local state instantly
  clearProfile: () => void; // Action to clear profile on logout
}

export const useProfileStore = create<ProfileStore>((set) => ({
  // --- INITIAL STATE ---
  profile: null,
  loading: false,

  // --- ACTIONS ---

  /**
   * Fetches the currently authenticated user's profile from the 'profiles' table.
   */
// In src/ZustandStore/ProfileStore.tsx

fetchProfile: async () => {
  set({ loading: true });
  try {
    const { data: { user } } = await supabase.auth.getUser();
    console.log("FETCH PROFILE: Got user?", user ? user.id : 'NO USER'); // <-- LOG 1

    if (user) {
      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, avatar_url, phone_number`)
        .eq('id', user.id)
        .single();
      
      // --- CRITICAL LOGGING ---
      console.log("FETCH PROFILE: Supabase response:"); // <-- LOG 2
      console.log("  - Data:", data);
      console.log("  - Error:", error);
      console.log("  - Status:", status);
      // --- END OF LOGGING ---

      if (error && status !== 406) {
        throw error;
      }

      const profileData: Profile = {
        username: data?.username ?? null,
        avatar_url: data?.avatar_url ?? null,
        phone_number: data?.phone_number ?? null,
        email: user.email ?? null,
      };

      set({ profile: profileData, loading: false });

    } else {
      set({ profile: null, loading: false });
    }

  } catch (error) {
    console.error('Error in fetchProfile action:', (error as Error).message); // <-- LOG 3
    set({ profile: null, loading: false });
  }
},


  /**
   * Updates the profile data in the local store.
   * This provides an instant UI update without needing to re-fetch from the database.
   * @param newProfileData - An object containing the new profile fields to update.
   */
  updateProfile: (newProfileData) => {
    set((state) => ({
      // Merge existing profile with the new data
      profile: state.profile ? { ...state.profile, ...newProfileData } : null,
    }));
  },

  /**
   * Clears the profile data from the store, typically used on logout.
   */
  clearProfile: () => {
    set({ profile: null });
  },
}));