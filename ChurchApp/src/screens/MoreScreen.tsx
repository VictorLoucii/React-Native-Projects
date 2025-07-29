import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Modal, Touchable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { FONTsize, spacing } from '../constants/dimensions'
import { FONTS } from '../constants/fonts'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { useFocusEffect, useNavigation, useTheme } from '@react-navigation/native'
import { CustomTheme } from '../themes/CustomTheme'
import { useThemeStore } from '../themes/ThemeStore'
// --- IMPORT THE TYPE  from navigationTypes.ts---
import { MoreStackNavigationProp } from '../navigation/navigationTypes';
import { useProfileStore } from '../ZustandStore/ProfileStore'; // Import ProfileStore to access our global state
import { supabase } from '../../supabase'
import { Alert } from 'react-native'
import { ProgressBar } from '@react-native-community/progress-bar-android';
import { useNotificationStore } from '../ZustandStore/NotificationStore';


import { useUpdateChecker } from '../hooks/useUpdateChecker';

const MoreScreen = () => {

  const { isDarkMode, toggleTheme } = useThemeStore();
  const { colors } = useTheme() as CustomTheme;
  const navigation = useNavigation<MoreStackNavigationProp>()
  const insets = useSafeAreaInsets();
  // Access the profile store ---
  const { profile, loading } = useProfileStore();

  //use the update checker hook:
  const {
    isUpdateAvailable,
    isDownloading,
    downloadProgress,
    latestVersionInfo,
    checkForUpdates,
    startUpdate,
  } = useUpdateChecker();

  const [isModalVisible, setModalVisible] = useState(false);
  const { isNotificationsEnabled, toggleNotifications } = useNotificationStore();



  // Only run the automatic check if notifications are actually enabled.
  useEffect(() => {
    if (isNotificationsEnabled) {
      checkForUpdates();
    }
  }, [isNotificationsEnabled]);


  const handleUpdatePress = () => {
    // First, check if the user has updates disabled
    if (!isNotificationsEnabled) {
      Alert.alert(
        "Updates Disabled",
        "Please enable notifications to check for app updates."
      );
      return; // Stop here
    }


    // If an update is ready, show the details modal.
    if (isUpdateAvailable) {
      setModalVisible(true);
    } else {
      // If no update, just tell the user they are up to date.
      Alert.alert("No Updates", "You are running the latest version of the app.");
      // You could also re-run the check here if you want:
      // checkForUpdates(); 
    }
  };

  //supabase singout function:
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert("Logout Error", error.message);
    }
    // If logout is successful, you don't need to do anything else.
    // The onAuthStateChange listener in App.tsx will automatically
    // navigate the user back to the AuthScreen.
  };

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
        barStyle={(isDarkMode ? 'light-content' : 'dark-content')}
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

      {/* Show a loading spinner while the profile is being fetched initially */}
      {loading && <ActivityIndicator style={{ marginTop: 40, marginBottom: 40 }} size="large" color={colors.textPrimary} />}

      {/* --- TEMPORARY CODE FOR TESTING --- */}
      {/* This block now shows the profile section as long as loading is done, */}
      {/* allowing access to the "Edit Profile" button even when not logged in. */}
      {!loading && (
        <>
          <TouchableOpacity
            style={styles.userImageContainer}
            onPress={() => navigation.navigate('EditProfileScreen')}
          >
            <Image
              // Safely access avatar_url with optional chaining (?.)
              source={profile?.avatar_url ? { uri: profile.avatar_url } : require('../../assets/userImage.png')}
              style={styles.userImage}
            />
          </TouchableOpacity>

          <Text style={[styles.name, { color: colors.textPrimary }]}>
            {/* Safely access username with a fallback */}
            {profile?.username || 'Set Your Name'}
          </Text>

          <Text style={[styles.email, { color: colors.textPrimary }]}>
            {/* Safely access email with a fallback */}
            {profile?.email || 'No email found in the database'}
          </Text>

          <Text style={[styles.email, { color: colors.textPrimary }]}>
            {/* Safely access email with a fallback */}
            {profile?.phone_number || 'No phone number found in the database'}
          </Text>

          <TouchableOpacity
            style={styles.editContainer}
            onPress={() => navigation.navigate('EditProfileScreen')}
          >
            <Text style={[styles.editText, { color: colors.textPrimary }]}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        </>
      )}
      {/* --- END OF TEMPORARY CODE --- */}



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
          {/* USE THE NOTIFICATION STORE'S ACTION to toggle notification  */}
          <TouchableOpacity
            onPress={toggleNotifications}  // Use the action from the store
          >
            <FontAwesome
              name={isNotificationsEnabled ? 'toggle-on' : 'toggle-off'}
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
        {/* UPDATE CHECKER BUTTON */}
        <TouchableOpacity style={styles.updateButtonContainer} onPress={handleUpdatePress}>
          <View style={styles.updateIconAndTextContainer}>
            <View style={styles.updateIconContainer}>
              <MaterialIcons
                name={'system-update-alt'}
                size={24}
                style={[styles.updateIcon, isUpdateAvailable && { color: 'gold' }]} // Icon turns gold if update is available!
              />
            </View>
            <Text style={styles.updateText}>
              Check for Updates
            </Text>
          </View>
          {isUpdateAvailable && (
            <View style={styles.updateAvailableBadge}>
              <Text style={styles.updateAvailableBadgeText}>!</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.faqContainer}
          onPress={() => Alert.alert('FAQ update coming soon')}
        >
          <View style={styles.faqIconContainer}>
            <Ionicons
              name={'document-text'}
              size={24}

              style={styles.faqIcon}
            />

          </View>
          <Text style={styles.faqText}>FAQ</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.helpContainer}
          onPress={() => Alert.alert('Help update coming soon')}
        >
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
        </TouchableOpacity>


        {/* Divider Line */}
        <View style={styles.dividerLine} />

        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logOutIconAndText}
            onPress={handleLogout}
          >
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


      {/* UPDATE MODAL */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: colors.settingOptionsBGC }]}>
                  {/* --- This top section will now ALWAYS be visible --- */}
            <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>Update Available!</Text>

            {/* This ensures the app doesn't crash if info isn't ready yet */}
            {latestVersionInfo && (
              <>
                <Text style={[styles.modalVersion, { color: colors.textSecondary }]}>
                  Version {latestVersionInfo.version} is ready to install.
                </Text>
                <Text style={[styles.modalNotesTitle, { color: colors.textPrimary }]}>
                  Release Notes:
                </Text>
                <Text style={[styles.modalNotes, { color: colors.textSecondary }]}>{latestVersionInfo.releaseNotes}
                </Text>
              </>
            )}
            {/* conditional rendering based on if it's downloading or not */}
            {isDownloading ? (
              <View style={styles.progressContainer}>
                <Text style={{ color: colors.textPrimary, textAlign: 'center' }}>Downloading... {downloadProgress}%</Text>
                <ProgressBar
                  styleAttr="Horizontal"
                  indeterminate={false}
                  progress={downloadProgress / 100}
                  color="gold"
                />
              </View>
            ) : (
              <View style={styles.buttonRow}>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
                  <Text style={{ color: colors.textSecondary }}>Later</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={startUpdate} style={styles.confirmUpdateButton}>
                  <Text style={styles.confirmUpdateButtonText}>Update Now</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>

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

  },
  // --- NEW STYLES FOR THE UPDATE BUTTON 
  updateButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xtraLarge,
    paddingTop: spacing.medium,
  },
  updateIconAndTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.medium,
  },
  updateIconContainer: {
    height: 36,
    width: 36,
    backgroundColor: '#F5F6FA',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateIcon: {
    color: '#000000'
  },
  updateText: {
    color: '#000000',
    fontFamily: FONTS.robotoMedium,
    fontSize: FONTsize.medium,
  },
  updateAvailableBadge: {
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateAvailableBadgeText: {
    color: 'white',
    fontWeight: 'bold',
  },

  // --- ANEW STYLES FOR THE MODAL 
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalContent: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: FONTsize.large,
    fontFamily: FONTS.interSemiBold,
    textAlign: 'center',
    marginBottom: 10,
  },
  modalVersion: {
    fontSize: FONTsize.medium,
    fontFamily: FONTS.interRegular,
    textAlign: 'center',
    marginBottom: 10,
  },
  modalNotesTitle: {
    fontSize: FONTsize.medium,
    fontFamily: FONTS.interSemiBold,
    marginBottom: 5,
  },
  modalNotes: {
    fontSize: FONTsize.medium,
    fontFamily: FONTS.interRegular,
    // marginBottom: 20,
  },
  progressContainer: {
    marginTop: 20,
    gap: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    padding: 10,
  },
  confirmUpdateButton: {
    backgroundColor: 'gold',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  confirmUpdateButtonText: {
    fontFamily: FONTS.interBold,
    color: '#000000',
    fontSize: FONTsize.medium,
  },

})