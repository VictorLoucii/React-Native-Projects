import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import HomeScreen from './src/screens/HomeScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigator from './src/navigation/TabNavigator'
import { useThemeStore } from './src/themes/ThemeStore'
import { DarkMode } from './src/themes/DarkMode'
import { LightMode } from './src/themes/LightMode'

const App = () => {
  

  const scheme = useColorScheme();
  console.log('schme:----', scheme);

  const { isDarkMode, toggleTheme } = useThemeStore();
  console.log('isDarkMode:------', isDarkMode);


  return (
    <SafeAreaProvider>
      <NavigationContainer theme={isDarkMode ? DarkMode : LightMode}>
        <TabNavigator />
      </NavigationContainer>

    </SafeAreaProvider>


  )
}

export default App

const styles = StyleSheet.create({

})