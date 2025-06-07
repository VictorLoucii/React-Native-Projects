//SignUpScreen.tsx:
import { Alert, Image, ImageBackground, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import MyButtons from '../components/MyButtons'
import MyTextInput from '../components/MyTextInput'
import SocialMedia from '../components/SocialMedia'
import auth from '@react-native-firebase/auth'

const SignUpScreen = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    console.log('email:----',email);
    // Alert.alert('email:',email)
    console.log('passowrd:---',password);

    const signUpTestFn = () => {
        //case: if the users doesn't fill all the input fields:
        if(!email || !password || !confirmPassword){
            Alert.alert('Please fill all the input fields');
            return;
        }
        //case: if the password != confirm password:
        if(password != confirmPassword){
            Alert.alert('Passwords do not match, please try again');
            return;
        }
        //use the states to dynamically pass email and password:
        auth().createUserWithEmailAndPassword(email,password).then(() => {
            Alert.alert('User created, please login');
            navigation.navigate('login');
        })
        .catch((error) => {
            console.log('error:----', error.message);
            Alert.alert('Error: ',error.message);
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
                        onChangeText = {(text) => {
                            console.log('text:--',text)
                            setEmail(text)
                            }
                        }
                    />
                    <MyTextInput
                        placeholder='Enter password'
                        secureTextEntry
                        value = {password}
                        onChangeText={(text) => {
                            console.log('text:---',text)
                            setPassword(text)
                        }}
                    />
                    <MyTextInput
                        placeholder='Confirm password'
                        secureTextEntry
                        value = {confirmPassword}
                        onChangeText = {(text) => {
                            console.log('text:---',text)
                            setConfirmPassword(text)
                        }}
                    />

                    <MyButtons onPress={signUpTestFn} title={'Sign Up'} />

                    <Text style={styles.textOr}>OR</Text>

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
    textOr: {
        fontSize: 20,
        color: 'gray',
        marginTop: 40,
        fontFamily: 'Audiowide-Regular',
    },
})