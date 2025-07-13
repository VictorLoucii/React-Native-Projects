import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env'; // import from .env file

console.log('Attempting to load Supabase URL:', SUPABASE_URL);

//Make sure the variables exist
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Supabase URL or Anon Key is missing from .env file');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


//This file does one simple but powerful thing: it creates a supabase client object that you can now import and use anywhere in your app to talk to your backend. The react-native-url-polyfill import at the top is crucial; it fixes some compatibility issues and must come first.