import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './src/screens/HomeScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerShown:false,
        }}
      >
        <Stack.Screen name = 'Home' component={HomeScreen} />
        <Stack.Screen name = 'Product_Detail' component={ProductDetailScreen} />

      </Stack.Navigator>

    </NavigationContainer>

  )
}

export default App

const styles = StyleSheet.create({})