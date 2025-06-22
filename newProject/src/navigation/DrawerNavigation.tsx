import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import StackNavigation from './StackNavigation';
import CustomDrawerContent from './CustomDrawerContent';



const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
        screenOptions={{
            headerShown:false,
            drawerType:'slide',
            swipeEdgeWidth:0,
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />

        }
        
    >
        <Drawer.Screen name='HomeScreen_Drawer' component={StackNavigation}/>

    </Drawer.Navigator>

  )
}

export default DrawerNavigation

const styles = StyleSheet.create({})