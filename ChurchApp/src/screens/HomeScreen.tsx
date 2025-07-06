import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import HomeScreenHeader from '../components/HomeScreenHeader'
import HomeScreenBody from '../components/HomeScreenBody'
import HomeScreenFooter from '../components/HomeScreenFooter'

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} >
           <HomeScreenHeader />
           <HomeScreenBody />
           <HomeScreenFooter />


            </ScrollView>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000000',
        flex: 1,

    },
})