import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LoginScreen from './src/screens/LoginScreen'
import SignUpScreen from './src/screens/SignUpScreen'
import HomeScreen from './src/screens/HomeScreen'

const App = () => {
  return (
    <View style={styles.container}>
      <HomeScreen />
      

    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  imageBackground:{
    height: '100%',

  },
})