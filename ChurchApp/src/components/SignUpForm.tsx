import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { FONTS } from '../constants/fonts'
import { FONTsize, spacing } from '../constants/dimensions'
import { LoginSignUpFormProps } from '../screens/AuthScreen'
import { supabase } from '../../supabase'
import Ionicons from 'react-native-vector-icons/Ionicons'





const SignUpForm = ({ onSwitchTab }: LoginSignUpFormProps) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  // ADD STATE TO PREVENT MULTIPLE SUBMISSIONS ---
  const [isSubmitting, setIsSubmitting] = useState(false);



  const handleSignUp = async () => {
    // Prevent multiple taps
    if (isSubmitting) return;

    // --- Validation Checks ---
    if (!email.trim() || !password.trim()) {
      Alert.alert("Missing Information", "Please fill out both email and password.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    // simple password length check
    if (password.length < 6) {
      Alert.alert('Password Too Short', 'Password should be at least 6 characters.');
      return;
    }


    setIsSubmitting(true); // Disable button

    // WRAP SUPABASE CALL IN TRY/FINALLY for robustness 
    try {
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        Alert.alert("Sign Up Error", error.message);
      } else {
        Alert.alert("Success!", "Please check your email to confirm your account.");
        // Clear fields on success
        setEmail('');
        setPassword('');
      }
    } catch (e) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false); // re enable button
    }
  };



  return (

    <View style={styles.container}>

      <View style={styles.formContainer}>

        <Text style={styles.regularText}>Enter email id</Text>
        <TextInput
          keyboardType="email-address"
          autoCapitalize="none"
          // placeholder="Email"
          // placeholderTextColor={'#5A2F23'}
          cursorColor={'#5A2F23'} // changes the blinking cursor color
          value={email}
          onChangeText={(newText) => setEmail(newText)}
          style={[styles.formInput,
          {
            borderColor: '#5A2F23',
            color: '#5A2F23',
          }
          ]}
        />

        <Text style={styles.regularText}>Create password</Text>

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
          {/* eye ICON BUTTON to reveal password or not */}
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
          onPress={handleSignUp}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator size="large" color="#FFFFFF" />
          ) : (
            <Text style={styles.loginText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={onSwitchTab}>
          <Text style={styles.signUpText}>Or Login here</Text>
        </TouchableOpacity>

      </View>


    </View>
  )
}

export default SignUpForm

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
    // height: 47,
    paddingVertical: 12, // <--- ADD THIS LINE
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
    paddingVertical: 12,  //adding this for older devices layout

  },
  disabledButton: {
    backgroundColor: '#8A6F69', // A muted version of your primary color
  },

})
