import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FONTS } from '../constants/fonts'
import { FONTsize, spacing } from '../constants/dimensions'

const UpComingEvents = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.upComingEventsStyling}>UpComingEvents</Text>

            <View style={styles.allImagesContainer}>

                <ImageBackground
                    source={require('../../assets/goodFriday.png')}
                    style={styles.cardImageContainer}
                    imageStyle={styles.imageStyle}
                >

                    <View style={styles.overlayContainer}>
                        <Text style={styles.headingStyling}>
                            GOOD FRIDAY MEETING
                        </Text>
                        <Text style={styles.subHeadingStyling}>
                            FRIDAY 18TH
                        </Text>
                        <Text style={styles.timeStyling}>
                            10:00 AM
                        </Text>
                    </View>
                </ImageBackground>

                <ImageBackground
                    source={require('../../assets/bibleStudy.png')}
                    style={styles.cardImageContainer}
                    imageStyle={styles.imageStyle}
                >

                    <View style={styles.overlayContainer}>
                        <Text style={styles.headingStyling}>
                            BIBLE STUDY EVENING
                        </Text>
                        <Text style={styles.subHeadingStyling}>
                            WEDNESDAY 10TH
                        </Text>
                        <Text style={styles.timeStyling}>
                            06:00 PM
                        </Text>
                    </View>
                </ImageBackground>

                <ImageBackground
                    source={require('../../assets/alter.png')}
                    style={styles.cardImageContainer}
                    imageStyle={styles.imageStyle}
                >

                    <View style={[styles.overlayContainer, styles.meetmeOverlay]}>
                        <Text style={styles.meetMeHeading}>
                            MEET ME
                        </Text>
                        <Text style={styles.atStyling}>
                            at
                        </Text>
                        <Text style={styles.alterStyling}>
                            THE ALTER
                        </Text>
                        <Text style={styles.dateStyling}>
                            MARCH 14TH
                        </Text>

                    </View>
                </ImageBackground>


            </View>



        </View>
    )
}

export default UpComingEvents

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: spacing.large,
        marginTop: 30,
        backgroundColor: '#131314'

    },
    upComingEventsStyling: {
        fontFamily: FONTS.interBold,
        fontSize: 24,
        color: "#FFFFFF",
        marginBottom: 20,
    },
    allImagesContainer: {
        gap: spacing.medium,
        paddingBottom: 70,

    },
    cardImageContainer: {
        width: 364,
        height: 203,

    },
    imageStyle: {
        borderRadius: 16,

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

    },
    headingStyling: {
        fontFamily: FONTS.arialBlack,
        fontSize: FONTsize.xtraLarge,
        color: '#FFFFFF',
        textAlign: 'center',
        width: '90%',
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