import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FONTS } from '../constants/fonts'
import { FONTsize, spacing } from '../constants/dimensions'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ConnectCard from '../components/ConnectCard'
import { useThemeStore } from '../themes/ThemeStore'
import { useNavigation, useTheme } from '@react-navigation/native'
import { CustomTheme } from '../themes/CustomTheme'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

//define the type for the stack navigator screens 
type ConnectScreenParamList = {
  ConnectScreen: undefined;  // No params expected for the main screen
  BecomeMemberScreen: undefined;  // No params expected for the main screen
  JoinSocialGroupScreen: undefined;  // No params expected for the main screen
  PrayerRequestScreen: undefined;

}

// Define the navigation prop type for this screen
type ConnectScreenNavigationProp = NativeStackNavigationProp<ConnectScreenParamList, 'ConnectScreen'>;

const ConnectScreen = () => {
  const insets = useSafeAreaInsets();
  // const VERTICAL_PADDING = 10;
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { colors } = useTheme() as CustomTheme;
  const navigation = useNavigation<ConnectScreenNavigationProp>();  //get the navigation object


  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.bkGroundClr }]}>

      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        translucent={true} //this hides the status bar in android 
        backgroundColor='transparent'
      />

      <View style={styles.headingContainer}>
        <Text style={[styles.headingStyle, { color: colors.textPrimary }]}>
          Connect
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollViewStyle}
      >
        {/* --- CARD 1 --- */}
        {/* don't use TouchableOpacity opacity here to navigate to BecomeMemberScreen, check RNjs doc for explanation */}
          <ConnectCard
            imageSource={require('../../assets/member.jpg')}
            ONPRESS={() => navigation.navigate('BecomeMemberScreen')}
          >
            <View style={styles.cardContentCenter}>
              <Text style={styles.titleBold}>
                BECOME A MEMBER
              </Text>
            </View>
          </ConnectCard>


        {/* --- CARD 2 --- */}
        <ConnectCard
          imageSource={require('../../assets/social.png')}
          ONPRESS={() => navigation.navigate('JoinSocialGroupScreen')}
        >
          <View style={styles.cardContentAbsolute}>
            <View style={styles.joinSocialViewContainer}>
              <Text style={styles.titleBold}>
                JOIN A SOCIAL GROUP
              </Text>
            </View>
            {/* This Text is positioned independently at the bottom-left */}
            <Text style={styles.subtitleLeft}>
              Discover People Like you
            </Text>

          </View>
        </ConnectCard>

        {/* --- CARD 3 --- */}
        <ConnectCard
          imageSource={require('../../assets/prayer.jpg')}
          ONPRESS={() => navigation.navigate('PrayerRequestScreen')}
        >
          <View style={styles.cardContentCenterWithSpace}>
            <Text style={styles.titleSahtiyaStyle}>
              PRAYER
            </Text>
            <Text style={styles.titleSahtiyaStyle}>
              REQUESTS
            </Text>
          </View>
        </ConnectCard>


      </ScrollView>
    </View >
  )
}

export default ConnectScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#131314'
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
  scrollViewStyle: {
    paddingBottom: 100,
    // gap:spacing.medium



  },
  cardContentCenter: {
    flex: 1,
    // width:'90%',
    justifyContent: 'center',
    alignItems: 'center',

  },
  titleBold: {
    fontSize: FONTsize.superXtraLg,
    fontFamily: FONTS.interBlack,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  cardContentSplit: {
    flex: 1,
    justifyContent: 'space-between',
    padding: spacing.medium,

  },
  subtitleLeft: {
    fontSize: FONTsize.medium,
    fontFamily: FONTS.interMedium,
    color: '#FFFFFF',  //don't use theme for this part as in the light theme the text is not visible
    position: 'absolute', // Takes the element out of the normal layout flow
    bottom: 10,           // Positions it 10px from the bottom
    left: 10,             // Positions it 10px from the left

  },
  discoverContainer: {
    // justifyContent:'flex-end',
    // paddingBottom:spacing.small,
    // paddingLeft:spacing.small,
    // marginBottom:10

  },
  discoverStyling: {
    fontSize: FONTsize.medium,
    fontFamily: FONTS.interMedium,
    color: '#FFFFFF',
    textAlign: 'left',
  },
  prayerRequestContainer: {
    justifyContent: 'space-between',
    flex: 1,
    textAlign: 'center',


  },
  cardContentCenterWithSpace: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  titleSahtiyaStyle: {
    fontSize: FONTsize.superXtraLg,
    fontFamily: FONTS.sahityaRegular,
    color: '#FFFFFF',
    textAlign: 'center',


  },
  cardContentAbsolute: {
    flex: 1,

  },
  joinSocialViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }

})