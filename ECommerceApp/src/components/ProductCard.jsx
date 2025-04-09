//@ts-check
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'
import { fontSize, spacing } from '../constants/dimensions'
import { fonts } from '../constants/fonts'
import { useNavigation } from '@react-navigation/native'


const imageUrl = 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1725994013/Croma%20Assets/Communication/Wearable%20Devices/Images/309323_0_r9phvj.png'

const ProductCard = ({ item }) => {
    console.log('item in ProductCard:-----', item);
    console.log('item.image:-----',item.image);

    const navigation = useNavigation()
    const goToProductDetailScreen = () => {
        navigation.navigate('Product_Detail', { item });
    }


    return (
        <TouchableOpacity style={styles.container} onPress={goToProductDetailScreen}>
            <View style={styles.imageWrapper}>
                <Image
                    source={{ uri: item.image }}
                    style={styles.productImage}
                />
            </View>
            {/* name */}
            <View style={styles.contentContainer}>
                <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.brand}>{item.brand}</Text>
                <Text style={styles.price}>${item.price}</Text>
            </View>
        </TouchableOpacity>

    )
}

export default ProductCard

const styles = StyleSheet.create({
    container: {
        width: '48%',
        height: 210,
        elevation: 5,
        backgroundColor: colors.background,
        borderRadius: 12,
        marginVertical: spacing.medium,

    },
    imageWrapper: {
        borderRadius: 12,
        backgroundColor: '#FFC8B7',
        marginVertical: spacing.small,
        margin: spacing.small,  //adds margin from all sides
    },
    productImage: {
        height: 133,
        width: '100%',  //takes 100% width of the parent container i.e imageWrapper
        resizeMode: 'center',   // this will center the image
    },
    contentContainer: {
        marginTop: -5,
        paddingHorizontal: spacing.small,
    },
    name: {
        color: colors.black,
        fontSize: fontSize.medium,
        fontFamily: fonts.SemiBold,

    },
    brand: {
        color: colors.gray,
        fontSize: fontSize.small,
        fontFamily: fonts.Medium,

    },
    price: {
        color: colors.purple,
        fontSize: fontSize.medium,
        fontFamily: fonts.Medium,

    }
})