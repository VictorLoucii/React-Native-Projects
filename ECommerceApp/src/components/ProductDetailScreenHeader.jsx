import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { iconSizes } from '../constants/dimensions'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'


const ProductDetailScreenHeader = () => {
    const [isLiked, setIsLiked] = useState(false);
    const handleLikePress = () => {
        return (
            setIsLiked(!isLiked)
            //setIsLiked(previousState => !previousState)  //this is similar to the above statement
        )
    }

    const navigation = useNavigation();
    const goToPrevScreen = () => {
        return (
            navigation.goBack()
        )
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={goToPrevScreen}>
                <Ionicons name={'arrow-back'} size={iconSizes.medium} />
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>  this and below statement do the same work*/}
            <TouchableOpacity onPress={handleLikePress}>
                {isLiked ?
                    (<AntDesign name={'heart'} size = {iconSizes.medium} />)
                    : (<AntDesign name={'hearto'} size = {iconSizes.medium} />)
                }
            </TouchableOpacity>
        </View>
    )
}

export default ProductDetailScreenHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})