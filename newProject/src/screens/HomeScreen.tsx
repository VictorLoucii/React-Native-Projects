import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
// import { colors } from '../constants/colors'  comment this since, at the final stages we will be using theme

import { FONTsize, iconSizes, spacing } from '../constants/dimensions';
//vector icons:
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Header from '../components/Header';
import { fonts } from '../constants/fonts';
import SongCard from '../components/SongCard';
import SongCardWithCategory from '../components/SongCardWithCategory';
import FloatingPlayer from '../components/FloatingPlayer';
import { SongsList } from '../data/SongsList';
import { useTheme } from '@react-navigation/native';
import { CustomTheme } from '../theme/CustomTheme';


const HomeScreen = () => {

  const { colors } = useTheme() as CustomTheme;  //note that this colors object is coming from the files DarkMode/LightMode in theme folder not from the colors.js file in the constants folder


  return (
    <SafeAreaView style={[styles.safeArea, {backgroundColor: colors.bkGroundClr}]}>

      <View style={styles.container}>
        <Header />
        <FlatList
          //importing songs from SongsList.js file:
          data={SongsList}
          //rendering SongCardWithCategory.tsx component:
          renderItem={({ item }) => <SongCardWithCategory title={item.title} songs={item.songs} />}
          contentContainerStyle={{
            paddingBottom: 200,

          }}
          showsVerticalScrollIndicator={false}
        />
        <FloatingPlayer />
      </View>
    </SafeAreaView>

  )
}

export default HomeScreen

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: colors.bkGroundClr,  //comment this since we are using theme at the final stages of the app

  },
  container: {
    flex: 1,
  },


})