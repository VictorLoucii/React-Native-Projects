import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { FONTsize, spacing } from '../constants/dimensions'
import { FONTS } from '../constants/fonts'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation, useTheme } from '@react-navigation/native'
import { CustomTheme } from '../themes/CustomTheme'
import { useThemeStore } from '../themes/ThemeStore'

const MoreScreen = () => {

  const { isDarkMode, toggleTheme } = useThemeStore();
  const { colors } = useTheme() as CustomTheme;
  const navigation = useNavigation()

  const insets = useSafeAreaInsets();

  // const goToPrevScreen = () => {
  //   navigation.goBack();
  // }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.settingsBGC }]}
      contentContainerStyle={[styles.contentContainer, {
        paddingBottom: insets.bottom + spacing.large,
        paddingTop: insets.top
      }]}
      showsVerticalScrollIndicator={false}
    >

      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        translucent={true} //this hides the status bar in android 
        backgroundColor='transparent'
      />

      {/* search for : //remove back button from MoreScreen.tsx (ChurchApp) in RNjs doc to know why i have commented out the below section */}
      {/* <TouchableOpacity 
        style={[styles.backButtonTouchable, { top: insets.top }]}
        onPress={()=>goToPrevScreen()}
      >
        <Ionicons
          name={'return-up-back'}
          size={30}
          style={[styles.backButtonStyling, { color: colors.icon }]} //  We use the top inset to position it safely below the status bar. The `top` value is now set dynamically in the component
        />
      </TouchableOpacity> */}

      <View style={styles.userImageContainer}>
        {/* default icon when no user image is given */}
        {/* <FontAwesome
          name={'user'}
          style={styles.userImageDefault}
          size={100}
        /> */}

        <Image
          source={require('../../assets/userImage.png')}
          style={styles.userImage}
        />
      </View>
      <Text style={[styles.name, { color: colors.textPrimary }]}>
        XABI
      </Text>
      <Text style={[styles.email, { color: colors.textPrimary }]}>
        uknown@gmail.com
      </Text>
      <TouchableOpacity style={styles.editContainer}>
        <Text style={[styles.editText, { color: colors.textPrimary }]}>
          Edit Profile
        </Text>
      </TouchableOpacity>


      <View style={[styles.optionsContainer, { backgroundColor: colors.settingOptionsBGC }]}>
        <Text style={styles.optionsText}>OPTIONS</Text>

        <View style={styles.notificationContainer}>
          <View style={styles.notificationIconAndTextContainer}>
            <View style={styles.notificationIconContainer}>
              <Ionicons
                name={'notifications-circle-outline'}
                size={26}
                style={styles.notificationIcon}
              />
            </View>
            <Text style={styles.notificationText}>
              Notifications
            </Text>
          </View>
          <TouchableOpacity>
            <FontAwesome
              name={'toggle-on'}
              size={40}
              style={styles.toggleStyle}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.modeContainer}>
          <View style={styles.modeIconAndTextContainer}>
            <View style={styles.modeIconContainer}>
              <MaterialIcons
                name={'dark-mode'}
                size={24}
                style={styles.modeIcon}
              />
            </View>
            <Text style={styles.modeText}>
              Dark Mode
            </Text>
          </View>
          <TouchableOpacity onPress={() => toggleTheme()}>
            <FontAwesome
              name={isDarkMode ? 'toggle-on' : 'toggle-off'}
              size={40}
              style={styles.toggleStyle}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.optionsText}>SUPPORT</Text>

        <View style={styles.faqContainer}>
          <View style={styles.faqIconContainer}>
            <Ionicons
              name={'document-text'}
              size={24}
              style={styles.faqIcon}
            />

          </View>
          <Text style={styles.faqText}>FAQ</Text>
        </View>

        <View style={styles.helpContainer}>
          <View style={styles.helpIconContainer}>
            <SimpleLineIcons
              name={'earphones-alt'}
              size={24}
              style={styles.helpIcon}
            />
          </View>
          <Text style={styles.helpText}>
            Help
          </Text>
        </View>


        {/* Divider Line */}
        <View style={styles.dividerLine} />

        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logOutIconAndText}>
            <View style={styles.logoutIconContainer}>
              <Entypo
                name={'log-out'}
                size={24}
                style={styles.logoutICon}
              />
            </View>
            <Text style={styles.logoutText}>
              Logout
            </Text>

          </TouchableOpacity>
        </View>

      </View>
      {/* optionsContainer view ends here */}



    </ScrollView>
  )
}

