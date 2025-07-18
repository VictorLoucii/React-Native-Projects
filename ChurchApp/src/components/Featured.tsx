import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FONTsize, spacing } from '../constants/dimensions'
import { FONTS } from '../constants/fonts'
import { useThemeStore } from '../themes/ThemeStore'
import { useNavigation, useTheme } from '@react-navigation/native'
import { CustomColors } from '../themes/CustomTheme'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'


// Definining the param list for tabs for type safety
type RootTabParamList = {
    Home: undefined;
    Connect: {
        screen: 'PrayerRequestScreen' | 'BecomeMemberScreen';
        params?: undefined; // This is good practice to include
    };
    Media: undefined;
    More: undefined;
};

// Define the specific navigation prop type for this screen
type FeaturedNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Home'>;

const Featured = () => {

    const { isDarkMode, toggleTheme } = useThemeStore();
    const { colors } = useTheme() as CustomColors;
    const navigation = useNavigation<FeaturedNavigationProp>(); //Get navigation object with types

    return (
        <View style={[styles.container, { backgroundColor: colors.bkGroundClr }]}>
            <Text style={[styles.FeaturedStyle, { color: colors.textPrimary }]}>
                Featured
            </Text>

            <View style={styles.allImagesContainer}>
                {/* below statement we are traversing from one tab screen to another */}
                <TouchableOpacity 
                    onPress={() => navigation.navigate('Media')}
                    style={{flex:1}}
                >

                    <ImageBackground
                        source={require('../../assets/sermon.jpg')}
                        style={styles.card1ImageContainer}
                        imageStyle={styles.image1style}
                    >
                        <View style={styles.overlayContainer1}>

                            <Text style={styles.sermonStyle}>
                                Sermons
                            </Text>
                            <View style={styles.playIconAndWatchHereContainer}>
                                <Image
                                    source={require('../../assets/play.png')}
                                    style={styles.playIconStyle}
                                />

                                <Text style={styles.watchHereStyle}>
                                    Watch here
                                </Text>
                            </View>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>

                <View style={styles.prayerRequestAndConnectContainer}>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Connect', { screen: 'PrayerRequestScreen' })}
                    >

                        <ImageBackground
                            source={require('../../assets/prayerRequest.png')}
                            style={styles.card2ImageContainer}
                            imageStyle={styles.image2style}
                        >
                            <View style={styles.prayerRequestLetsPrayContainer}>
                                <Text style={styles.PrayerRequestStyle}>
                                    Prayer Request
                                </Text>

                                <Text style={styles.LetsPrayStyle}>
                                    Lets Pray Together
                                </Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Connect', { screen: 'BecomeMemberScreen' })}
                    >

                        <ImageBackground
                            source={require('../../assets/getConnected.png')}
                            style={styles.card3ImageContainer}
                            imageStyle={styles.image3style}
                        >
                            <View style={styles.getConnectedJoinUsContainer}>
                                <Text style={styles.GetConnectStyle}>
                                    Get Connected
                                </Text>

                                <Text style={styles.joinUsTyle}>
                                    Join Us
                                </Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>


                </View>


            </View>

        </View>
    )
}

export default Featured

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: spacing.large,
        marginTop: 30,
        // backgroundColor: '#131314'

    },
    allImagesContainer: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        gap: spacing.small,
        marginTop: 20,
        // alignItems: 'flex-start', // Ensures columns align at the top


    },
    FeaturedStyle: {
        fontFamily: FONTS.interBold,
        fontSize: 24,
        // color: "#FFFFFF",
    },
    card1ImageContainer: {
        // width: 134,
        // flex: 1,
        width:'100%',
        // height: 247,
        height: (113 * 2) + spacing.medium, // Calculation: (card2.height + card3.height + gap)
        // paddingHorizontal: spacing.small,
        // justifyContent:'center',
        // alignItems:'center',

    },
    image1style: {
        borderRadius: 16,
        // resizeMode: 'contain', 

        // width: '100%',
        // height: '100%',

    },
    overlayContainer1: {
        // This creates a semi-transparent dark layer over the image
        // and acts as the container for our text and icons.
        // flex: 1, // Takes up the full space of the ImageBackground
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Black with 30% opacity
        borderRadius: 16, // Match the parent's border radius
        padding: spacing.small, // Inner spacing for the content

        justifyContent: 'space-between', // Pushes title to top, action to bottom

    },
    sermonStyle: {
        fontFamily: FONTS.interExtraLight,
        fontSize: FONTsize.large,
        color: '#FFFFFF'
    },
    playIconAndWatchHereContainer: {
        gap: spacing.small
    },
    playIconStyle: {
        width: 24,
        height: 24,

    },
    watchHereStyle: {
        fontFamily: FONTS.interRegular,
        fontSize: FONTsize.small,
        color: '#FFFFFF',
        // paddingTop:spacing.medium
    },
    prayerRequestAndConnectContainer: {
        gap: spacing.medium,
        // width:180,
        flex:1,
        


    },
    card2ImageContainer: {
        width: '100%',
        height: 113,
        // paddingHorizontal: spacing.small,


    },
    image2style: {
        borderRadius: 16,
        height: '100%',
        width: '100%',


    },
    prayerRequestLetsPrayContainer: {
        justifyContent: 'space-between',
        flex: 1,
        padding: spacing.small,

    },
    PrayerRequestStyle: {
        fontFamily: FONTS.interExtraLight,
        fontSize: FONTsize.medium,
        color: '#FFFFFF',
        textAlign:'center',

    },
    LetsPrayStyle: {
        fontFamily: FONTS.interRegular,
        fontSize: FONTsize.small,
        color: '#FFFFFF',
        textAlign:'center',

    },
    card3ImageContainer: {
        width: '100%',
        height: 113,
        // paddingHorizontal: spacing.small,
    },
    getConnectedJoinUsContainer: {
        justifyContent: 'space-between',
        flex: 1,
        padding: spacing.small,

    },
    image3style: {
        borderRadius: 16,
        height: '100%',
        width: '100%',


    },
    GetConnectStyle: {
        fontFamily: FONTS.interExtraLight,
        fontSize: FONTsize.medium,
        color: '#FFFFFF',
        textAlign:'center',

    },
    joinUsTyle: {
        fontFamily: FONTS.interRegular,
        fontSize: FONTsize.small,
        color: '#FFFFFF',
        textAlign:'center',

    },


})