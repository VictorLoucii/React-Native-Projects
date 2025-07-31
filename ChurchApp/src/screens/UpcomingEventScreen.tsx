import { ActivityIndicator, Alert, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useThemeStore } from '../themes/ThemeStore';
import { useNavigation, useTheme } from '@react-navigation/native';
import { CustomTheme } from '../themes/CustomTheme';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { FONTsize, spacing } from '../constants/dimensions';
import { FONTS } from '../constants/fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import { supabase } from '../../supabase'

// The component receives route props from React Navigation
const UpcomingEventScreen = ({ route }) => {
  // 1. RECEIVE THE EVENT DATA
  // The 'event' object passed from the previous screen is in route.params
  const { event } = route.params;

  const insets = useSafeAreaInsets();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { colors } = useTheme() as CustomTheme;
  const navigation = useNavigation();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // For checking registration status on load
  const [isRegistering, setIsRegistering] = useState(false); // For the register button press
  const [isCancelling, setIsCancelling] = useState(false); // For cancelling

  // CHECK user's REGISTRATION STATUS ON LOAD
  useEffect(() => {
    const checkRegistrationStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        return; // User not logged in, so they can't be registered
      }

      // Check for a registration matching this user AND this event
      const { data, error } = await supabase
        .from('event_registrations')
        .select('event_id')
        .eq('user_id', user.id)  //eq means equals
        .eq('event_id', event.id)
        .single(); // .single() is efficient, we only expect one or zero rows

      if (data) {
        setIsRegistered(true); // A record was found
      }

      setIsLoading(false); // Done checking
    };

    checkRegistrationStatus();
  }, [event.id]); // Re-run this check if the user navigates to a different event screen

  //THE REGISTRATION FUNCTION
  const handleRegister = async () => {
    setIsRegistering(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        Alert.alert("Login Required", "Please log in to register for events.");
        return;
      }

      // Use the event.id from the event object we received
      const { error } = await supabase
        .from('event_registrations')
        .insert({ event_id: event.id, user_id: user.id });

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          Alert.alert("Already Registered", "You are already registered for this event.");
        } else {
          throw error;
        }
      } else {
        Alert.alert("Success!", "You have successfully registered for the event.");
        setIsRegistered(true); // Update the button state
      }

    } catch (error) {
      console.error("Error registering for event:", error);
      Alert.alert("Error", "Could not register for the event.");
    } finally {
      setIsRegistering(false);
    }
  };

  // Showing a loading spinner while we check registration status
  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: colors.bkGroundClr }]}>
        <ActivityIndicator size="large" color={colors.textPrimary} />
      </View>
    );
  }


  // Derigester/cancelling function
  const handleDeregister = async () => {
    setIsCancelling(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // This case should ideally not happen if the button is shown correctly
        Alert.alert("Login Required", "You must be logged in to cancel a registration.");
        return;
      }

      // Delete the row that matches BOTH the user_id AND the event_id
      const { error } = await supabase
        .from('event_registrations')
        .delete()
        .eq('user_id', user.id)
        .eq('event_id', event.id);

      if (error) {
        throw error; // Let the catch block handle any errors
      } else {
        Alert.alert("Success!", "You have cancelled your registration for this event.");
        setIsRegistered(false); // Update the button state back to 'unregistered'
      }

    } catch (error) {
      console.error("Error cancelling registration:", error);
      Alert.alert("Error", "Could not cancel your registration.");
    } finally {
      setIsCancelling(false);
    }
  };




  // RENDER DYNAMIC DATA IN THE JSX
  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.bkGroundClr }]}>
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
          {event.title}
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <Image
          source={{ uri: event.image_url }}
          style={styles.imageStyle}
        />

        <View style={styles.detailsContainer}>

          <View style={styles.iconAndTitle}>
            <Ionicons
              name={'book-outline'}
              size={29}
              color={colors.icon}
            />
            <Text style={[styles.subTitle, { color: colors.textPrimary }]}>
              {event.title}
            </Text>
          </View>

          <View style={styles.dateIconAndText}>
            <MaterialIcons
              name={'calendar-month'}
              size={29}
              color={colors.icon}
            />
            <Text style={[styles.dateText, { color: colors.textPrimary }]}>
              {/* note: don't create date, theme columns in your events table in supabase as you can already access them from your event_date column */}
              {new Date(event.event_date).toLocaleDateString()}
            </Text>
          </View>

          <View style={styles.timeIconAndText}>
            <Feather
              name={'clock'}
              size={29}
              color={colors.icon}
            />
            <Text style={[styles.timeText, { color: colors.textPrimary }]}>
              {/* note: don't create date, theme columns in your events table in supabase as you can already access them from your event_date column */}
              {new Date(event.event_date).toLocaleTimeString()}
            </Text>
          </View>

          <Text style={[styles.timeText, { color: colors.textPrimary }]}>
            {event.theme}
          </Text>

          {/* Divider Line */}
          <View style={styles.dividerLine} />

          <Text style={[styles.timeText, { color: colors.textPrimary }]}>
            {event.description || 'No description provided.'}
          </Text>

          {/* dynamic text rendering of registeration or cancelation button */}
          <TouchableOpacity
            style={[
              styles.registerButton,
            ]}
            onPress={() => {
              if (isRegistered) {
                handleDeregister();
              } else {
                handleRegister();
              }
            }}
            // Disable the button if EITHER action is in progress
            disabled={isRegistering || isCancelling}
          >
            <Text style={[
              styles.registerButtonText,
              // conditional styles for texts
              (isRegistered && !isCancelling) && { color: 'red' }
            ]}>
              {isCancelling ? 'CANCELLING...' : (isRegistering ? 'REGISTERING...' : (isRegistered ? 'CANCEL REGISTRATION' : 'REGISTER'))}
            </Text>
          </TouchableOpacity>


        </View>

      </ScrollView>



    </View>
  )
}

export default UpcomingEventScreen

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
  imageStyle: {
    height: 235,
  },
  detailsContainer: {
    marginTop: spacing.large,
    height: 523,
    paddingHorizontal: spacing.biggerMedium,
    gap: spacing.medium,
  },
  iconAndTitle: {
    flexDirection: 'row',
    gap: spacing.medium,
    alignItems: 'center',
  },
  subTitle: {
    fontSize: FONTsize.large,
    fontFamily: FONTS.interSemiBold,

  },
  dateIconAndText: {
    flexDirection: 'row',
    gap: spacing.medium,
    alignItems: 'center',

  },
  dateText: {
    fontSize: FONTsize.medium,
    fontFamily: FONTS.interLightItalic,

  },
  timeIconAndText: {
    flexDirection: 'row',
    gap: spacing.medium,
    alignItems: 'center',

  },
  timeText: {
    fontSize: FONTsize.biggerMedium,
    fontFamily: FONTS.interRegular

  },
  dividerLine: {
    height: 0.5,
    backgroundColor: '#BDC1C6',
    // paddingTop: spacing.medium,
    // marginTop:spacing.medium
  },
  registerButton: {
    height: 51,
    borderColor: '#A96F00',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: '#A96F00',
    fontFamily: FONTS.interRegular,
    fontSize: FONTsize.biggerMedium
  },
  registeredButton: {
    // backgroundColor: '#4CAF50', // A green color to indicate success
    // borderColor: 'red',
  },
  registerButtonText: {
    fontFamily: FONTS.interBold,
    color: 'green',
    fontSize: FONTsize.medium,
  },

})