export default MoreScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#131314',  //use cutom theme
    // alignItems: 'center',
    // paddingHorizontal:spacing.medium
  },
  contentContainer: {
    alignItems: 'center', // Center all the content horizontally
    paddingBottom: 100,    // This creates the space at the very bottom!
  },

  userImageContainer: {
    marginTop: spacing.biggerMedium,
    // flexDirection: 'row',
    alignItems: 'center',
    // height: 156,
    // width: 148,
    // justifyContent: 'center',
  },
  userImageDefault: {
    // flex:1,
    color: '#FFFFFF',
    height: 150,
    // width: 148,

  },
  userImage: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    width: 150,
    borderRadius: 75,

  },
  name: {
    marginTop: 10,
    fontSize: FONTsize.large,
    fontFamily: FONTS.robotoSlabBold,
    // color: '#FFFFFF',
    // textAlign:'center',
  },
  email: {

    fontSize: FONTsize.medium,
    fontFamily: FONTS.robotoRegular,
    // color: '#FFFFFF',
    // textAlign:'center',
  },
  editContainer: {
    marginTop: 10,
    width: '40%',
    backgroundColor: '#214F0F',
    borderRadius: 25,
    paddingVertical: 6,
  },
  editText: {
    fontSize: FONTsize.medium,
    fontFamily: FONTS.robotoLight,
    // color: '#FFFFFF',
    textAlign: 'center',
  },
  optionsContainer: {
    marginTop: spacing.bigerLarge,
    // height: 387,  // REMOVED: This allows the container to grow with its content
    width: '85%',
    // backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingBottom: spacing.medium,

    marginBottom: spacing.xtraLarge,

  },
  optionsText: {
    color: '#214F0F',
    fontSize: FONTsize.medium,
    fontFamily: FONTS.robotoSemiBold,
    paddingLeft: spacing.xtraLarge,
    paddingTop: spacing.medium,
  },
  notificationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xtraLarge,
    paddingTop: spacing.medium,
    alignItems: 'center',   //This vertically aligns the icon/text with the toggle switch.


  },
  notificationIconAndTextContainer: {
    flexDirection: 'row',
    alignItems: 'center', //center the icon box with bg 'gray' color and text vertically. note this will not center the vector icon
    // gap:spacing.small,
    gap: spacing.medium,
    // paddingHorizontal: spacing.medium  //REMOVED: Parent container now handles horizontal padding

  },
  notificationIconContainer: {
    justifyContent: 'center',  //this will center the vector icon vertically in the gray box
    alignItems: 'center', //this will center the vector icon horizontally
    backgroundColor: '#F5F6FA',
    borderRadius: 10,
    height: 36,
    width: 36,
  },
  notificationIcon: {
  },
  notificationText: {
    color: '#000000',
    fontFamily: FONTS.robotoMedium,
    fontSize: FONTsize.medium,
  },
  toggleStyle: {
    color: '#214F0F'
  },
  modeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xtraLarge,
    paddingTop: spacing.medium,
    alignItems: 'center', // ADDED: This vertically aligns the icon/text with the toggle switch.

  },
  modeIconAndTextContainer: {
    flexDirection: 'row',
    gap: spacing.medium,
    alignItems: 'center',
    // paddingHorizontal:spacing.medium //REMOVED: Parent container now handles horizontal padding

  },
  modeIconContainer: {
    justifyContent: 'center',  //this will center the vector icon vertically in the gray box
    alignItems: 'center', //this will center the vector icon horizontally
    backgroundColor: '#F5F6FA',
    borderRadius: 10,
    height: 36,
    width: 36,

  },
  modeIcon: {
    // paddingLeft: spacing.medium

  },
  modeText: {
    color: '#000000',
    fontFamily: FONTS.robotoMedium,
    fontSize: FONTsize.medium,
  },
  faqContainer: {
    flexDirection: 'row',
    alignItems: 'center',//Align the icon box and the text vertically in the center, this will not align the vector icon
    gap: spacing.medium,
    paddingHorizontal: spacing.xtraLarge,
    paddingTop: spacing.medium,
  },
  faqIconContainer: {
    height: 36,
    width: 36,
    backgroundColor: '#F5F6FA',
    borderRadius: 10,
    // These styles center the icon *inside* this gray box.
    justifyContent: 'center',
    alignItems: 'center',

  },
  faqIcon: {
    // justifyContent:'center',
    // alignItems:'center',

  },
  faqText: {
    color: '#000000',
    fontFamily: FONTS.robotoMedium,
    fontSize: FONTsize.medium,

  },
  helpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xtraLarge,
    gap: spacing.medium,
    paddingTop: spacing.medium,
  },
  helpIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F6FA',
    borderRadius: 10,
    height: 36,
    width: 36,
  },
  helpIcon: {
    color: '#000000',

  },
  helpText: {
    color: '#000000',
    fontFamily: FONTS.robotoMedium,
    fontSize: FONTsize.medium,

  },
  dividerLine: {
    height: 1,
    backgroundColor: '#BDC1C6',
    marginTop: spacing.large,
    marginHorizontal: spacing.xtraLarge, // Aligns the line's ends with the content padding, this will also shorten the line's length and bring it to the center

  },
  logoutContainer: {
    paddingHorizontal: spacing.xtraLarge,  // Aligns with FAQ/Help
    paddingTop: spacing.medium, // Space between divider and this button

  },
  logOutIconAndText: {
    flexDirection: 'row',
    gap: spacing.medium,
    alignItems: 'center',
    // justifyContent:'flex-start'
  },
  logoutIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F6FA',
    borderRadius: 10,
    height: 36,
    width: 36,

  },
  logoutICon: {

  },
  logoutText: {
    color: '#000000',
    fontFamily: FONTS.robotoMedium,
    fontSize: FONTsize.medium,

  }

})