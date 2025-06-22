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



const App = () => {

  const scheme = useColorScheme();
  console.log('scheme:==', scheme);

  const { isDarkMode, toggleTheme } = useThemeStore();
  console.log('isDarkMode:------', isDarkMode);

  const { loadLikedSongs } = useLikedSongs();

  useEffect(() => {
    loadLikedSongs();
    scheme === 'light' ? toggleTheme(false) : toggleTheme(true);
  }, [scheme])

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