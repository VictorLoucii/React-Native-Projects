import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, ActivityIndicator, Image, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
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

// Import our music service and the Track interface
import { loadLocalTracks } from '../services/MusicFileService';
import { Track } from '../services/MusicFileService';
import useSearchStore from '../ZustandStore/SearchStore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useLikedSongs from '../ZustandStore/LikeStore';
import { isExist } from '../utilityFunction'
import TrackPlayer from 'react-native-track-player';
import { usePlayerStore } from '../ZustandStore/PlayerStore';


//  Define the structure for a category to match your SongsList data
interface SongCategory {
  title: string;
  songs: Track[];  //here songs is an array of Track objects. Track object has been defined in MusicFileService.ts, here we are importing and using it
}

const HomeScreen = () => {

  const { filteredSongs, isSearchActive, searchQuery, toggleSearch, setSearchQuery, allSongsForSearch } = useSearchStore();
  const insets = useSafeAreaInsets();
  const { likedSongs, addToLiked } = useLikedSongs();
  const { activePlaylistId, setActivePlaylistId } = usePlayerStore();

  const { colors } = useTheme() as CustomTheme;  //note that this colors object is coming from the files DarkMode/LightMode in theme folder not from the colors.js file in the constants folder

  // First, filter the master list to get only the songs from the user's device
  const localTracks = allSongsForSearch.filter(song => song.url.startsWith('file://'))

  // Combine your existing SongsList with the new local tracks:
  // Start with your hardcoded categories from SongsList
  const allSongCategories: SongCategory[] = SongsList.map(category => ({
    ...category,
    // Ensure every song in the hardcoded list also matches the Track interface
    songs: category.songs.map(song => ({
      ...song,
      duration: 0, //  We are just adding the property
    })),
  }));

  // Only add the "On My Device" category if we found any local tracks
  if (localTracks.length > 0) {
    allSongCategories.unshift({ // .unshift() adds it to the beginning of the list
      title: 'On My Device',  //the new category will have this static title
      songs: localTracks,   //the new category will display localTracks(all songs found on the device)
    });
  }

  //track player logic for playing searched songs:
  const handPlaySearchTrack = async (selectedTrack: Track) => {

    const playListId = 'SEARCH_RESULTS'; // A unique ID for this playlist

    if (activePlaylistId === playListId) {
      console.log(`Same playlist selected : (${playListId}). Skipping to new track`)
      const trackIndex = filteredSongs.findIndex((track) => {
        return track.url === selectedTrack.url
      });
      console.log('trackIndex:---', trackIndex);
      if (trackIndex === -1) return;
      await TrackPlayer.skip(trackIndex);
    }
    else {
      const trackIndex = filteredSongs.findIndex((track) => {
        console.log(`New playlist selected: (${playListId}). Building track player queue.`);
        return track.url === selectedTrack.url
      });
      console.log('trackIndex:---', trackIndex);
      if (trackIndex === -1) return;
      await TrackPlayer.reset();
      await TrackPlayer.add(filteredSongs); // Add the whole array at once
      await TrackPlayer.skip(trackIndex);  // Then just skip to the selected track/song
      setActivePlaylistId(playListId); // Update the global state with the new dynamic playListId
    }
    await TrackPlayer.play();
  }

  // ---This function is ONLY for rendering a single SEARCH RESULT item ---
  const renderSearchResultItem = ({ item }: { item: Track }) => (

    <View style={styles.songRow}>
      <View style={styles.imageTitleArtistContainer}>
        <TouchableOpacity onPress={() => handPlaySearchTrack(item)}>
          <Image
            source={{ uri: item.artwork || 'https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/875/325x325/sky-high-x-feel-good-mashup-1744110058-9Z7X0XldXy.jpg' }}
            style={styles.artwork}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <TouchableOpacity onPress={() => handPlaySearchTrack(item)}>
            <Text style={[styles.title, { color: colors.textPrimary }]} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={[styles.artist, { color: colors.textSecondary }]} numberOfLines={1}>
              {item.artist}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.heartContainer} onPress={() => addToLiked(item)}>
        <AntDesign
          name={isExist(likedSongs, item) ? 'heart' : 'hearto'}
          size={iconSizes.small}
          color={colors.iconPrimary}
        />
      </TouchableOpacity>
    </View>
  );


  return (
    <View style={[styles.container, { backgroundColor: colors.bkGroundClr, paddingBottom: insets.bottom }]}>
      <StatusBar />
      <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
        <Header />
      </View>

      {/* case when isSearchActive is false i.e when user is not searching */}
      {!isSearchActive && (
        // put flex: 1 in flatListContainer view otherwise you'll have layout issues
        <View style={styles.flatListContainer}>
          {allSongsForSearch.length === 0 ? (
            // If loading, show only the centered ActivityIndicator
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.textPrimary} />
              <Text style={[styles.loadingText, { color: colors.textPrimary }]}>
                Scanning for music...
              </Text>
            </View>
          ) : (
            // If done loading, show only the FlatList
            <FlatList
              data={allSongCategories}
              renderItem={({ item }) => <SongCardWithCategory title={item.title} songs={item.songs} />}
              contentContainerStyle={{
                paddingBottom: insets.bottom + 150,
              }}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      )}

      {/* case when isSearchActive is true i.e when user is searching  */}
      {isSearchActive && (
        <FlatList
          data={filteredSongs}
          renderItem={renderSearchResultItem}
          keyExtractor={item => `search-${item.url}`}
          contentContainerStyle={{
            paddingBottom: insets.bottom + 150,
            paddingHorizontal: 20,
          }}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ marginBottom: 10 }} />}
          ListHeaderComponent={() => (
            searchQuery.length > 0 && filteredSongs.length === 0 ? (
              <Text style={styles.noResultsText}>No results found.</Text>
            ) : null
          )}
        />

      )}
      <FloatingPlayer />

    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.bkGroundClr,  //comment this since we are using theme at the final stages of the app

  },
  headerContainer: {
    // flex: 1,
  },
  loadingContainer: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.large,
    gap: spacing.medium,
  },
  loadingText: {
    fontFamily: fonts.Medium,
    fontSize: FONTsize.medium,
  },
  songRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageTitleArtistContainer: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    flex: 1,
  },
  artwork: {
    height: 50,
    width: 50,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    // fontFamily: fonts.Medium,
  },
  artist: {
    // fontFamily: fonts.Regular,
  },
  heartContainer: {
    paddingLeft: 10,
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    fontFamily: fonts.Regular,
    fontSize: FONTsize.medium,
    color: 'grey',
  },
  flatListContainer: {
    flex: 1,
  }


})