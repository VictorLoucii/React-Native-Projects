import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { spacing } from '../constants/dimensions';

// The props interface now accepts `children`
interface ConnectCardProps {
    imageSource: any;
    ONPRESS?: () => void;
    children: React.ReactNode; // The type for any renderable content

}

const ConnectCard = ({ imageSource, ONPRESS, children }: ConnectCardProps) => {
    return (
        <TouchableOpacity
            onPress={ONPRESS}
            style={styles.container}
        >

            <ImageBackground
                source={imageSource}
                style={styles.cardImageContainer}
                imageStyle={styles.imageStyle}
            >
                <View style={styles.overlayContainer}>
                    {/* Render whatever content the parent provides right here */}
                    {children}
                </View>

            </ImageBackground>

        </TouchableOpacity>
    )
}

export default ConnectCard

const styles = StyleSheet.create({
    container: {
        // width: 414,
        height: 211,
        backgroundColor: '#BDC1C6',
        // borderRadius:10,
    },
    cardImageContainer: {
        flex: 1,
    },
    imageStyle: {
        // borderRadius:10,

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

    }
})