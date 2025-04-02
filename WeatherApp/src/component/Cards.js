import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { deviceHeight, deviceWidth } from '../Dimensions'
import { useNavigation } from '@react-navigation/native'

const Cards = ({ name, image }) => {
    const navigation = useNavigation();
    const goToDetails = () => {
        navigation.navigate('Details', {name})

    }
    return (
        <TouchableOpacity
            onPress={goToDetails}
        >
            <ImageBackground
                style={styles.imageStyle}
                source={image}
                imageStyle={{ borderRadius: 16 }}
            />
            <View style={styles.viewContainer}>
                <Text style={styles.textStyling}>
                    {name}
                </Text>

            </View>

        </TouchableOpacity>

    )
}

export default Cards

const styles = StyleSheet.create({
    imageStyle: {
        height: deviceHeight / 5,
        width: deviceWidth / 2 - 50,
    },
    viewContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',

    },
    textStyling: {
        fontSize: 22,
        width: '100%',
        height: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
        fontWeight: 'bold',
    }
})