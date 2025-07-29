import { ActivityIndicator, Alert, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FONTS } from '../constants/fonts'
import { FONTsize, spacing } from '../constants/dimensions'
import { useThemeStore } from '../themes/ThemeStore'
import { useNavigation, useTheme } from '@react-navigation/native'
import { CustomTheme } from '../themes/CustomTheme'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { supabase } from '../../supabase'

//define the type for the stack navigator screens 
type HomeStackParamList = {
    HomeScreen: undefined;
    UpcomingEventScreen: { event: object };   // It expects an 'event' object
}

// Define the navigation prop type for this screen
type HomeNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'HomeScreen'>;


const UpComingEvents = () => {
    const { colors } = useTheme() as CustomTheme;
    const navigation = useNavigation<HomeNavigationProp>();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);


    // useEffect to fetch data
    useEffect(() => {
        const loadEvents = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('events')
                .select('*')
                .order('event_date', { ascending: true });

            if (data) {
                setEvents(data);
            }
            if (error) {
                Alert.alert("Error", "Could not fetch events.");
                console.error("Fetch events error:", error);
            }
            setLoading(false);
        };

        loadEvents();
    }, []);



    return (
        <View style={[styles.container, { backgroundColor: colors.bkGroundClr }]}>
            <Text style={[styles.upComingEventsStyling, { color: colors.textPrimary }]}>UpComingEvents</Text>

            <View style={styles.allImagesContainer}>
                {/* conditonal rendering */}
                {/* Show a loading indicator while data is being fetched */}
                {loading ? (
                    <ActivityIndicator size="large" color={colors.textPrimary} />
                ) : (
                    events.map((event) => {
                        return (
                            <TouchableOpacity
                                key={event.id} // The key is essential for list rendering
                                onPress={() => navigation.navigate('UpcomingEventScreen', { event: event })}
                            >
                                <ImageBackground
                                    source={{ uri: event.image_url }} // Use the image URL from the database
                                    style={styles.cardImageContainer}
                                    imageStyle={styles.imageStyle}
                                >
                                    <View style={styles.overlayContainer}>
                                        <Text style={styles.headingStyling}>
                                            {event.title}
                                        </Text>

                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>

                        )
                    })



                )}

            </View>



        </View>
    )
}

export default UpComingEvents

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: spacing.large,
        marginTop: 30,
        // backgroundColor: '#131314'

    },
    upComingEventsStyling: {
        fontFamily: FONTS.interBold,
        fontSize: 24,
        // color: "#FFFFFF",
        marginBottom: 20,
    },
    allImagesContainer: {
        gap: spacing.medium,
        paddingBottom: 70,

    },
    cardImageContainer: {
        // width: 364,
        flex: 1,
        height: 203,


    },
    imageStyle: {
        borderRadius: 16,
        width: '100%',
        height: '100%',

    },
    overlayContainer: {
        // This creates a semi-transparent dark layer over the image
        // and acts as the container for our text and icons.
        flex: 1, // Takes up the full space of the ImageBackground
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Black with 30% opacity
        borderRadius: 16, // Match the parent's border radius
        // padding: spacing.small, // Inner spacing for the content
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.medium, // Added padding for better spacing

    },
    headingStyling: {
        fontFamily: FONTS.arialBlack,
        fontSize: FONTsize.xtraLarge,
        color: '#FFFFFF',
        textAlign: 'center',
        width: '100%',
        // width:334,
        textTransform: 'uppercase',
        // lineHeight: 30, 


    },
    subHeadingStyling: {
        fontFamily: FONTS.interExtraLight,
        fontSize: FONTsize.large,
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: 8,
    },
    timeStyling: {
        fontFamily: FONTS.interBlack,
        fontSize: FONTsize.medium,
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: 8,

    },
    // --- ADDED STYLES ---
    registerButton: {
        marginTop: spacing.medium,
        paddingVertical: spacing.small,
        paddingHorizontal: spacing.large,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        borderRadius: 8,
        backgroundColor: 'transparent',
    },
    registeredButton: {
        backgroundColor: '#4CAF50', // A green color to indicate success
        borderColor: '#4CAF50',
    },
    registerButtonText: {
        fontFamily: FONTS.interBold,
        color: '#FFFFFF',
        fontSize: FONTsize.small,
    },
    // --- END OF ADDED STYLES ---
    meetmeOverlay: {
        gap: spacing.xtraSmall
    },
    meetMeHeading: {
        fontFamily: FONTS.interExtraLight,
        color: '#FFFFFF',
        fontSize: FONTsize.xtraLarge,
        textAlign: 'center',
        marginBottom: -5
        // lineHeight: 35, // TIGHT line height to pull text together
    },
    atStyling: {
        fontFamily: FONTS.romanescoRegular,
        color: '#A5C2DE',
        fontSize: 64,
        lineHeight: 50, // TIGHT line height
        marginTop: -15, // Use negative margin to pull it closer to the other text
    },
    alterStyling: {
        fontFamily: FONTS.interExtraLight,
        fontSize: FONTsize.large,
        color: 'white',
        textAlign: 'center',
        marginTop: -8,
        lineHeight: 35, // TIGHT line height to pull text together

    },
    dateStyling: {
        fontFamily: FONTS.interMedium,
        fontSize: FONTsize.medium,
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: -8,
    },

})