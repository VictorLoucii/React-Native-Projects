import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FONTsize, spacing } from '../constants/dimensions'
import { FONTS } from '../constants/fonts'
import Featured from './Featured'
import UpComingEvents from './UpComingEvents'

const HomeScreenBody = () => {
    return (
        <View>
            <Featured />
            <UpComingEvents />
        </View>

    )
}

export default HomeScreenBody

const styles = StyleSheet.create({

})