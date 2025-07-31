// Note: Supabase credentials are loaded from the `.env` file (which is gitignored).

import 'react-native-url-polyfill/auto' // Required for Supabase to work in React Native, check below for further explanaion
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env'; // import from .env file

import AsyncStorage from '@react-native-async-storage/async-storage';

console.log('Attempting to load Supabase URL:', SUPABASE_URL);

//Make sure the variables exist
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Supabase URL or Anon Key is missing from .env file');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage, // Use AsyncStorage for session persistence,tells Supabase where to save that memory on the user's phone
    autoRefreshToken: true,
    persistSession: true,  //tells Supabase you want to remember the user
    detectSessionInUrl: false,
  },
})


//This file does one simple but powerful thing: it creates a supabase client object that you can now import and use anywhere in your app to talk to your backend. The react-native-url-polyfill import at the top is crucial; it fixes some compatibility issues and must come first.


// AsyncStorage (The Memory):
// Required to keep the user logged in. By default, Supabase saves the user's session in browser storage (localStorage), which React Native doesn't have. AsyncStorage provides a persistent memory on the phone for Supabase to save the session, so it isn't lost when the app closes.
// URL-Polyfill (The Translator):
// Required to prevent authentication crashes. Supabase's auth code was built for browsers and uses modern URL features for handling things like magic links and password resets. React Native's environment is slightly different and lacks some of these features. The polyfill adds them, ensuring Supabase's code can run without errors.