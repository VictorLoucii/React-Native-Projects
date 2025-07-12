import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useThemeStore } from '../themes/ThemeStore';
import { useNavigation, useTheme } from '@react-navigation/native';
import { CustomTheme } from '../themes/CustomTheme';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { FONTsize, spacing } from '../constants/dimensions';
import { FONTS } from '../constants/fonts';
import MediaCard from '../components/MediaCard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const SermonsScreen = () => {
  // console.log('succesfully navigated to SermonsScreen')
  const insets = useSafeAreaInsets();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { colors } = useTheme() as CustomTheme;
  const navigation = useNavigation();


  return (
    <View style={[styles.container, { backgroundColor: colors.bkGroundClr, paddingTop: insets.top, paddingBottom: insets.bottom }]}>

      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        translucent={true} //this hides the status bar in android 
        backgroundColor='transparent'
      />

      <TouchableOpacity
        style={[styles.backButtonTouchable, { top: insets.top }]}
        onPress={() => navigation.goBack()}
      >
        <Ionicons
          name={'return-up-back'}
          size={30}
          style={[styles.backButtonStyling, { color: colors.icon }]} //  We use the top inset to position it safely below the status bar. The `top` value is now set dynamically in the component
        />
      </TouchableOpacity>

      <View style={styles.headingContainer}>
        <Text style={[styles.headingStyle, { color: colors.textPrimary }]}>
          Sermons
        </Text>
      </View>

      {/* Divider Line */}
      <View style={styles.dividerLine} />

      <ScrollView contentContainerStyle={{
        paddingBottom:150,
      }}
      >


        <View style={styles.allMediaCards}>

          <MediaCard
            imageSource={require('../../assets/sermon.jpg')}
            ONPRESS={() => navigation.navigate('VideoPlayerScreen')}
          >
            <Text style={[styles.titleBold, { color: colors.MediaImageIconTextBGC }]}>
              Trusting the Word Of God
            </Text>

            <Text style={[styles.subheading, { color: colors.MediaImageIconTextBGC }]}>
              Pst John Doe
            </Text>
            <Text style={[styles.date, { color: colors.MediaImageIconTextBGC }]}>
              12-09-2023
            </Text>

            <MaterialIcons
              name={'play-circle-outline'}
              size={30}
              color={colors.MediaImageIconTextBGC}
              style={styles.playIcon}
            />
            <Text style={[styles.watchHere, { color: colors.MediaImageIconTextBGC }]}>
              Watch here
            </Text>

          </MediaCard>


          <MediaCard
            imageSource={require('../../assets/gospelMusic1.jpg')}
            ONPRESS={() => null}
          >
            <Text style={[styles.titleBold, { color: colors.MediaImageIconTextBGC }]}>
              Alawys Living By Faith
            </Text>

            <Text style={[styles.subheading, { color: colors.MediaImageIconTextBGC }]}>
              Pst Jane Roger
            </Text>
            <Text style={[styles.date, { color: colors.MediaImageIconTextBGC }]}>
              10-01-2023
            </Text>

            <MaterialIcons
              name={'play-circle-outline'}
              size={30}
              color={colors.MediaImageIconTextBGC}
              style={styles.playIcon}
            />
            <Text style={[styles.watchHere, { color: colors.MediaImageIconTextBGC }]}>
              Watch here
            </Text>

          </MediaCard>


          <MediaCard
            imageSource={require('../../assets/gospelMusic2.jpg')}
            ONPRESS={() => null}
          >
            <Text style={[styles.titleBold, { color: colors.MediaImageIconTextBGC }]}>
              Knowing God
            </Text>

            <Text style={[styles.subheading, { color: colors.MediaImageIconTextBGC }]}>
              Pst Jeffery Epstein
            </Text>
            <Text style={[styles.date, { color: colors.MediaImageIconTextBGC }]}>
              09-04-2023
            </Text>

            <MaterialIcons
              name={'play-circle-outline'}
              size={30}
              color={colors.MediaImageIconTextBGC}
              style={styles.playIcon}
            />
            <Text style={[styles.watchHere, { color: colors.MediaImageIconTextBGC }]}>
              Watch here
            </Text>

          </MediaCard>



        </View>
      </ScrollView>


    </View >
  )
}

export default SermonsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  backButtonTouchable: {
    zIndex: 1,  // Ensures the back button is on top of other content
    // top:47,  // The `top` value is now set dynamically in the component
    position: 'absolute',
    left: 24,
  },
  backButtonStyling: {
    // color: '#FFFFFF',
  },
  headingContainer: {

  },
  headingStyle: {
    fontSize: FONTsize.medium,
    fontFamily: FONTS.interSemiBold,
    textAlign: 'center',
    // color: '#FFFFFF',
    paddingVertical: spacing.small,
    // marginTop:10,
  },
  dividerLine: {
    height: 1,
    backgroundColor: '#BDC1C6',
    marginBottom: spacing.bigerLarge,
  },
  allMediaCards: {
    paddingHorizontal: spacing.biggerMedium,
    gap: spacing.biggerMedium,
  },
  titleBold: {
    fontSize: FONTsize.large,
    fontFamily: FONTS.interSemiBold,
    paddingTop: spacing.small,
    paddingLeft: spacing.medium

  },
  subheading: {
    fontSize: FONTsize.biggerMedium,
    fontFamily: FONTS.interRegular,
    paddingLeft: spacing.medium,
    // paddingTop: spacing.medium,


  },
  date: {
    fontSize: FONTsize.medium,
    fontFamily: FONTS.interLightItalic,
    paddingLeft: spacing.medium,

  },
  playIcon: {
    paddingLeft: spacing.medium,
    paddingTop: spacing.xtraLarge
  },
  watchHere: {
    fontSize: FONTsize.small,
    fontFamily: FONTS.robotoRegular,
    paddingLeft: spacing.medium,
    paddingTop: spacing.xtraSmall,


  },
})