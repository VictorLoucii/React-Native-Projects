//MyStack.tsx:
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator style = {styles.container}>
      <Stack.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='login'
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='SignUp'
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>

  )
}

export default MyStack

const styles = StyleSheet.create({})