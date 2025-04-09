import { Dimensions, FlatList, Image, Keyboard, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { spacing } from '../constants/dimensions';
import { colors } from '../constants/colors';

const screenWidth = Dimensions.get('window').width;

const ProductCarousel = ({ innerImages }) => {
    console.log('images/item in productCarousle:-----', innerImages);
    const [activeSlide, setActiveSlide] = useState(0);

    const onViewRef = useRef((viewableItems) => {
        console.log('viewableItems in ProductCarousel:-----',viewableItems);
        if(viewableItems.viewableItems.length>0){
            setActiveSlide(viewableItems.viewableItems[0].index);
            console.log('setActiveSlide:-----',activeSlide);
        }

    })

    return (
        <>
            <FlatList
                data={innerImages}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.imageWrapper}>
                            <Image source={{ uri: item }}
                                style={styles.image1}
                            />
                        </View>
                    )
                }}
                horizontal={true}
                keyExtractor={(item, index) => index.toString()}
                onViewableItemsChanged={onViewRef.current} 
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                snapToAlignment='center'
                snapToInterval={screenWidth}
                decelerationRate={'fast'}
            />
            <View style={styles.pagination}>
                {innerImages.map((_, index) => (
                    <View 
                    key = {index}
                    style={[styles.dot,
                        index === activeSlide && 
                        {
                            width: 20,
                            borderRadius:32,
                        },
                        {
                            backgroundColor: index === activeSlide ? colors.purple : colors.gray
                        }
                    ]} />
                ))}
            </View>
        </>


    )
}

export default ProductCarousel

const styles = StyleSheet.create({
    imageWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: screenWidth,
        paddingTop: spacing.small,
    },
    image1: {
        height: 350,
        width: 350,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        // alignItems: 'center',
        marginVertical: spacing.medium,

    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        marginHorizontal: spacing.xtraSmall,
        backgroundColor: colors.gray,

    },
})