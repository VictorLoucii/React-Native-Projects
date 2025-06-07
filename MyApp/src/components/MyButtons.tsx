import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'

interface Props {
    title: string
}

const MyButtons : FC<Props> = ({title, onPress}) => {
  return (
    <TouchableOpacity  
        style = {styles.container}
        onPress={onPress}
    >
        <Text style = {styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

export default MyButtons

const styles = StyleSheet.create({
    container:{
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff0036',
        borderRadius: 30,
    },
    title:{
        color: 'white',
        fontSize: 20,
        fontFamily: 'Redressed-Regular',

    }
})