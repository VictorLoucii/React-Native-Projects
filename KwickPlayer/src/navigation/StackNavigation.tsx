import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from '../screens/HomeScreen';
import LikedScreen from '../screens/LikedScreen';
import PlayerScreen from '../screens/PlayerScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllSongsScreen from '../screens/AllSongsScreen';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
        <Stack.Navigator
          initialRouteName='AllSongsScreen'
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name='LikedScreen' component={LikedScreen} />
          <Stack.Screen name='PlayerScreen' component={PlayerScreen} />
          <Stack.Screen name='AllSongsScreen' component={AllSongsScreen} />

        </Stack.Navigator>
  )
}

export default StackNavigation

const styles = StyleSheet.create({})