//LoginScreen.tsx
import { Alert, Image, ImageBackground, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import MyButtons from '../components/MyButtons'
import MyTextInput from '../components/MyTextInput'
import SocialMedia from '../components/SocialMedia'
import auth from '@react-native-firebase/auth'
import HomeScreen from './HomeScreen'

const LoginScreen = ({navigation}) => {

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const loginWithEmailAndPass = () => {
        if(!email || !password){
            Alert.alert('Please fill all the input fields');
            return;
        }
        auth().signInWithEmailAndPassword(email,password)
        .then((response) => {
            console.log('response:---', response);
            Alert.alert('Success: Logged in');
            navigation.navigate(HomeScreen);
        })
        .catch((error) => {
            console.log('error:---',error);
            Alert.alert('Error:--',error.message);
        })
    }


    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/background.png')}
                style={styles.imageBkGround}
            >
                <Image
                    source={require('../assets/food/food.png')}
                    style={styles.foodImage}
                />

                <Text style={styles.title}>Fatmore</Text>

                <View style={styles.inputContainer}>
                    <MyTextInput 
                        placeholder='Enter Email or User name' 
                        value={email}
                        onChangeText={(text) => {
                            console.log('email:---',text)
                            setEmail(text)
                        }}
                    />
                    <MyTextInput
                        placeholder='Enter password'
                        secureTextEntry
                        value={password}
                        onChangeText={(text) => {
                            console.log('Password:---', text)
                            setPassword(text)
                        }}
                    />
                    <Text style={styles.textDontHaveAccount}>Don't have an account yet?</Text>
                    <MyButtons title={'login'} onPress={loginWithEmailAndPass}/>

                    <Text style = {styles.textOr}>OR</Text>

                    <SocialMedia />
                </View>

            </ImageBackground>

        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBkGround: {
        height: '100%',
        paddingHorizontal: 20,
    },
    foodImage: {
        height: 50,
        width: 90,
        resizeMode: 'stretch',
        position: 'absolute',
        right: 20,
        top: Platform.OS === 'android' ? 50 : 50,
    },
    title: {
        fontSize: 40,
        color: 'white',
        marginTop: Platform.OS === 'android' ? 100 : 110,
        marginLeft: 90,
        fontFamily: 'Audiowide-Regular',
    },
    inputContainer: {
        height: 550,
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 30,
        paddingHorizontal: 20,
    },
    textDontHaveAccount: {
        alignSelf: 'flex-end',
        marginRight: 10,
        color: 'black',
        marginBottom: 10,
        fontFamily: 'Langar-Regular',
    },
    textOr:{
        fontSize: 20,
        color: 'gray',
        marginTop: 40,
        fontFamily: 'Audiowide-Regular',
    },
})