import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FONTsize, spacing } from '../constants/dimensions'
import { FONTS } from '../constants/fonts'


const Featured = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.FeaturedStyle}>
                Featured
            </Text>
            <View style={styles.allImagesContainer}>

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

                <View style={styles.prayerRequestAndConnectContainer}>

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
        backgroundColor: '#131314'

    },
    allImagesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,

    },
    FeaturedStyle: {
        fontFamily: FONTS.interBold,
        fontSize: 24,
        color: "#FFFFFF",
    },
    card1ImageContainer: {
        width: 164,
        height: 247,
        paddingHorizontal: spacing.small,

    },
    image1style: {
        borderRadius: 16,

    },
    overlayContainer1: {
        // This creates a semi-transparent dark layer over the image
        // and acts as the container for our text and icons.
        flex: 1, // Takes up the full space of the ImageBackground
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Black with 30% opacity
        borderRadius: 16, // Match the parent's border radius
        padding: spacing.small, // Inner spacing for the content

        // Flexbox to position items
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

    },
    watchHereStyle: {
        fontFamily: FONTS.interRegular,
        fontSize: FONTsize.small,
        color: '#FFFFFF',
        // paddingTop:spacing.medium
    },
    prayerRequestAndConnectContainer: {
        gap: spacing.medium


    },
    card2ImageContainer: {
        width: 180,
        height: 113,
        paddingHorizontal: spacing.small,


    },
    image2style: {
        borderRadius: 16,


    },
    prayerRequestLetsPrayContainer: {
        justifyContent: 'space-between',
        flex: 1,
        padding: spacing.small,
    },
    PrayerRequestStyle: {
        fontFamily: FONTS.interExtraLight,
        fontSize: FONTsize.medium,
        color: '#FFFFFF'

    },
    LetsPrayStyle: {
        fontFamily: FONTS.interRegular,
        fontSize: FONTsize.small,
        color: '#FFFFFF'
    },
    card3ImageContainer: {
        width: 180,
        height: 113,
        paddingHorizontal: spacing.small,
    },
    getConnectedJoinUsContainer: {
        justifyContent: 'space-between',
        flex: 1,
        padding: spacing.small,

    },
    image3style: {
        borderRadius: 16,


    },
    GetConnectStyle: {
        fontFamily: FONTS.interExtraLight,
        fontSize: FONTsize.medium,
        color: '#FFFFFF'

    },
    joinUsTyle: {
        fontFamily: FONTS.interRegular,
        fontSize: FONTsize.small,
        color: '#FFFFFF'
    },


})