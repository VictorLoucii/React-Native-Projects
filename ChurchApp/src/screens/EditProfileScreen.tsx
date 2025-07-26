import { Platform, PermissionsAndroid, ActivityIndicator, Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useThemeStore } from '../themes/ThemeStore';
import { useNavigation, useTheme } from '@react-navigation/native';
import { CustomTheme } from '../themes/CustomTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { FONTsize, spacing } from '../constants/dimensions';
import { FONTS } from '../constants/fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import RNPickerSelect from 'react-native-picker-select';  //libray for multiple country phone code
import { launchImageLibrary } from 'react-native-image-picker';
import { supabase } from '../../supabase';
import { useProfileStore } from '../ZustandStore/ProfileStore';




const countryCodes = [
    { label: 'IN +91', value: '+91' },
    { label: 'US +1', value: '+1' },
    { label: 'UK +44', value: '+44' },
    // You can add more countries here
];




const EditProfileScreen = () => {

    const { isDarkMode, toggleTheme } = useThemeStore();
    const { colors } = useTheme() as CustomTheme;
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [countryCode, setCountryCode] = useState('+91'); // Default to India
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const { profile, updateProfile } = useProfileStore(); // Get the profile AND the update action from the ProfileStore.tsx file

    // below useEffect to sync the global store to the local form state
    useEffect(() => {
        // This effect runs when the component mounts and whenever the 'profile' object from the store changes.
        if (profile) {
            // Pre-fill the form with the data from the global store
            if (profile.username) {
                const [first, ...last] = profile.username.split(' ');
                setFirstName(first || ''); // Use empty string as fallback
                setLastName(last.join(' '));
            }

            if (profile.phone_number) {
                // This logic is to safely parse the phone number you have stored
                const potentialCode = profile.phone_number.substring(0, 3); // e.g., "+91"
                const number = profile.phone_number.substring(3);

                // Check if the parsed code is a valid option in your dropdown
                if (countryCodes.some(c => c.value === potentialCode)) {
                    setCountryCode(potentialCode);
                    setPhoneNumber(number);
                } else {
                    // If the code isn't valid (e.g., old number), just set the number part
                    setPhoneNumber(profile.phone_number);
                }
            }

            // Set the avatar URL to display the current image
            if (profile.avatar_url) {
                setAvatarUrl(profile.avatar_url);
            }
        }
    }, [profile]); // The dependency array is crucial: this effect re-runs ONLY when the profile object changes



    const pickImage = async () => {

        if (Platform.OS === 'android') {
            try {
                // Determine which permission to request based on Android version
                const permission = Platform.Version >= 33
                    ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
                    : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

                const granted = await PermissionsAndroid.request(
                    permission,
                    {
                        title: "Storage Permission",
                        message: "App needs access to your photos to let you select a profile picture.",
                        buttonPositive: "OK"
                    }
                );

                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    Alert.alert('Permission Denied', 'Photo and video permission is required to select a profile picture.');
                    return;
                }
            } catch (err) {
                console.warn(err);
                return;
            }
        }

        // Now, launch the image library
        await launchImageLibrary({
            mediaType: 'photo',
            quality: 0.5,
        }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                const uri = response.assets?.[0]?.uri;
                if (uri) {
                    setAvatarUrl(uri);
                }
            }
        });
    };




    const handleSubmit = async () => {
        // Prevent double submission
        if (isSubmitting) return;

        // --- VALIDATION BLOCK 
        const nameRegex = /^[a-zA-Z\s-]*$/;
        if (!nameRegex.test(firstName.trim()) || !nameRegex.test(lastName.trim())) {
            Alert.alert('Invalid Name', 'First and last names can only contain letters.');
            return;
        }
        const phoneRegex = /^\d{10,}$/;
        if (phoneNumber.trim() && !phoneRegex.test(phoneNumber.trim())) {
            Alert.alert('Invalid Phone Number', 'If provided, the phone number must contain at least 10 digits.');
            return;
        }
        // --- END of VALIDATION BLOCK

        setIsSubmitting(true);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                Alert.alert("You must be logged in to edit your profile.");
                setIsSubmitting(false);
                return;
            }

            let newAvatarPublicUrl = profile?.avatar_url; // Start with the existing avatar url

            // Check if the avatarUrl state has changed from the original profile avatar_url
            // and is a local file URI (starts with 'file://').
            if (avatarUrl && avatarUrl !== profile?.avatar_url && avatarUrl.startsWith('file://')) {
                const fileUri = avatarUrl;
                const fileExt = fileUri.split('.').pop();
                const fileName = `${Date.now()}.${fileExt}`;
                const filePath = `${user.id}/${fileName}`;
                const formData = new FormData();
                formData.append('file', {
                    uri: fileUri,
                    name: fileName,
                    type: `image/${fileExt}`,
                });

                // If there's an existing avatar, you might want to delete it first.
                // For simplicity, we'll just upload a new one. Supabase can be configured to overwrite.
                const { error: uploadError } = await supabase.storage
                    .from('avatars')
                    .upload(filePath, formData);

                if (uploadError) {
                    throw uploadError;
                }

                const { data: urlData } = supabase.storage
                    .from('avatars')
                    .getPublicUrl(filePath);
                newAvatarPublicUrl = urlData.publicUrl;
            }

            const username = `${firstName} ${lastName}`.trim();
            const fullPhoneNumber = phoneNumber.trim() ? `${countryCode}${phoneNumber.trim()}` : '';

            const updates = {
                username,
                phone_number: fullPhoneNumber,
                avatar_url: newAvatarPublicUrl, // Use the potentially new URL
                updated_at: new Date().toISOString(),
            };

            const { error: updateError } = await supabase
                .from('profiles')
                .update(updates)
                .eq('id', user.id);

            if (updateError) {
                throw updateError;
            }

            // --- ACTION 4 START: UPDATE THE GLOBAL STORE ---
            // After the database update is successful, update the local Zustand store
            // with the new data. This will cause MoreScreen to instantly re-render with the new info.
            updateProfile({
                username: username,
                phone_number: fullPhoneNumber,
                avatar_url: newAvatarPublicUrl,
            });
            // --- ACTION 4 END ---

            Alert.alert("Profile Updated!");
            navigation.goBack();

        } catch (error) {
            Alert.alert('An Error Occurred', (error as Error).message);
        } finally {
            setIsSubmitting(false);
        }
    };




    return (

        <ScrollView
            style={[styles.container, { backgroundColor: colors.settingsBGC }]}
            contentContainerStyle={[styles.contentContainer, {
                paddingBottom: insets.bottom + spacing.large,
                paddingTop: insets.top
            }]}
            showsVerticalScrollIndicator={false}
        >
            <StatusBar
                barStyle={(isDarkMode ? 'light-content' : 'dark-content')}
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
                    Edit Profile
                </Text>
            </View>


            <TouchableOpacity style={styles.userImageContainer}
                onPress={() => pickImage()}
            >
                <Image
                    source={avatarUrl ? { uri: avatarUrl } : require('../../assets/userImage.png')}
                    style={styles.userImage}
                />
            </TouchableOpacity>

            <View style={styles.changeProfileTextContainer}>
                <Text style={[styles.changeProfileText, { color: colors.textPrimary }]}>
                    Change Profile Picture
                </Text>
            </View>

            <View style={styles.editInfoContainer}>

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
                        color: colors.textPrimary,
                        // borderWidth:1,
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
                    Phone Number
                </Text>

                <View style={styles.pickerAndTextInputContainer}>

                    <View style={[styles.pickerContainer, { borderColor: colors.textPrimary }]}>
                        <RNPickerSelect
                            value={countryCode} // Set the current value
                            onValueChange={(value) => setCountryCode(value)}
                            items={countryCodes}
                            style={pickerSelectStyles(colors)} // Apply our custom styles
                            useNativeAndroidPickerStyle={false} // Use custom styles on Android
                            Icon={() => { // Custom dropdown icon
                                return <FontAwesome name={'caret-down'} size={15.5} color={colors.icon}
                                />;
                            }}
                        />
                    </View>

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

                <TouchableOpacity
                    style={[styles.submitContainer, {
                        borderColor: colors.tabBarIconActive,
                        // Make the button look disabled if state 'isSubmitting' is true/false
                        backgroundColor: isSubmitting ? '#ccc' : 'transparent'
                    }]}
                    onPress={handleSubmit}
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



        </ScrollView>
    )
}

