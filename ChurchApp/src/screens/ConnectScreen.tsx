import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FONTS } from '../constants/fonts'
import { FONTsize, spacing } from '../constants/dimensions'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ConnectCard from '../components/ConnectCard'

const ConnectScreen = () => {
  const insets = useSafeAreaInsets();
  // const VERTICAL_PADDING = 10;


  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>

      <View style={styles.headingContainer}>
        <Text style={styles.headingStyle}>
          Connect
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollViewStyle}
      >
        {/* --- CARD 1 --- */}
        <ConnectCard
          imageSource={require('../../assets/member.jpg')}
          ONPRESS={() => null}
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
          ONPRESS={() => null}
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
          ONPRESS={() => null}
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
    backgroundColor: '#131314'
  },
  headingContainer: {
  },
  headingStyle: {
    fontSize: FONTsize.medium,
    fontFamily: FONTS.interSemiBold,
    textAlign: 'center',
    color: '#FFFFFF',
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
    color: '#FFFFFF',
    position: 'absolute', // Takes the element out of the normal layout flow
    bottom: 10,           // Positions it 20px from the bottom
    left: 10,             // Positions it 20px from the left

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