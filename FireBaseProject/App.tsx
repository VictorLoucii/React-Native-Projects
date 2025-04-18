import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LoginScreen from './src/screens/LoginScreen'
import SignUpScreen from './src/screens/SignUpScreen'
import HomeScreen from './src/screens/HomeScreen'
import { NavigationContainer } from '@react-navigation/native'
import MyStack from './src/navigation/MyStack'
import { useNotification } from './src/notification/Notification'


const App = () => {

  useNotification();

  return (
    <NavigationContainer>
      <MyStack />

    </NavigationContainer>

  )
}

export default App

const styles = StyleSheet.create({


})