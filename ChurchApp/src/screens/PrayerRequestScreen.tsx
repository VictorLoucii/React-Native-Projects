import { ActivityIndicator, Alert, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useThemeStore } from '../themes/ThemeStore';
import { useNavigation, useTheme } from '@react-navigation/native';
import { CustomTheme } from '../themes/CustomTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FONTsize, spacing } from '../constants/dimensions';
import { FONTS } from '../constants/fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { supabase } from '../../supabase'; // Adjust the path to your supabase file


const PrayerRequestScreen = () => {

    const { isDarkMode, toggleTheme } = useThemeStore();
    const { colors } = useTheme() as CustomTheme;
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    const [prayerRequest, setprayerRequest] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePrayerRequests = async () => {
        //Check if the prayer request text is empty. If it is, show an alert and stop.
        if (!prayerRequest) {
            Alert.alert('Empty Request, please write your prayer request before clicking submit');
            return;
        }
        // Set the loading state to true for activity indicator
        setIsSubmitting(true);

        try {
            //  Get the current user's data from Supabase auth.
            const { data: { user } } = await supabase.auth.getUser();
            //    The user's ID will be inside the object that is returned.

            if (!user) {
                // This will be caught by the catch block below
                throw new Error("You must be logged in to submit a prayer request.");
            }

            // Use the supabase client to insert a new row into your 'prayer_requests' table
            const { error: insertError } = await supabase
                .from('prayer_requests')
                .insert({
                    // The object you insert should have two properties:
                    // request_text: (the value from your `prayerRequest` state)
                    request_text: prayerRequest,
                    // user_id: (the ID you got in step 3)
                    user_id: user.id
                });

            //  Check if the insertion resulted in an error. If so, show an error alert.
            if (insertError) {
                // This will be caught by the catch block below
                throw insertError;
            }

            //  If the insertion was successful:
            //     Show a success alert to the user.
            Alert.alert("Success", "Your prayer request has been submitted successfully.");
            //    Clear the input field by setting the state back to empty.
            setprayerRequest('');
            //    Navigate the user back to the previous screen.
            navigation.goBack();



        }
        catch (error) {
            // If any other unexpected error happens, show a generic error alert.
            console.error("Error submitting prayer request:", error);
            Alert.alert("Submission Failed", error.message || "An unexpected error occurred. Please try again.")

        }

        finally {
            // No matter what happens (success or error), set the loading state back to false
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
                    source={require('../../assets/prayerRequest2.png')}
                    style={styles.cardImageContainer}
                    imageStyle={styles.cardImageStyle}
                >
                    <View style={styles.overlayContainer}>
                        <Text style={styles.titleSahtiyaStyle}>
                            PRAYER
                        </Text>
                        <Text style={styles.titleSahtiyaStyle}>
                            REQUESTS
                        </Text>

                    </View>

                </ImageBackground>

                <View style={styles.textContainer}>
                    <Text style={[styles.text3, { color: colors.textPrimary }]}>
                        Hearts United in Prayer : Share Your Requests Here
                    </Text>
                </View>

                {/* Divider Line */}
                <View style={styles.dividerLine} />

                <View style={styles.formContainer}>

                    <View style={styles.addressContainer}>
                        <Text style={[styles.formLabel, { color: colors.textPrimary }]}>
                            Description of Your Prayer Requests
                        </Text>
                        <TextInput
                            value={prayerRequest}
                            onChangeText={(newText) => setprayerRequest(newText)}
                            multiline={true}
                            placeholder='write your prayer request here'
                            placeholderTextColor={colors.textPrimary}
                            style={[styles.addressTextInput,
                            {
                                borderColor: '#BDC1C6',
                                color: colors.textPrimary

                            }
                            ]}
                        />
                    </View>

                    <TouchableOpacity
                        style={[styles.submitContainer, {
                            borderColor: colors.tabBarIconActive,
                            // Make the button look disabled if state 'isSubmitting' is true/false
                            backgroundColor: isSubmitting ? '#ccc' : 'transparent'
                        }]}
                        onPress={() => handlePrayerRequests()}  //or you can do this: 
                        // onPress={handlePrayerRequests}
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

export default PrayerRequestScreen

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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.large,
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
        // marginBottom:spacing.medium,

    },
    formInput: {
        width: '100%',
        height: 47,
        borderColor: '#BDC1C6',
        borderWidth: 1,
        borderRadius: 8,
        textAlign: 'center',
        paddingHorizontal: spacing.small

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
        width: '25%',
        // paddingHorizontal: spacing.small,
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
        textAlign: 'center',
        paddingHorizontal: spacing.small

    },
    addressContainer: {
        paddingTop: spacing.small,
        gap: spacing.small,
        height: 300,
    },
    addressTextInput: {
        height: 90,
        flex: 1,
        // width: '100%',
        borderColor: '#BDC1C6',
        borderWidth: 1,
        borderRadius: 8,
        textAlign: 'left',
        textAlignVertical: 'top',
        paddingHorizontal: spacing.small,
        paddingVertical: spacing.small,
        // alignItems:'center'

    },
    text3: {
        fontSize: FONTsize.superXtraLg,
        fontFamily: FONTS.interRegular,
    },
    titleSahtiyaStyle: {
        fontSize: FONTsize.superXtraLg,
        fontFamily: FONTS.sahityaRegular,
        color: '#FFFFFF',
        textAlign: 'center',


    },
    submitContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: spacing.medium,
        borderWidth: 1,
        height: 47,
        borderRadius: 8,
        paddingHorizontal: spacing.xtraLarge,

    },
    submitText: {
        fontSize: FONTsize.medium,
        fontFamily: FONTS.interMedium,

    },


})