import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const MyTextInputs = ({...props}) => {
  return (
    <View style = {styles.container}>
      <TextInput 
        style = {styles.textInput}
        {...props}
      />
      <View 
        style ={styles.underline}
      />
    </View>
  )
}

export default MyTextInputs

const styles = StyleSheet.create({
    container:{
        height: 50,
        width: '100%',
        justifyContent:'center',
        paddingHorizontal:10,
        marginBottom:20,

    },
    textInput:{
        width: '100%',
        height: 50,
    },
    underline:{
        borderBottomWidth:1,
        borderColor: 'gray',
        height:1,
    }
})