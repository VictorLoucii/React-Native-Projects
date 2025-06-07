//App.tsx:
import { ScrollView, StyleSheet, Text, View,} from 'react-native' 
import LoginScreen from './src/screens/LoginScreen'
import SignUpScreen from './src/screens/SignUpScreen'
import { NavigationContainer } from '@react-navigation/native'
import MyStack from './src/navigation/MyStack'
import { useNotification } from './src/notification/UseNotification'




const App = () => {

  useNotification();


  return (
    <NavigationContainer>
      <View style={styles.container}>
        <MyStack />
      </View>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})