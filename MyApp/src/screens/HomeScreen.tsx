import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
// Removed unused import: import SignUpScreen from './SignUpScreen'
// Removed unused import: import { useNavigation } from '@react-navigation/native'

const HomeScreen = ({ navigation }) => {

    const goToSignUpScreen = () => {
        navigation.navigate('SignUp'); // Use the screen name 'SignUp'
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/background.png')}
                style={styles.imageBkGround} // We'll center the box using this
            >
                {/* This View will be the visible box */}
                <View style={styles.contentBox}>
                    <View style = {styles.headingContainer}>
                        <Text style={styles.headingText}>Welcome to</Text>
                    </View>
                    <View style={styles.dontHaveIdContainer}>
                        <TouchableOpacity onPress={goToSignUpScreen}>
                            <Text style={styles.dontHaveId} >Don't have an id? Click here then</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ImageBackground >
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageBkGround: {
        flex: 1, // Use flex: 1 instead of height: '100%' for better layout
        width: '100%',
        // Center the contentBox vertically and horizontally
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentBox: {
        width: '90%', // Make the box slightly narrower than the screen
        height: 370,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 15, // Make it rounded
        paddingVertical: 40, // Add vertical padding inside the box
        paddingHorizontal: 20, // Add horizontal padding inside the box
        alignItems: 'center', // Center the text items horizontally within the box
        paddingBottom: 10,
    },
    headingContainer:{
        paddingTop: -30,
        marginBottom: 120,

    },
    headingText: {
        fontSize: 40,
        color: 'white',
        fontFamily: 'Audiowide-Regular',
        textAlign: 'center', // Center the text itself
        // marginBottom: 150, // Add space below the heading
        // paddingBottom: 10,
    },
    dontHaveIdContainer: {
        // paddingBottom: 40,
        // top: -50,
    },
    dontHaveId: {
        fontSize: 24, // Maybe make this slightly smaller
        color: 'white',
        fontFamily: 'Audiowide-Regular',
        textAlign: 'center', // Center the text itself
    },
})