export default EditProfileScreen


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
        // alignItems: 'center',

    },
    contentContainer: {
        alignItems: 'center', // Center all the content horizontally
        paddingBottom: 100,    // This creates the space at the very bottom!
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
    userImageContainer: {
        // marginTop: spacing.xtraLarge,
        // flexDirection: 'row',
        alignItems: 'center',
        // height: 156,
        // width: 148,
        // justifyContent: 'center',
    },
    userImage: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 250,
        width: 250,
        borderRadius: 125,

    },
    changeProfileTextContainer: {
        marginTop: spacing.small,

    },
    changeProfileText: {
        textAlign: 'center',
        // fontSize: FONTsize.medium,
        // fontFamily: FONTS.robotoRegular,
        color: '#000000',
        fontFamily: FONTS.robotoMedium,
        fontSize: FONTsize.small,

    },
    editInfoContainer: {
        marginTop: spacing.bigerLarge,
        paddingHorizontal: spacing.small,
        // height: 387,  // REMOVED: This allows the container to grow with its content
        width: '85%',
        // backgroundColor: '#FFFFFF',
        borderRadius: 20,
        gap: spacing.small,
        // justifyContent:'center',
        // alignItems:'center',
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
    pickerAndTextInputContainer: {
        flexDirection: 'row',
        gap: spacing.small,
    },
    pickerContainer: {
        width: '35%',
        borderWidth: 1,
        borderRadius: 8,
        height: 47,
        justifyContent: 'center', // Center the picker content vertically
        // borderColor:'##BDC1C6',
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


