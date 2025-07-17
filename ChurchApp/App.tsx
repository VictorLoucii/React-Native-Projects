import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import HomeScreen from './src/screens/HomeScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigator from './src/navigation/TabNavigator'
import { useThemeStore } from './src/themes/ThemeStore'
import { DarkMode } from './src/themes/DarkMode'
import { LightMode } from './src/themes/LightMode'

// --- IMPORT THE PROVIDER component ---
import { TabBarVisibilityProvider } from './src/contexts/TabBarVisibilityContext'

const App = () => {
  

  const scheme = useColorScheme();
  console.log('schme:----', scheme);

  const { isDarkMode, toggleTheme } = useThemeStore();
  console.log('isDarkMode:------', isDarkMode);


  return (
    <SafeAreaProvider>
    {/* ---  WRAP THE NAVIGATOR WITH THE PROVIDER for toggling tab bar visibility,  placed above all components that need to access its state--- */}
    <TabBarVisibilityProvider>
      <NavigationContainer theme={isDarkMode ? DarkMode : LightMode}>
        <TabNavigator />
      </NavigationContainer>
    </TabBarVisibilityProvider>
  </SafeAreaProvider>

  )
}

export default App

const styles = StyleSheet.create({

})