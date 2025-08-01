import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { FONTS } from '../constants/fonts'
import { FONTsize, spacing } from '../constants/dimensions'
import { LoginSignUpFormProps } from '../screens/AuthScreen'
import { supabase } from '../../supabase'
import Ionicons from 'react-native-vector-icons/Ionicons'




const LoginForm = ({ onSwitchTab }: LoginSignUpFormProps) => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  // ADD STATE TO PREVENT MULTIPLE SUBMISSIONS 
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleLogin = async () => {
    // Prevent multiple taps
    if (isSubmitting) return;

    // Validation check
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    setIsSubmitting(true); // Disable button

    // wrapping the call in try/finally for robustness
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        Alert.alert("Login Error", error.message);
      }
      // No 'else' block is needed. onAuthStateChange handles success.
    } catch (e) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false); // Re enable button in all cases
    }
  };




  return (

    <View style={styles.container}>

      <View style={styles.formContainer}>

        <Text style={styles.regularText}>Email</Text>
        <TextInput
          keyboardType="email-address"
          autoCapitalize="none"
          // placeholder="Email"
          // placeholderTextColor={'#5A2F23'}
          value={email}
          onChangeText={(newText) => setEmail(newText)}
          style={[styles.formInput,
          {
            borderColor: '#5A2F23',
            color: '#5A2F23',
          }
          ]}
          cursorColor={'#5A2F23'} // changes the blinking cursor color

        />

        <Text style={styles.regularText}>Password</Text>

        {/* --- PASSWORD INPUT (WITH VISIBILITY TOGGLE) --- */}
        <View style={styles.passwordContainer}>
          <TextInput
            value={password}
            onChangeText={(newText) => setPassword(newText)}
            style={styles.passwordInput} 
            cursorColor={'#5A2F23'}
            autoCapitalize="none"
            // Connect secureTextEntry to state
            secureTextEntry={!isPasswordVisible}
          />
          {/* eye ICON BUTTON */}
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Ionicons
              name={isPasswordVisible ? 'eye-off' : 'eye'} // Toggles icon based on state
              size={24}
              color="#5A2F23"
            />
          </TouchableOpacity>
        </View>


      </View>

      <View style={styles.buttonContainer}>

        <TouchableOpacity
          style={[styles.buttonTouchable, isSubmitting && styles.disabledButton]}
          onPress={handleLogin}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator size="large" color="#FFFFFF" />
          ) : (
            <Text style={styles.loginText}>Login</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={onSwitchTab}>
          <Text style={styles.signUpText}>Or sign up here</Text>
        </TouchableOpacity>

      </View>


    </View>
  )
}

export default LoginForm

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    paddingHorizontal: spacing.xtraLarge,
    marginTop: spacing.medium,
    gap: spacing.small,

  },
  regularText: {
    fontFamily: FONTS.poppinsRegular,
    fontSize: FONTsize.medium,
  },
  formInput: {
    width: '100%',
    // height: 47,   //remove fixed height as it cause layout issues in older devices
    paddingVertical: 12, 
    // borderColor: '#5A2F23',
    borderWidth: 1,
    borderRadius: spacing.xtraLarge,
    textAlign: 'left',
    paddingHorizontal: spacing.medium,
    fontFamily: FONTS.poppinsRegular, // Ensure consistent font
    fontSize: FONTsize.medium,      // Ensure consistent font size
  },
  buttonContainer: {
    // This container only job is to center the button horizontally
    alignItems: 'center',
    marginTop: spacing.xtraLarge, // Add some space from the form above
    gap: spacing.small,

  },
  buttonTouchable: {
    // All the visual styles now go on the TouchableOpacity itself
    backgroundColor: '#5A2F23',
    height: 55,
    width: '60%',
    borderRadius: spacing.xtraLarge,
    // These center the text inside the button
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: 'white',
    fontSize: 35,
    fontFamily: FONTS.poppinsBold,

  },
  signUpText: {
    fontFamily: FONTS.poppinsRegular,

  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    // height: 47,   //remove fixed height as it cause layout issues in older devices
    borderColor: '#5A2F23',
    borderWidth: 1,
    borderRadius: spacing.xtraLarge,
    paddingHorizontal: spacing.medium,
  },
  passwordInput: { // The text input inside the wrapper
    flex: 1,
    color: '#5A2F23',
    fontFamily: FONTS.poppinsRegular,
    fontSize: FONTsize.medium,
    paddingRight: spacing.small, // Add a little space before the icon
    // paddingTop:spacing.medium,
    paddingVertical: 12, // need this for older devices

  },
  disabledButton: {
    backgroundColor: '#8A6F69', // A muted version of your primary color
  }
})