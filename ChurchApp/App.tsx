import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HomeScreen from './src/screens/HomeScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigator from './src/navigation/TabNavigator'
import { useThemeStore } from './src/themes/ThemeStore'
import { DarkMode } from './src/themes/DarkMode'
import { LightMode } from './src/themes/LightMode'
import AuthScreen from './src/screens/AuthScreen'
import { Session } from '@supabase/supabase-js';
import { MenuProvider } from 'react-native-popup-menu';
import SplashScreen from 'react-native-splash-screen';


// --- IMPORT THE PROVIDER component ---
import { TabBarVisibilityProvider } from './src/contexts/TabBarVisibilityContext'

// --- IMPORTS for supabase ---
import { supabase } from './supabase';
import { useProfileStore } from './src/ZustandStore/ProfileStore'; // Import your new profile store

const App = () => {

  const [session, setSession] = useState<Session | null>(null);



  const scheme = useColorScheme();
  console.log('schme:----', scheme);
  // Get actions from the store ONCE at the top level of the component.
  const fetchProfile = useProfileStore((state) => state.fetchProfile);
  const clearProfile = useProfileStore((state) => state.clearProfile);

  const { isDarkMode, toggleTheme } = useThemeStore();
  console.log('isDarkMode:------', isDarkMode);

  // Get the actions from your profile store 

  useEffect(() => {

    SplashScreen.hide();  //this should be at top 

    // Check for an active session AND fetch the profile when the app starts
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);

      // If a session exists, the user is already logged in. Fetch their profile.
      if (session) {
        fetchProfile();
      }
    });

    // Listen for subsequent changes in auth state
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (_event === 'SIGNED_OUT') {
          clearProfile();
        } else if (_event === 'SIGNED_IN') {
          // This will now handle new sign-ins after the app is already running
          fetchProfile();
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [fetchProfile, clearProfile]); // Adding the stable functions to the dependency array


  // // THIS ENTIRE BLOCK FOR testing TEMPORARY LOGIN:
  // useEffect(() => {
  //   const temporaryLogin = async () => {
  //     console.log("Attempting temporary login as john.doe@example.com...");

  //     const { error } = await supabase.auth.signInWithPassword({
  //       email: 'john.doe@example.com', // The email of the user you just created
  //       password: 'password123',       // The password you created for this user
  //     });

  //     if (error) {
  //       console.error("Temporary login FAILED:", error.message);
  //     } else {
  //       console.log("Temporary login SUCCESSFUL!");
  //     }
  //   };

  //   temporaryLogin();
  // }, []); // The empty array [] ensures this runs only once when the app starts.
  // //  END OF TEMPORARY LOGIN BLOCK 



  return (
    <SafeAreaProvider>
      {/* 
        MenuProvider MUST be the outermost provider that wraps all visual components
      */}
      <MenuProvider>
        {/* ---  WRAP THE NAVIGATOR WITH THE PROVIDER for toggling tab bar visibility,  placed above all components that need to access its state--- */}
        <TabBarVisibilityProvider>
          <NavigationContainer theme={isDarkMode ? DarkMode : LightMode}>
            {/* conditional rendering */}
            {session && session.user ? <TabNavigator /> : <AuthScreen />}

            {/* <TabNavigator /> */}
            {/* <AuthScreen /> */}

          </NavigationContainer>
        </TabBarVisibilityProvider>
      </MenuProvider>
    </SafeAreaProvider>

  )
}

export default App

const styles = StyleSheet.create({

})