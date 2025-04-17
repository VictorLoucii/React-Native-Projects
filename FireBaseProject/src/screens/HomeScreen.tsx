import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/background.png')}
                style={styles.imageBkground}
            >
                <View style={styles.borderContainer}>
                    <View style={styles.welcomeView}>
                        <Text style={styles.welcomeText}>Welcome to</Text>
                    </View>
                    <View style={styles.thisIstheHomePageView}>
                        <Text style={styles.thisIstheHomeText}>Products</Text>
                    </View>
                    <View style={styles.goToSignUpView}>
                        <Text style={styles.goToSignUpText}>click here to go to  the SignUp Screen</Text>
                    </View>



                </View>



            </ImageBackground>




        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,


    },
    imageBkground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    borderContainer:{
        height: 400,
        width: 300,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
        alignItems: 'center',
    },
    welcomeView:{
        marginTop: 50,
    },
    welcomeText:{
        fontSize: 30,
        fontFamily: 'Audiowide-Regular',
        color: 'white',
    },
    thisIstheHomePageView:{
        marginTop: 150,
        paddingHorizontal: 20,

    },
    thisIstheHomeText:{
        fontSize: 30,
        fontFamily: 'Audiowide-Regular',
        color: 'white',
    },
    goToSignUpView:{
        marginTop: 40,
        width: '90%',
        paddingHorizontal: 30,
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: 'white',
        borderRadius: 5,

   },
    goToSignUpText:{
        fontSize: 20,
        fontFamily: 'Langar-Regular',
        color: 'white',
    }

})