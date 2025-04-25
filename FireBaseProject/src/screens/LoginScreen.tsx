import { Alert, Button, Image, ImageBackground, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MyButtons from '../components/MyButtons'
import MyTextInputs from '../components/MyTextInputs'
import SocialMedia from '../components/SocialMedia'
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin';



const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        console.log("GoogleSignin configured");
        GoogleSignin.configure({
            webClientId: '546841612840-n388461k40438kak73ts3ij3nvlf5i3u.apps.googleusercontent.com',
        });
    }, [])

    async function onGoogleButtonPress() {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

        // Optionally sign out first for testing account picker every time
        await GoogleSignin.signOut();

        //// Prompt user to select a Google account
        const signInResult = await GoogleSignin.signIn();
        console.log('SignInResult/Token:-----', signInResult)

        // Try the new style of google-sign in result, from v13+ of that module
        let idToken = signInResult.data?.idToken;
        console.log('idToken:----', idToken);

        if (!idToken) {
            // if you are using older versions of google-signin, try old style result
            idToken = signInResult.idToken;
        }
        if (!idToken) {
            throw new Error('No ID token found');
        }

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(signInResult.data.idToken);

        Alert.alert('Sucessfully logged in');
        
        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);

    }

    const LoginWithEmailAndPass = () => {
        //edge case 1:
        if (!email || !password) {
            Alert.alert("All input fields need to be filled")
            return;
        }
        auth().signInWithEmailAndPassword(email, password)
            .then((response) => {
                console.log('Response:------', response);
                Alert.alert('User Logged in with email:=' + email, 'and password:-' + password);
                navigation.navigate('HomeScreen');
            })
            .catch((error) => {
                console.log('Error:----', error.message);
                Alert.alert("Error:---", error.message);
            })
    }

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
                        value={email}
                        onChangeText={(text) => {
                            console.log('Email:----', text);
                            setEmail(text);
                        }}
                    />
                    <MyTextInputs
                        placeholder='Enter password'
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(text) => {
                            console.log("Password:------", text);
                            setPassword(text);
                        }}
                    />
                    <Text style={styles.dontHaveAccount}>Don't have an account yet?</Text>
                    <MyButtons
                        title='Login'
                        onpress={LoginWithEmailAndPass}
                    />
                    <Button
                        title={'Login with Google'}
                        onPress={onGoogleButtonPress}
                    />

                    <Text style={styles.textOR}>OR</Text>

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
    dontHaveAccount: {
        alignSelf: 'flex-end',
        marginBottom: 10,
        fontFamily: 'NovaFlat-Regular',
        marginRight: 10,
    },
    textOR: {
        marginTop: 20,
        fontSize: 30,
        fontFamily: 'Audiowide-Regular',
    }
})