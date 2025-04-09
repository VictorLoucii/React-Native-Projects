import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native'
import ProductDetailScreenHeader from '../components/ProductDetailScreenHeader'
import ProductCarousel from '../components/ProductCarousel'
import { fontSize, iconSizes, spacing } from '../constants/dimensions'
import { colors } from '../constants/colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { fonts } from '../constants/fonts'
import CartButton from '../components/CartButton'
import { SafeAreaView } from 'react-native-safe-area-context'

const colorData = [
    {
        colorName: 'Silver',
        colorValue: '#F0F2F2',
    },
    {
        colorName: 'Bright Orange',
        colorValue: '#F25475',
    },
    {
        colorName: 'Blue',
        colorValue: 'blue',
    },
]

const ProductDetailScreen = () => {
    // const route = useRoute();
    // const item = route.params?.item; // Use optional chaining for safety
    const item = useRoute().params.item;  //here item object is coming from ProductCard.jsx
    // const { item } = route.params
    console.log('item in ProducDetailScreen:----', item);
    console.log('item.innerImages:------', item.innerImages);

    const [selectedColor, setselectedColor] = useState('');
    console.log('selectedColor:-----', selectedColor);

    const [selectedTabb, setSelectedTabb] = useState('');


    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator = {false}>
                <ProductDetailScreenHeader />
                <ProductCarousel innerImages={item.innerImages} />
                {/* content stuff */}
                <View style={styles.titleContainer}>
                    {/* title wrapper */}
                    <View style={styles.titleWrapper}>
                        <Text style={styles.productName}>{item.name}</Text>
                        <Text style={styles.productBrand}>{item.brand}</Text>
                    </View>
                    {/* rating wrapper */}
                    <View style={styles.ratingWrapper}>
                        <AntDesign
                            name={'star'} color={colors.yellow}
                            size={iconSizes.small}
                        />
                        <Text style={styles.ratingValue}>4.5</Text>
                    </View>
                </View>

                {/* color container */}
                <View style={styles.colorContainer}>
                    <Text style={styles.colorHeading}>Select Color</Text>
                    <FlatList
                        data={colorData}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => (
                                        setselectedColor(item.colorValue)
                                    )}
                                    style={[
                                        styles.selectColorContainer,
                                        item.colorValue === selectedColor && { borderColor: item.colorValue }
                                    ]}
                                >
                                    <View style={[styles.cicleColor, { backgroundColor: item.colorValue }]} />
                                    <Text style={styles.colorText}>{item.colorName}</Text>
                                </TouchableOpacity>
                            )
                        }}
                        horizontal
                        ItemSeparatorComponent={() => (
                            <View style={{ width: spacing.small }} />
                        )}
                    />
                </View>

                {/* details and review */}
                <View style={styles.detailsReviewTabbs}>
                    <TouchableOpacity onPress={() => setSelectedTabb('Details')}>
                        <Text
                            style={[
                                styles.tabbText,
                                selectedTabb === 'Details' && { color: colors.purple }
                            ]}
                        >
                            Details
                        </Text>
                        {selectedTabb === 'Details' && <View style={styles.underline} />}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSelectedTabb('Review')}>
                        <Text
                            style={[
                                styles.tabbText,
                                selectedTabb === 'Review' && { color: colors.purple }
                            ]}
                        >
                            Review</Text>
                        {selectedTabb === 'Review' && <View style={styles.underline} />}
                    </TouchableOpacity>
                </View>
                <Text style={styles.detailsReviewContent}>
                    {selectedTabb === 'Details' ? item.details : item.review}
                </Text>
            </ScrollView>
            {/* linear gradient component */}
            <CartButton />

        </View>
        
    )
}

export default ProductDetailScreen

const styles = StyleSheet.create({
    container: {
        // flex:1, //removed it because the images from component ProductCarousel were being displayed in middle instead of top right after header component
        backgroundColor: colors.background,
       paddingHorizontal: spacing.medium,
        paddingBottom: 40,
    },
    titleContainer: {
        flexDirection: 'row',
        // paddingHorizontal: spacing.large

    },
    titleWrapper: {
        flex: 1,
    },
    productName: {
        fontFamily: fonts.Bold,
        color: colors.black,
        fontSize: fontSize.medium,

    },
    productBrand: {
        fontFamily: fonts.Medium,
        color: colors.gray,
        fontSize: fontSize.small,
        paddingVertical: spacing.small,

    },
    ratingWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.small,
        backgroundColor: colors.lavender,
        borderRadius: spacing.medium,
        paddinglef: spacing.xtraSmall,
        height: 40,
        marginTop: spacing.medium,

    },
    ratingValue: {
        fontSize: fontSize.medium,
        fontFamily: fonts.Medium,
        paddingRight: spacing.xtraSmall

    },
    colorContainer: {
        paddingTop: spacing.medium,
    },
    colorHeading: {
        fontSize: fontSize.medium,
        fontFamily: fonts.SemiBold,
        color: colors.black,
        paddingBottom: spacing.medium,
    },
    selectColorContainer: {
        borderWidth: 1,
        borderColor: colors.gray,
        borderRadius: 4,
        padding: spacing.small,
        flexDirection: 'row',
        gap: spacing.small,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cicleColor: {
        height: spacing.medium,
        width: spacing.medium,
        // backgroundColor: colors.purple,      //this will be overwritten by the styling statement: {backgroundColor: item.colorValue}
        borderRadius: spacing.medium / 2,
    },
    colorText: {
        fontSize: fontSize.small,
        fontFamily: fonts.Medium,
        color: colors.black,

    },
    detailsReviewTabbs: {
        paddingTop: spacing.large,
        flexDirection: 'row',
        gap: spacing.large,
    },
    tabbText: {
        fontSize: fontSize.medium,
        fontFamily: fonts.Medium,
        color: colors.gray,
    },
    underline: {
        borderBottomColor: colors.purple,
        borderBottomWidth: 2,
        width: '50%',
        marginTop: spacing.xtraSmall,
    },
    detailsReviewContent: {
        color: colors.gray,
        fontFamily: fonts.Regular,
        fontSize: fontSize.medium,
        paddingVertical: spacing.xtraSmall,
        paddingBottom: 200,
    }
})