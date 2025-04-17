import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SocialMedia = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/SocialMediaIcons/facebook.png')}
                style={styles.image}
            />
            <Image
                source={require('../assets/SocialMediaIcons/twitter.png')}
                style={styles.twitter}
            />
            <Image
                source={require('../assets/SocialMediaIcons/google.png')}
                style={styles.image}
            />
        </View>
    )
}

export default SocialMedia

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%', //this will give container the full width of it's parent view that is inputConatiner defined in LoginScreen.tsx

    },
    image: {
        height: 60,
        width: 60,
    },
    twitter:{
        height:80,
        width: 100,
    }
})