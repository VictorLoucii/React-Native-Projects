import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screen/HomeScreen';
import LikeScreen from './src/screen/LikeScreen';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PlayerScreen from './src/screen/PlayerScreen';
import StackNavigation from './src/navigation/StackNavigation';
import DrawerNavigation from './src/navigation/DrawerNavigation';

import TrackPlayer from 'react-native-track-player';
import { useSetupPlayer } from './src/hooks/UseSetupTrackPlayer';
import useLikedSongs from './src/store/likeStore';
import { load } from 'react-native-track-player/lib/src/trackPlayer';
import { darkTheme } from './src/theme/darkTheme';
import { lightTheme } from './src/theme/lightTheme';
import { useThemeStore } from './src/store/themeStore';

const Stack = createNativeStackNavigator();

const App = () => {
  const scheme = useColorScheme();
  console.log('scheme:---',scheme);

  const { isDarkMode, toggleTheme } = useThemeStore();
  // const { isDarkMode, toggleTheme } = useThemeStore((state) => state);   //you can use this or the above statement, both work the same way
  console.log('isDarkMode:------', isDarkMode);

  const { loadLikedSongs } = useLikedSongs();

  useEffect(() => {
    scheme === 'light' ? toggleTheme(false) : toggleTheme(true);
  }, [scheme])
  
  //track player setup:
  const onLoad = () => {
    loadLikedSongs();
    console.log('Track player setup succesfully');
  };
  useSetupPlayer({ onLoad });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer theme={isDarkMode ? darkTheme : lightTheme}>
        <DrawerNavigation />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});
