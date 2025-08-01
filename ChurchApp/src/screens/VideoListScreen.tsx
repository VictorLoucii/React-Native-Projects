import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useThemeStore } from '../themes/ThemeStore';
import { useNavigation, useTheme, useRoute } from '@react-navigation/native';
import { CustomTheme } from '../themes/CustomTheme';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { FONTsize, spacing } from '../constants/dimensions';
import { FONTS } from '../constants/fonts';
import MediaCard from '../components/MediaCard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

//below imports for supabase:
// --- ADD THESE IMPORTS ---
import { useState, useEffect } from 'react';
import { supabase } from '../../supabase'; // Assuming supabase.js is in the root
import { ActivityIndicator, FlatList } from 'react-native';

// IMPORT from our types file ---
import { MediaStackScreenProps, vid } from '../navigation/navigationTypes';


const VideoListScreen = () => {
  // console.log('succesfully navigated to VideoListScreen')
  const insets = useSafeAreaInsets();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { colors } = useTheme() as CustomTheme;

  // State to hold our sermons and loading status
  const [mediaItems, setMediaItems] = useState<vid[]>([]);  //empty array initially
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<MediaStackScreenProps<'VideoListScreen'>['navigation']>();
  // Get the parameters we will pass to this screen
  const route = useRoute<MediaStackScreenProps<'VideoListScreen'>['route']>();
  const { title, tableName } = route.params; // Destructure the params

  //use useEffect to fetch media data from supabase when the screen loads
  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from(tableName)  //dynmaiclly fetching the table name
        .select('*');

      if (error) {
        console.error(`Error fetching from ${tableName}:`, error.message);
      } else if (data) {
        setMediaItems(data);
      }
      setLoading(false);
    };

    fetchMedia();
  }, [tableName]);

  // A function to render each item in the FLAT list
  const renderMediaItem = ({ item }: { item: vid }) => (
    <MediaCard
      imageSource={{ uri: item.thumbnail_url }}  // The image source uses the URL from the database
      ONPRESS={() => navigation.navigate('VideoPlayerScreen', { video: item, videoType: tableName })} //Pass the entire sermon and videoType objects to the next screen i.e VideoPlayerScreen
    >
      <Text style={[styles.titleBold, { color: colors.MediaImageIconTextBGC }]}>
        {item.title}
      </Text>
      <Text style={[styles.subheading, { color: colors.MediaImageIconTextBGC }]}>
        {item.creator}
      </Text>
      <Text style={[styles.date, { color: colors.MediaImageIconTextBGC }]}>
        {item.date}
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
  );


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
          {title}
        </Text>
      </View>

      {/* Divider Line */}
      <View style={styles.dividerLine} />

      {/* conditional rendering: */}
      {/*Using a loading indicator or the FlatList */}
      {loading ? (
        <ActivityIndicator size="large" color={colors.textPrimary} style={{ flex: 1 }} />
      ) : (
        <FlatList

          data={mediaItems}
          renderItem={renderMediaItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={[styles.allMediaCards, { paddingBottom: 150 }]}
          ItemSeparatorComponent={() => <View style={{ height: spacing.biggerMedium }} />} // This adds space between items
        />
      )}





    </View >
  )
}

export default VideoListScreen

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