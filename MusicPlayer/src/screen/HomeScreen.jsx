// @ts-check    //this is type script checking
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { fontSize, iconSizes } from '../constants/dimensions';
import { spacing } from '../constants/dimensions';
import Header from '../components/Header';
import { fontFamilies } from '../constants/fonts';
import SongCard from '../components/SongCard';
import SongCardWithCategory from '../components/SongCardWithCategory';
import FloatingPlayer from '../components/FloatingPlayer';
import { songsWithCategory } from '../data/songsWithCategory';
import { useTheme } from '@react-navigation/native';


const HomeScreen = () => {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Header />
      <FlatList 
      data={songsWithCategory}
      renderItem={({item}) => <SongCardWithCategory item = {item} />}
      contentContainerStyle={{
        paddingBottom: 400,
      }}
      />
      <FloatingPlayer />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },


})