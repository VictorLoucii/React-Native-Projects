import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ActivityIndicator, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LoadAllSongs, Track } from '../services/MusicFileService' // Renamed import for clarity
import { useTheme } from '@react-navigation/native'
import { CustomTheme } from '../theme/CustomTheme'
import TrackPlayer from 'react-native-track-player'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import FloatingPlayer from '../components/FloatingPlayer'
import { usePlayerStore } from '../ZustandStore/PlayerStore'
import { FONTsize, iconSizes, spacing } from '../constants/dimensions'
import AllSongsScreenHeader from '../components/AllSongsScreenHeader'
import { fonts } from '../constants/fonts'
import AntDesign from 'react-native-vector-icons/AntDesign'
import useLikedSongs from '..//ZustandStore/LikeStore'
import { isExist } from '../utilityFunction'
import useSearchStore from '../ZustandStore/SearchStore'

const AllSongsScreen = () => {

    const { activePlaylistId, setActivePlaylistId } = usePlayerStore();
    const { isSearchActive, filteredSongs, searchQuery, allSongsForSearch } = useSearchStore();
    const { colors } = useTheme() as CustomTheme;
    const insets = useSafeAreaInsets();
    const { likedSongs, addToLiked } = useLikedSongs();
    console.log('likedSongs:---', likedSongs || 'empty array')



    //track player logic:
    // --- The 'handlePlayTrack' function now needs to be smarter. ---
    // It should play from the 'filteredSongs' list if search is active.
    const handlePlayTrack = async (selectedTrack: Track) => {
        console.log('allSongsForSearch array:----', allSongsForSearch);


        // Determine which list is currently active based on isSearchActive
        const currentPlaylist = isSearchActive ? filteredSongs : allSongsForSearch;
        const playListId = isSearchActive ? 'Search_Results' : 'All Songs'; //defined unique string names for filteredSongs and allSongsForSearch arrays

        if (activePlaylistId === playListId) {
            console.log(`Same playlist selected : (${playListId}). Skipping to new track`)
            const trackIndex = currentPlaylist.findIndex((track) => {
                return track.url === selectedTrack.url
            });
            console.log('trackIndex:---', trackIndex);
            if (trackIndex === -1) return;
            await TrackPlayer.skip(trackIndex);
        }
        else {
            const trackIndex = currentPlaylist.findIndex((track) => {
                console.log(`New playlist selected: (${playListId}). Building track player queue.`);
                return track.url === selectedTrack.url
            });
            console.log('trackIndex:---', trackIndex);
            if (trackIndex === -1) return;
            await TrackPlayer.reset();
            await TrackPlayer.add(currentPlaylist); // Add the whole array at once
            await TrackPlayer.skip(trackIndex);  // Then just skip to the selected track/song
            setActivePlaylistId(playListId); // Update the global state with the new dynamic playListId
        }
        await TrackPlayer.play();
    }

    const renderSongItem = ({ item }: { item: Track }) => (

        <View style={styles.songRow}>
            <View style={styles.imageTitleArtistContainer}>
                <TouchableOpacity onPress={() => handlePlayTrack(item)}>
                    <Image
                        source={{ uri: item.artwork || 'https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/875/325x325/sky-high-x-feel-good-mashup-1744110058-9Z7X0XldXy.jpg' }}
                        style={styles.artwork}
                    />
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <TouchableOpacity onPress={() => handlePlayTrack(item)}>
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

    if (allSongsForSearch.length === 0) {
        // show activity indicator if the allSongsForSearch array is not ready/loaded yet
        return (
            <View>
                <ActivityIndicator
                    size="large" color={colors.textPrimary}
                    style={[{ flex: 1 }, { backgroundColor: colors.bkGroundClr }]}
                />
            </View>
        );
    }

    // ---  Use conditional rendering for the main view ---
    return (
        <View style={[styles.container, { backgroundColor: colors.bkGroundClr }]}>
            <StatusBar />
            <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
                <AllSongsScreenHeader />
            </View>

            {/* If search is NOT active, show the normal "All Songs" list */}
            {/* Block 1: Renders when search is OFF */}
            {!isSearchActive && (
                <>
                    <Text style={[styles.headingTextContainer, { color: colors.textPrimary }]}>
                        All Songs
                    </Text>
                    <FlatList
                        data={allSongsForSearch}
                        renderItem={renderSongItem}
                        keyExtractor={item => item.url}
                        contentContainerStyle={{
                            paddingBottom: insets.bottom + 150,
                            paddingHorizontal: 20,
                        }}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View style={{ marginBottom: 10 }} />}
                    />
                </>
            )}
            {/* If search IS active, show the search results list */}
            {/* Block 2: Renders when search is ON */}
            {isSearchActive && (
                <FlatList
                    data={filteredSongs}
                    renderItem={renderSongItem}
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
            <View style = {{paddingBottom:insets.bottom}}>
                <FloatingPlayer />
            </View>


        </View>
    );
}

export default AllSongsScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        paddingHorizontal: spacing.large,
    },
    headingTextContainer: {
        fontSize: FONTsize.xtraLarge,
        fontFamily: fonts.Bold,
        paddingHorizontal: spacing.large,
        marginBottom: 20,
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

});