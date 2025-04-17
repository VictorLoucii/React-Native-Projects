import { Image, ImageBackground, Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MyButtons from '../components/MyButtons'
import MyTextInputs from '../components/MyTextInputs'
import SocialMedia from '../components/SocialMedia'

const SignUpScreen = () => {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/background.png')}
                style={styles.imageBackground}
            >
                <Image
                    source={require('../assets/food/food.png')}
                    style={styles.foodImage}
                />
                <Text style={styles.title}>Fatmore</Text>

                <View style={styles.inputConatiner}>
                    <MyTextInputs
                        placeholder='Enter Email or username'
                    />
                    <MyTextInputs
                        placeholder='Enter password'
                        secureTextEntry = {true}
                    />
                                        <MyTextInputs
                        placeholder='Confirm password'
                        secureTextEntry = {true}
                    />
                    <MyButtons title='Sign Up' />

                    <Text style = {styles.textOR}>OR</Text>

                    <SocialMedia />

                </View>


            </ImageBackground>
        </View>
    )
}

export default SignUpScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    imageBackground: {
        alignItems: 'center',   //this will center the title text
        height: '100%',
        // justifyContent: 'flex-start',  // vertical alignment (use this if you don't want position: 'absolute' in foodImage), these properties should be in the parent container of the foodImage i.e this
        // alignItems: 'flex-end',         // horizontal alignment (use this if you don't want position: 'absolute' in foodImage), these properties should be in the parent container of the foodImage i.e this
    },
    foodImage: {
        height: 50,
        width: 90,
        right: 20,
        resizeMode: 'stretch',
        top: Platform.OS === 'android' ? 30 : 50,
        position: 'absolute',   //check notes for this project to understand this

    },
    title: {
        fontSize: 40,
        color: 'white',
        marginTop: Platform.OS === 'android' ? 80 : 60,
        fontFamily: 'Audiowide-Regular',


    },
    inputConatiner: {
        height: 450,
        backgroundColor: 'white',
        width: '90%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        paddingHorizontal: 20,

    },
    dontHaveAccount:{
        alignSelf: 'flex-end',
        marginBottom: 10,
        fontFamily: 'NovaFlat-Regular',
        marginRight: 10,     
    },
    textOR:{
        marginTop:20,
        fontSize: 30,
        fontFamily: 'Audiowide-Regular',
    }
})