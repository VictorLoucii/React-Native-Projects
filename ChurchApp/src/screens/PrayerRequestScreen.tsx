import { ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useThemeStore } from '../themes/ThemeStore';
import { useNavigation, useTheme } from '@react-navigation/native';
import { CustomTheme } from '../themes/CustomTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FONTsize, spacing } from '../constants/dimensions';
import { FONTS } from '../constants/fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'

const PrayerRequestScreen = () => {

    const { isDarkMode, toggleTheme } = useThemeStore();
    const { colors } = useTheme() as CustomTheme;
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');


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
                        <View style={styles.phoneCodeAndSymbol}>
                            <Text style={[styles.phoneCodeText, { color: colors.textPrimary }]}>
                                US +1
                            </Text>

                            <FontAwesome
                                name={'caret-down'}
                                size={15.5}
                                color={colors.icon}
                            />

                        </View>
                        <TextInput
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

                    <View style={styles.addressContainer}>
                        <Text style={[styles.formLabel, { color: colors.textPrimary }]}>
                            Description of Your Prayer Requests
                        </Text>
                        <TextInput
                            value={address}
                            onChangeText={(newText) => setAddress(newText)}
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


})