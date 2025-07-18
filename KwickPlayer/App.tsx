import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './src/screens/HomeScreen'
import LikedScreen from './src/screens/LikedScreen';
import PlayerScreen from './src/screens/PlayerScreen';
import StackNavigation from './src/navigation/StackNavigation';
import DrawerNavigation from './src/navigation/DrawerNavigation';

import TrackPlayer from 'react-native-track-player';
import { UseSetUpPlayer } from './src/hooks/UseSetUpPlayer';
import useLikedSongs from './src/ZustandStore/LikeStore';
import { DarkMode } from './src/theme/DarkMode';
import { LightMode } from './src/theme/LightMode';
import { useThemeStore } from './src/theme/ThemeStore';
import useSearchStore from './src/ZustandStore/SearchStore';
import SplashScreen from 'react-native-splash-screen';



const App = () => {

  const scheme = useColorScheme();
  console.log('scheme:==', scheme);

  const { isDarkMode, toggleTheme } = useThemeStore();
  console.log('isDarkMode:------', isDarkMode);

  const { loadLikedSongs } = useLikedSongs();
  const { searchInAllSongs } = useSearchStore();

  //EFFECT 1: Runs only ONCE when the app starts
  useEffect(() => {
    SplashScreen.hide();

    //call loadLikedSongs() in the useEffect of your main App.tsx component, then you do not and should not call it again in your other screens like LikedScreen, AllSongsScreen, or PlayerScreen, This is the ideal architecture for managing global state like "liked songs"
    loadLikedSongs();
    searchInAllSongs();

  }, [])

  //EFFECT 2: Runs whenever the system theme (scheme) changes
  useEffect(() => {
    // This syncs your app's theme with the system's theme
    scheme === 'light' ? toggleTheme(false) : toggleTheme(true);
  }, [scheme]); // The [scheme] array means "re-run this if scheme changes"

  const onLoad = () => {
    console.log('onLoad function executed')
  }


  //calling hook to setup the track player:
  UseSetUpPlayer({ onLoad }); //calling the 'UseSetUpPlayer' hook from file: UseSetUpPlayer.tsx

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      <NavigationContainer theme={isDarkMode ? DarkMode : LightMode}>
        <DrawerNavigation />
        {/* <StackNavigation /> */}

      </NavigationContainer>
    </GestureHandlerRootView>

  )
}

export default App

const styles = StyleSheet.create({})