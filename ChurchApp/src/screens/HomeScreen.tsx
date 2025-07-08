import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import HomeScreenHeader from '../components/HomeScreenHeader'
import HomeScreenBody from '../components/HomeScreenBody'
import HomeScreenFooter from '../components/HomeScreenFooter'
import { useThemeStore } from '../themes/ThemeStore'
import { useTheme } from '@react-navigation/native'
import { CustomColors } from '../themes/CustomTheme'

const HomeScreen = () => {
    const { isDarkMode, toggleTheme } = useThemeStore();
    const { colors } = useTheme() as CustomColors;

    return (
        <View style={[styles.container, { backgroundColor: colors.bkGroundClr }]}>
            <ScrollView showsVerticalScrollIndicator={false} >
                <HomeScreenHeader />
                <HomeScreenBody />
            </ScrollView>
            {/* <HomeScreenFooter />  we don't need this anymore in the HomeScreen since we are using this component in BottomTabNavigator*/}
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#131314',
        flex: 1,

    },
})