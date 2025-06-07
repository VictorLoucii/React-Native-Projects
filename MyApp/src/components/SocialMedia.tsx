import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SocialMedia = () => {
  return (
    <View style = {styles.container}>
      <Image
        source={require('../assets/SocialMediaIcons/facebook.png')}
        style = {styles.image}
      />
      <Image
        source={require('../assets/SocialMediaIcons/google.png')}
        style = {styles.image}
      />
      <Image
        source={require('../assets/SocialMediaIcons/twitter.png')}
        style = {[styles.image, {height: 55, }]}
      />
    </View>
  )
}

export default SocialMedia

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%'
  },
  image:{
    height: 40,
    width: 40,
    marginTop: 50,
  },
})