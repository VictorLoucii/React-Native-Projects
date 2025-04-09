//@ts-check
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { fontSize, spacing } from '../constants/dimensions'
import { colors } from '../constants/colors'
import { fonts } from '../constants/fonts'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Category from '../components/Category'
import ProductCard from '../components/ProductCard'
import { smartWatch } from '../data/smartWatch'
import { headPhones } from '../data/headPhones'

const HomeScreen = () => {
  const [data, setData] = useState(smartWatch)
  const [selectedCategory, setSelectedCategory] = useState('Smart Watch');

  const handleUpdateCategory = (newCategory) => {   //here item.name === newCategory which is coming from statement:<TouchableOpacity onPress={() => handleUpdateCategory(item.name)}> in file Category.jsx
  
    console.log('newCategory: ----', newCategory);
    if (newCategory === 'Smart Watch') {
      // setSelectedCategory('Smart Watch');
      setData(smartWatch);
    }
    else if (newCategory === 'Head Phones') {
      // setSelectedCategory('Head Phones');
      setData(headPhones);
    }
    setSelectedCategory(newCategory);
  }

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <Text style={styles.headingText}>Find your suitable watch now.</Text>
            <View style={styles.mainInputContainer}>
              <View style={styles.inputWrapper}>
                {/* search logo */}
                <AntDesign name={'search1'} size={24} />
                {/* search/textinput field */}
                <TextInput
                  style={styles.textInput}
                  placeholder='Search Product'
                  placeholderTextColor={colors.placeHolderText}
                />
              </View>
              {/* category logo */}
              <View style={styles.categoryContainer}>
                <MaterialIcons name={'category'} size={24} />
              </View>
            </View>
            <Category
              selectedCategory={selectedCategory}      
              handleUpdateCategory={handleUpdateCategory}
            />
          </>
        }
        data={data}
        renderItem={({ item, index }) => {
          return (
            <ProductCard item={item} />
          )
        }}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
        contentContainerStyle={{
          paddingBottom: 500,
          padding: spacing.medium,
        }}
        showsVerticalScrollIndicator={false}
      />

    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    // flex: 1,   //did this so that component <ProductCard /> doesn't appear at the bottom left
    backgroundColor: colors.background,
  },
  headingText: {
    fontSize: fontSize.xXtraLarge,
    color: colors.black,
    fontFamily: fonts.Bold,
  },
  mainInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.xtraLarge,

  },
  inputWrapper: {
    flex: 1,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    color: colors.placeHolderText,
    borderRadius: 44,
    paddingHorizontal: spacing.medium,

  },
  textInput: {
    paddingBottom: 10,
    flex: 1,
    paddingHorizontal: spacing.medium,
    fontSize: fontSize.medium,
    fontFamily: fonts.Medium,

  },
  categoryContainer: {
    paddingHorizontal: spacing.small,

  },

})