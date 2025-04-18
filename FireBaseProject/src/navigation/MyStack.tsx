import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name = 'Login' component={LoginScreen}/>
        <Stack.Screen name = 'SignUp' component={SignUpScreen}/>
        <Stack.Screen name = 'HomeScreen' component={HomeScreen}/>

        
    </Stack.Navigator>

  )
}

export default MyStack

const styles = StyleSheet.create({})