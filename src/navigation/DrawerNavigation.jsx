//@ts-check
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import StackNavigation from './StackNavigation';
import { colors } from '../constants/colors'; // Importing color constants
import { fontFamilies } from '../constants/fonts'; // Importing font constants (though not used yet)
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator(); // Creating a drawer navigator instance

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator 
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        // defaultStatus='open'  //by default drawer stays open, this is essential when editing drawer items
        screenOptions={{
            // overlayColor: 'transparent',
            swipeEdgeWidth: 0,
            headerShown: false,
            headerTintColor: colors.iconPrimary,  // Sets the color of the hamburger icon (drawer toggle button)
            // headerStyle: {
            //     // backgroundColor: colors.textPrimary, // Sets the background color of the header
            // },
            drawerLabelStyle:{
                color: colors.textPrimary, // Sets the color of the text inside the drawer menu
            },
            drawerStyle: {
                backgroundColor: colors.background, // Sets the background color of the drawer
                width: 240, // Sets the width of the drawer menu
            },
            drawerType: 'slide',
        }} //screenOptions ends here
    >
        {/* Adding a screen inside the drawer with StackNavigation */}
        <Drawer.Screen name="Drawer_Home" component={StackNavigation} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigation; // Exporting the DrawerNavigation component for use in other parts of the app

const styles = StyleSheet.create({
    container: {
        // Currently empty, can be used for future styling if needed
    }
});
