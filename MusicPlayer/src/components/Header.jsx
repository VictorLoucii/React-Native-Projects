import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

import { iconSizes } from '../constants/dimensions';
import { spacing } from '../constants/dimensions';
//icons:
import AntDesign from 'react-native-vector-icons/AntDesign'

//lines
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import DrawerNavigation from '../navigation/DrawerNavigation';

import { useNavigation, useTheme } from '@react-navigation/native';
const Header = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const toggleDrawer = (() => {
    navigation.toggleDrawer();
  })
  return (
      <View style = { styles.header }>
        <TouchableOpacity onPress={toggleDrawer}>
          <FontAwesome6
            name={'grip-lines'}
            color={colors.iconPrimary}
            size={iconSizes.large}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign
            name={'search1'}
            color={colors.iconPrimary}
            size={iconSizes.medium}
          />
        </TouchableOpacity>
      </View>
  )
}

export default Header

const styles = StyleSheet.create({
    header:{
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: spacing.small,
        paddingHorizontal: spacing.large,
      }
})