import { ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useThemeStore } from '../themes/ThemeStore';
import { useNavigation, useTheme } from '@react-navigation/native';
import { CustomTheme } from '../themes/CustomTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FONTsize, spacing } from '../constants/dimensions';
import { FONTS } from '../constants/fonts';
import ConnectCard from '../components/ConnectCard';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { supabase } from '../../supabase';
import RNPickerSelect from 'react-native-picker-select';  //libray for multiple country phone code

const countryCodes = [
    { label: 'IN +91', value: '+91' },
    { label: 'US +1', value: '+1' },
    { label: 'UK +44', value: '+44' },
    // You can add more countries here
];


const BecomeMemberScreen = () => {

    const { isDarkMode, toggleTheme } = useThemeStore();
    const { colors } = useTheme() as CustomTheme;
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [countryCode, setCountryCode] = useState('+91'); // Default to India


    const handleSignUp = async () => {  //use an ansync funtion
        // Prevent user from tapping the 'submit' button multiple times when it has been already tapped once
        if (isSubmitting) return;

        // /Before you send anything to Supabase, check that the user has actually filled out the form

        // --- 1. EMPTY FIELD VALIDATION ---
        if (!firstName.trim() || !lastName.trim() || !email.trim() || !phoneNumber.trim()) {
            Alert.alert('Missing Information', 'Please fill out all fields.');
            return;
        }

        // --- 2. ADVANCED FORMAT VALIDATION(regex checking) ---
        // Name Validation: Checks that names only contain letters, hyphens, or spaces.
        const nameRegex = /^[a-zA-Z\s-]*$/;
        if (!nameRegex.test(firstName.trim()) || !nameRegex.test(lastName.trim())) {
            Alert.alert('Invalid Name', 'First and last names can only contain letters.');
            return;
        }

        // Email Validation: A standard check for the 'user@domain.com' format.
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            Alert.alert('Invalid Email', 'Please enter a valid email address.');
            return;
        }

        // Phone Number Validation: Checks that it contains at least 10 digits and only digits.
        const phoneRegex = /^\d{10,}$/;
        if (!phoneRegex.test(phoneNumber.trim())) {
            Alert.alert('Invalid Phone Number', 'Phone number must contain at least 10 digits.');
            return;
        }


        setIsSubmitting(true); //update the state, if the form is filled properly

        try {

            // Combine country code and phone number before sending to supabase
            const fullPhoneNumber = countryCode + phoneNumber.trim();

            const { error } = await supabase
                .from('users') //my specific table name in supabase
                .insert([{
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    phone_number: fullPhoneNumber  // Send the combined number
                }])

            //the supa base error/success will be inside the try block
            if (error) {
                //this will catch supabase errors
                Alert.alert('Supabase Submission Error', error.message);
            }
            else {
                // This block now only runs on success
                Alert.alert('Success!', 'Thank you for signing up. We will be in touch shortly.');
                setFirstName('');
                setLastName('');
                setEmail('');
                setPhoneNumber('');
                navigation.goBack(); // Navigate back to the previous screen after success
            }
        }
        catch (e) {
            // This will catch network errors etc.
            Alert.alert('Error', 'An unexpected error occurred. Please try again.');
            console.error('error:', e);
        }
        finally {
            // This runs regardless of success or failure
            setIsSubmitting(false);
        }

    }


    return (
        <View style={[styles.container, { backgroundColor: colors.bkGroundClr, paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                translucent={true} //this hides the status bar in android 
                backgroundColor='transparent'
            />

            <TouchableOpacity
                style={[styles.backButtonTouchable, { top: insets.top }]}
                onPress={() => navigation.goBack()}
            >
                <Ionicons
                    name={'return-up-back'}
                    size={30}
                    style={[styles.backButtonStyling, { color: colors.icon }]} //  We use the top inset to position it safely below the status bar. The `top` value is now set dynamically in the component
                />
            </TouchableOpacity>

            <View style={styles.headingContainer}>
                <Text style={[styles.headingStyle, { color: colors.textPrimary }]}>
                    Connect
                </Text>
            </View>

            <ScrollView>
                <ImageBackground
                    source={require('../../assets/becomeMember.jpg')}
                    style={styles.cardImageContainer}
                    imageStyle={styles.cardImageStyle}
                >
                    <View style={styles.overlayContainer}>
                        <Text style={styles.titleBold}>
                            BECOME A MEMBER
                        </Text>

                    </View>

                </ImageBackground>

                <View style={styles.textContainer}>
                    <Text style={[styles.text1, { color: colors.textPrimary }]}>
                        If you would like to become a member of Soteria church, we are happy to welcome you.
                    </Text>
                    <Text style={[styles.text2, { color: colors.textPrimary }]}>
                        Please sign up here.
                    </Text>
                </View>

                {/* Divider Line */}
                <View style={styles.dividerLine} />

                <View style={styles.formContainer}>

                    <Text style={[styles.formLabel, { color: colors.textPrimary }]}>
                        First Name
                    </Text>
                    <TextInput
                        placeholder='enter your first name here'
                        placeholderTextColor={colors.textPrimary}
                        value={firstName}
                        onChangeText={(newText) => setFirstName(newText)}
                        style={[styles.formInput,
                        {
                            borderColor: '#BDC1C6',
                            color: colors.textPrimary
                        }
                        ]}
                    />

                    <Text style={[styles.formLabel, { color: colors.textPrimary }]}>
                        Last Name
                    </Text>
                    <TextInput
                        placeholder='enter your last name here'
                        placeholderTextColor={colors.textPrimary}
                        value={lastName}
                        onChangeText={(newText) => setLastName(newText)}
                        style={[styles.formInput,
                        {
                            borderColor: '#BDC1C6',
                            color: colors.textPrimary
                        }
                        ]}
                    />

                    <Text style={[styles.formLabel, { color: colors.textPrimary }]}>
                        Email
                    </Text>
                    <TextInput
                        placeholder='e.g: uknown@gmail.com'
                        placeholderTextColor={colors.textPrimary}
                        value={email}
                        onChangeText={(newText) => setEmail(newText)}
                        autoCapitalize='none'
                        keyboardType='email-address'
                        style={[styles.formInput,
                        {
                            borderColor: '#BDC1C6',
                            color: colors.textPrimary
                        }
                        ]}
                    />

                    <Text style={[styles.formLabel, { color: colors.textPrimary }]}>
                        Phone Number
                    </Text>

                    <View style={styles.phoneContainer}>

                        <View style={styles.pickerContainer}>
                            <RNPickerSelect
                                value={countryCode} // Set the current value
                                onValueChange={(value) => setCountryCode(value)}
                                items={countryCodes}
                                style={pickerSelectStyles(colors)} // Apply our custom styles
                                useNativeAndroidPickerStyle={false} // Use custom styles on Android
                                Icon={() => { // Custom dropdown icon
                                    return <FontAwesome name={'caret-down'} size={15.5} color={colors.icon} />;
                                }}
                            />
                        </View>

                        {/* before implementing picker library */}
                        {/* <View style={styles.phoneCodeAndSymbol}>
                            <Text style={[styles.phoneCodeText, { color: colors.textPrimary }]}>
                                IN +91
                            </Text>
                            <FontAwesome
                                name={'caret-down'}
                                size={15.5}
                                color={colors.icon}
                            />
                        </View> */}

                        <TextInput
                            keyboardType="phone-pad"
                            placeholder='e.g: 9977765234'
                            placeholderTextColor={colors.textPrimary}
                            value={phoneNumber}
                            onChangeText={(newText) => setPhoneNumber(newText)}
                            style={[styles.phoneNoformInput,
                            {
                                borderColor: '#BDC1C6',
                                color: colors.textPrimary
                            }
                            ]}
                        />
                    </View>
                    {/* phoneContainer view ends here */}

                    <TouchableOpacity
                        style={[styles.submitContainer, {
                            borderColor: colors.tabBarIconActive,
                            // Make the button look disabled if state 'isSubmitting' is true/false
                            backgroundColor: isSubmitting ? '#ccc' : 'transparent'
                        }]}
                        onPress={handleSignUp}
                        disabled={isSubmitting} // Disable button when state 'isSubmitting' is true
                    >
                        {/* conditional rendering based on state 'isSubmitting'*/}
                        {/* show activity indicator if the user has tapped the submit button */}
                        {isSubmitting ? (
                            <ActivityIndicator size={30} color={colors.tabBarIconActive} />
                        ) : (
                            // show the 'submit' button if the user hasn't interacted with the button
                            <Text style={[styles.submitText, { color: colors.tabBarIconActive }]}>
                                SUBMIT
                            </Text>

                        )}
                    </TouchableOpacity>



                </View>
                {/* formContainer view ends here */}
            </ScrollView>





        </View>
    )
}

export default BecomeMemberScreen

// Adding new style object for the picker, check the explanation of this function with style object at the bottom of this document 
const pickerSelectStyles = (colors) => StyleSheet.create({  //This line is not creating a simple, static style object. It is creating a dynamic stylesheet function
    inputIOS: {
        fontSize: FONTsize.medium,
        fontFamily: FONTS.interMedium,
        paddingVertical: 12,
        paddingHorizontal: 10,
        color: colors.textPrimary,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: FONTsize.medium,
        fontFamily: FONTS.interMedium,
        paddingHorizontal: 10,
        paddingVertical: 8,
        color: colors.textPrimary,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    iconContainer: { //styling the container that holds the dropdown icon

        top: 15,
        right: 15,
    },
});



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backButtonTouchable: {
        zIndex: 1,  // Ensures the back button is on top of other content
        // top:47,  // The `top` value is now set dynamically in the component
        position: 'absolute',
        left: 24,
    },
    backButtonStyling: {
        // color: '#FFFFFF',
    },
    headingContainer: {

    },
    headingStyle: {
        fontSize: FONTsize.medium,
        fontFamily: FONTS.interSemiBold,
        textAlign: 'center',
        // color: '#FFFFFF',
        paddingVertical: spacing.small,
        // marginTop:10,
    },
    cardImageContainer: {
        width: '100%',
        height: 211,
    },
    cardImageStyle: {
        //will contain like border radius for the ImageBackground image etc
    },
    overlayContainer: {
        // This creates a semi-transparent dark layer over the image
        // and acts as the container for our text and icons.
        flex: 1, // Takes up the full space of the ImageBackground
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Black with 30% opacity
        // padding: spacing.small, // Inner spacing for the content
        // justifyContent: 'center',
        // alignItems: 'center',
        // borderRadius:10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleBold: {
        fontSize: FONTsize.superXtraLg,
        fontFamily: FONTS.interBlack,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    textContainer: {
        paddingTop: spacing.large,
        paddingHorizontal: spacing.medium,
        gap: spacing.medium,
    },
    text1: {
        fontSize: FONTsize.medium,
        fontFamily: FONTS.interMedium,

    },
    text2: {
        fontSize: FONTsize.medium,
        fontFamily: FONTS.interMedium,

    },
    dividerLine: {
        height: 1,
        backgroundColor: '#BDC1C6',
        marginTop: spacing.large,
    },
    formContainer: {
        paddingTop: spacing.large,
        paddingHorizontal: spacing.medium,
        gap: spacing.small,
        paddingBottom: 100,

    },
    formLabel: {
        fontSize: FONTsize.medium,
        fontFamily: FONTS.interMedium,

    },
    formInput: {
        width: '100%',
        height: 47,
        borderColor: '#BDC1C6',
        borderWidth: 1,
        borderRadius: 8,
        textAlign: 'left',
        paddingHorizontal: spacing.medium

    },
    phoneContainer: {
        flexDirection: 'row',
        gap: spacing.small,

    },
    phoneCodeAndSymbol: {
        flexDirection: 'row',
        gap: spacing.medium,
        borderColor: '#BDC1C6',
        borderWidth: 1,
        borderRadius: 8,
        width: '30%',
        paddingHorizontal: spacing.small,
        alignItems: 'center',
        height: 47,
        justifyContent: 'center'

    },
    phoneCodeText: {
        fontSize: FONTsize.medium,
        fontFamily: FONTS.interMedium,

    },
    phoneNoformInput: {
        flex: 1,
        // width: '75%',
        height: 47,
        borderColor: '#BDC1C6',
        borderWidth: 1,
        borderRadius: 8,
        textAlign: 'left',
        paddingHorizontal: spacing.medium

    },
    submitContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: spacing.large,
        borderWidth: 1,
        height: 47,
        borderRadius: 8,
        paddingHorizontal: spacing.xtraLarge,

    },
    submitText: {
        fontSize: FONTsize.medium,
        fontFamily: FONTS.interMedium,

    },
    // style for the picker's container 
    pickerContainer: {
        width: '35%', // Give it some width
        borderColor: '#BDC1C6',
        borderWidth: 1,
        borderRadius: 8,
        height: 47,
        justifyContent: 'center', // Center the picker content vertically
    },

})


// //explanation:

// Explanation of: const pickerSelectStyles = (colors) => StyleSheet.create({ ... });

// This line is not creating a simple, static style object. It is creating a dynamic stylesheet function.

// Here's what that means, piece by piece:

// const pickerSelectStyles = ... : You are declaring a constant variable named pickerSelectStyles.

// = (colors) => ...: This makes it an arrow function. The key part is (colors). This means the function is designed to accept an argument, which you've named colors.

// StyleSheet.create({ ... });: Inside the function, it uses the standard and highly optimized StyleSheet.create method to build a stylesheet object.

// Why is it a function?

// The purpose is to create styles that can change based on the current app theme (light or dark mode).

// In your code, you get the colors object from your useTheme() hook. This colors object contains different color values depending on whether the user is in light or dark mode (e.g., colors.textPrimary might be black in light mode and white in dark mode).

// By creating pickerSelectStyles as a function that accepts colors, you can pass the current theme's colors into it. The function then generates a new, appropriate stylesheet on the fly. You use it in your code like this:

// Generated jsx
// style={pickerSelectStyles(colors)} // You are CALLING the function here


// This is a much cleaner and more reusable pattern than writing complex conditional (ternary) operators inside your style definitions.

// Explanation of inputIOS, inputAndroid, and iconContainer

// These are special style keys defined by the react-native-picker-select library. When you pass a style object to this component, it doesn't just apply it to the main container. Instead, it looks for these specific keys to style different internal parts of the picker.

// Think of it like the library giving you specific "slots" to fill with your own styles.

// inputIOS

// What is it? A style key that applies styles only when your app is running on an iOS device.

// What does it style? It styles the main tappable area that looks like a TextInput field on iOS. This includes the text (the selected country code), padding, and font.

// Why is it needed? iOS and Android have different native design patterns. This key allows you to fine-tune the appearance to look and feel native on iOS. The paddingRight: 30 is a clever detail: it ensures the text never runs underneath the dropdown icon, which is positioned on the right.

// inputAndroid

// What is it? A style key that applies styles only when your app is running on an Android device.

// What does it style? It styles the same tappable area, but for Android. This is especially important in your code because you set useNativeAndroidPickerStyle={false}. This prop tells the library "Don't use the default Android spinner look; instead, render a custom-styled text input that I can control," and inputAndroid is how you control it.

// Why is it needed? It allows you to create a consistent look between iOS and Android or to follow Android's specific "Material Design" guidelines.

// iconContainer

// What is it? A style key that styles the container that holds the dropdown icon.

// What does it style? It controls the position of the icon (FontAwesome caret-down in your case). It does not style the icon's color or size (you did that in the Icon prop itself).

// Why is it needed? It allows you to precisely place the dropdown arrow within the component's bounds. The styles top: 15 and right: 15 work together to position the icon neatly in the vertical middle and on the right-hand side of the input box, which is standard UI practice.