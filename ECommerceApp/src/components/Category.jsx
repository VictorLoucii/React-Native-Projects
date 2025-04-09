//@ts-check
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { fontSize, spacing } from '../constants/dimensions'
import { fonts } from '../constants/fonts'
import { colors } from '../constants/colors'
import { category } from '../data/category'

const Category = ({selectedCategory, handleUpdateCategory}) => {

    return (
        <FlatList
            showsHorizontalScrollIndicator = {false}
            horizontal={true}
            data={category}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => {
                return (
                    //TouchableOpacity onPress() will call handleUpdateCategory defined in HomeScreen.jsx
                    <TouchableOpacity onPress={() => handleUpdateCategory(item.name)}>
                        <Text 
                            style={[
                                styles.categoryTxt,
                                selectedCategory === item.name && {color: colors.purple}
                                ]}>
                            {item.name}
                        </Text>
                        { selectedCategory === item.name  && <View style={styles.underline} />}
                    </TouchableOpacity>
                )
            }}
            ItemSeparatorComponent={
                <View style={{ paddingHorizontal: spacing.small }} />
            }
        />
    )
}

export default Category

const styles = StyleSheet.create({
    categoryTxt: {
        fontSize: fontSize.medium,
        fontFamily: fonts.SemiBold,
        color: colors.gray,
    },
    underline: {
        width: '50%',
        borderBottomColor: colors.purple,
        borderBottomWidth: 2,
        marginTop: spacing.small,
    }
})