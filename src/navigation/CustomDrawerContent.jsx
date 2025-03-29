//@ts-check
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
//constants:
import { fontSize, iconSizes, spacing } from '../constants/dimensions';
import { fontFamilies } from '../constants/fonts';
//icons:
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';
import { useThemeStore } from '../store/themeStore';

const CustomDrawerContent = (props) => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  
  const { colors } = useTheme();

  // const isDarkMode = false;
  const toggleDrawer = () => {
    props.navigation.toggleDrawer();
    console.log('isDarkMode:------', isDarkMode);

  }
  return (
    <DrawerContentScrollView style={[styles.container, {backgroundColor: colors.background,}]}>
      <View style={styles.headerIconContainer}>
        <TouchableOpacity onPress={toggleDrawer}>
          <AntDesign
            name={'close'}
            size={iconSizes.large}
            color={colors.iconPrimary}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleTheme()}>
          <Octicons
            name={isDarkMode ? 'moon' : 'sun'}
            size={iconSizes.large}
            color={colors.iconPrimary}
          />
        </TouchableOpacity>
      </View>
      {/* drawer menu items */}
      <View style={styles.drawerItemContainer}>
        <DrawerItem
          label={'Profile'}
          icon={() => (
            <FontAwesome
              name={'user'}
              size={iconSizes.medium}
              color={colors.iconSecondary}
            />
          )}
          labelStyle={[styles.labelStyle, {color: colors.textSecondary,}]}
          style={styles.drawerItem}
          onPress={() => null}
        />
        <DrawerItem
          label={'Home'}
          icon={() => (
            <AntDesign
              name={'home'}
              size={iconSizes.medium}
              color={colors.iconSecondary}
            />
          )}
          labelStyle={[styles.labelStyle, {color: colors.textSecondary,}]}
          style={styles.drawerItem}
          onPress={() => {
            props.navigation.navigate('Drawer_Home', { screen: 'Home' });
          }}
        />
        <DrawerItem
          label={'Liked Songs'}
          icon={() => (
            <AntDesign
              name={'hearto'}
              size={iconSizes.medium}
              color={colors.iconSecondary}
            />
          )}
          labelStyle={[styles.labelStyle, {color: colors.textSecondary,}]}
          style={styles.drawerItem}
          onPress={() => {
            props.navigation.navigate('Drawer_Home', { screen: 'Like_Screen' });
          }}
        />
        <DrawerItem
          label={'Language'}
          icon={() => (
            <FontAwesome
              name={'language'}
              size={iconSizes.medium}
              color={colors.iconSecondary}
            />
          )}
          labelStyle={[styles.labelStyle, {color: colors.textSecondary,}]}
          style={styles.drawerItem}
          onPress={() => {
            props.navigation.navigate('Drawer_Home', { screen: 'Like_Screen' });
          }}
        />
        <DrawerItem
          label={'Contact Us'}
          icon={() => (
            <FontAwesome
              name={'envelope-o'}
              size={iconSizes.medium}
              color={colors.iconSecondary}
            />
          )}
          labelStyle={[styles.labelStyle, {color: colors.textSecondary,}]}
          style={styles.drawerItem}
          onPress={() => {
            props.navigation.navigate('Drawer_Home', { screen: 'Like_Screen' });
          }}
        />
        <DrawerItem
          label={'FAQs'}
          icon={() => (
            <FontAwesome
              name={'question-circle-o'}
              size={iconSizes.medium}
              color={colors.iconSecondary}
            />
          )}
          labelStyle={[styles.labelStyle, {color: colors.textSecondary,}]}
          style={styles.drawerItem}
          onPress={() => {
            props.navigation.navigate('Drawer_Home', { screen: 'Like_Screen' });
          }}
        />
        <DrawerItem
          label={'Settings'}
          icon={() => (
            <FontAwesome
              name={'cog'}
              size={iconSizes.medium}
              color={colors.iconSecondary}
            />
          )}
          labelStyle={[styles.labelStyle, {color: colors.textSecondary,}]}
          style={styles.drawerItem}
          onPress={() => {
            props.navigation.navigate('Drawer_Home', { screen: 'Like_Screen' });
          }}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: colors.background,
    padding: spacing.large,
  },
  headerIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  drawerItemContainer: {
    marginVertical: spacing.large,
    marginLeft: -35,
  },
  labelStyle: {
    fontSize: fontSize.large,
    fontFamily: fontFamilies.medium,
    // color: colors.textSecondary,
  },
  drawerItem: {
    marginVertical: spacing.small,
    // marginLeft: -40,
  },
});
