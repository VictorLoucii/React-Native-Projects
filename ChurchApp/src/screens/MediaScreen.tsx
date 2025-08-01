import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useThemeStore } from '../themes/ThemeStore';
import { useNavigation, useTheme } from '@react-navigation/native';
import { CustomTheme } from '../themes/CustomTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FONTsize, spacing } from '../constants/dimensions';
import { FONTS } from '../constants/fonts';
import MediaCard from '../components/MediaCard';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MediaStackNavigationProp } from '../navigation/navigationTypes';




const MediaScreen = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { colors } = useTheme() as CustomTheme;
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<MediaStackNavigationProp>(); //get the navigation object

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.mediaBGC, paddingTop: insets.top, paddingBottom: insets.bottom }]}
    >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        translucent={true} //this hides the status bar in android 
        backgroundColor='transparent'
      />

      <View style={styles.headingContainer}>
        <Text style={[styles.headingStyle, { color: colors.textPrimary }]}>
          Media
        </Text>
      </View>

      {/* Divider Line */}
      <View style={styles.dividerLine} />

      <View style={styles.mainImageContainer}>

        <Image
          // ONPRESS={() => null}
          source={require('../../assets/sermon.jpg')}
          style={styles.mainImage}
        // children={null}
        />
      </View>

      <View style={[styles.allMediaList]}>

        <TouchableOpacity
          style={[styles.imageTextAndIcon, { backgroundColor: colors.MediaImageIconTextBGC }]}
          onPress={() => navigation.navigate('VideoListScreen', {
            title: 'Sermons',
            tableName: 'sermon'
          })}
        >
          <View style={styles.imageAndText}>
            <Image
              source={require('../../assets/readingBible.png')}
              style={styles.miniImages}
            />
            <Text style={styles.textStyle}>
              Sermons
            </Text>
          </View>
          <AntDesign
            name={'right'}
            size={27}
          />

        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.imageTextAndIcon, { backgroundColor: colors.MediaImageIconTextBGC }]}
          onPress={() => navigation.navigate('VideoListScreen', {
            title: 'Gospel Songs',
            tableName: 'gospel_songs'
          })}
        >
          <View style={styles.imageAndText}>
            <Image
              source={require('../../assets/gospelSong.jpg')}
              style={styles.miniImages}
            />
            <Text style={styles.textStyle}>
              Gospel Songs
            </Text>
          </View>
          <AntDesign
            name={'right'}
            size={27}
          />

        </TouchableOpacity>

        <View style={[styles.imageTextAndIcon, { backgroundColor: colors.MediaImageIconTextBGC }]}>
          <View style={styles.imageAndText}>
            <Image
              source={require('../../assets/bible.png')}
              style={styles.miniImages}
            />
            <Text style={styles.textStyle}>
              Bible Study
            </Text>
          </View>
          <AntDesign
            name={'right'}
            size={27}
          />

        </View>


      </View>


    </ScrollView>
  )
}

export default MediaScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.medium,
    // gap: spacing.medium  //gap doesn't work on scroll lock

  },
  headingContainer: {
    paddingVertical: spacing.small,

  },
  headingStyle: {
    fontSize: FONTsize.medium,
    fontFamily: FONTS.interSemiBold,
    textAlign: 'center',

  },
  dividerLine: {
    height: 1,
    backgroundColor: '#BDC1C6',
    marginBottom: spacing.bigerLarge,
  },
  allMediaList: {
    height: 450,
    marginTop: spacing.bigerLarge,
    gap: spacing.biggerMedium,
    paddingBottom: spacing.bigerLarge,


  },
  imageTextAndIcon: {
    justifyContent: 'space-between',
    paddingRight: spacing.small,
    // marginTop: spacing.bigerLarge,
    flexDirection: 'row',
    borderRadius: 16,  //same like MediaCard 
    alignItems: 'center',

  },
  imageAndText: {
    flexDirection: 'row',
    gap: spacing.medium,
    alignItems: 'center',
    flex: 1,
  },
  miniImages: {
    height: 78,
    // width: '45%',  //don't do this as here width will depend on the width of the parent i.e image and text, and suppose if text is a short word then the images will be uneven(check RNjs doc search for "problem in putting width: '45%' in miniImages ")
    width: 137,
    borderRadius: 16,  //same like MediaCard 

  },
  textStyle: {
    fontSize: FONTsize.biggerMedium,
    fontFamily: FONTS.interMedium,
    color: "#000000", //black
    flexShrink: 1,  //// Allow text to wrap if it's too long

  },
  mainImageContainer: {
    height: 210,
    width: '100%',
    borderRadius: 16,     // Apply the border radius to the container
    overflow: 'hidden',   // This is the magic that clips the corners
  },
  mainImage: {
    height: '100%',       // Make the image fill the container
    width: '100%',
    resizeMode: 'cover', // 'cover' usually looks better than 'contain' for this
  },
})