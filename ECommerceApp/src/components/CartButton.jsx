import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { fontSize, spacing } from '../constants/dimensions'
import { colors } from '../constants/colors'
import { fonts } from '../constants/fonts'
import LinearGradient from 'react-native-linear-gradient'


const CartButton = () => {
    return (
            <TouchableOpacity style={styles.container}>
                <LinearGradient
                    colors={["#8743FF", "#4136F1"]}
                    start={{
                        x: 0,
                        y: 0.5
                    }}
                    end={{
                        x: 1,
                        y: 0,
                    }}
                    style={styles.addToCartButton}
                >
                    <MaterialCommunityIcons
                        name={'cart-outline'} size={fontSize.medium}
                        color={colors.background}
                    />
                    <Text style={styles.addToCartText}>
                        Add to Cart | $349.99
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
    )
}

export default CartButton

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    addToCartButton: {
        width: '90%',
        padding: spacing.small,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: spacing.small,
        borderRadius: spacing.medium,
    },
    addToCartText: {
        color: colors.background, 
        fontSize: fontSize.medium,
        fontFamily: fonts.Bold, 
    },
})