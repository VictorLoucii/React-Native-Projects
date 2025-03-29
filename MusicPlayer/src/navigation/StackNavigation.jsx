import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screen/HomeScreen';
import LikeScreen from '../screen/LikeScreen';
import PlayerScreen from '../screen/PlayerScreen';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
        <Stack.Navigator 
        screenOptions={{ headerShown: false }}
        // initialRouteName='Player_Screen'
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Like_Screen" component={LikeScreen} />
          <Stack.Screen name="Player_Screen" component={PlayerScreen} />

        </Stack.Navigator>
  )
}

export default StackNavigation

const styles = StyleSheet.create({})