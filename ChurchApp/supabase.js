import 'react-native-url-polyfill/auto'; // This must be at the top
import { createClient } from '@supabase/supabase-js';

// Find these in your Supabase project settings > API
const supabaseUrl = 'https://nmrvqljaropmkxkzbkra.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tcnZxbGphcm9wbWt4a3pia3JhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1Nzk4MjQsImV4cCI6MjA2NjE1NTgyNH0.INZGTY0naCApifxv82ICPdEgLYWdvjaomwZEmEvnCvU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


//This file does one simple but powerful thing: it creates a supabase client object that you can now import and use anywhere in your app to talk to your backend. The react-native-url-polyfill import at the top is crucial; it fixes some compatibility issues and must come first.