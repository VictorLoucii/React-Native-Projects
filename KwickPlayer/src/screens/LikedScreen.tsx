import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
// import { colors } from '../constants/colors'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { FONTsize, iconSizes, spacing } from '../constants/dimensions'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { fonts } from '../constants/fonts'
import SongCard from '../components/SongCard'
import FloatingPlayer from '../components/FloatingPlayer'
import { useNavigation, useTheme } from '@react-navigation/native'
import useLikedSongs from '../ZustandStore/LikeStore'
import TrackPlayer from 'react-native-track-player'
import { CustomTheme } from '../theme/CustomTheme'
import { usePlayerStore } from '../ZustandStore/PlayerStore'
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const LikedScreen = () => {

    const { activePlaylistId, setActivePlaylistId } = usePlayerStore();

    const { colors } = useTheme() as CustomTheme;  //note that this colors object is coming from the files DarkMode/LightMode in theme folder not from the colors.js file in the constants folder
    const insets = useSafeAreaInsets();


    const { likedSongs } = useLikedSongs();
    const navigation = useNavigation();
    const goToPrevScreen = () => {
        navigation.goBack();
    }
    //create a function that will play songs/tracks in queue
    const handlePlayTrack = async (selectedTrack) => {
        console.log('likedSongs:---', likedSongs);

        //optimized version(like in SongCardWithCategory.tsx file) using Zustand and TrackPlayer.skip():
        const categoryId = 'Liked_Songs_Playlist'; //static value given for all categories/rows

        if (activePlaylistId === categoryId) {
            console.log(`Same playlist selected : (${categoryId}). Skipping to new track`)
            const selectedSongIndex = likedSongs.findIndex((track) => {
                return (
                    track.url === selectedTrack.url
                )
            });
            console.log("TrackIndex:-----", selectedSongIndex);
            //condition for, if track doesn't exist:
            if (selectedSongIndex === -1) return;
            await TrackPlayer.skip(selectedSongIndex);
        }
        else {  //optimized else block:
            console.log(`New playlist selected: (${categoryId}). Building track player queue.`);

            const selectedSongIndex = likedSongs.findIndex((track) => {
                return (
                    track.url === selectedTrack.url
                )
            });
            console.log("TrackIndex:-----", selectedSongIndex);
            //condition for, if track doesn't exist:
            if (selectedSongIndex === -1) return;

            // The efficient way to build a new queue:
            await TrackPlayer.reset();
            await TrackPlayer.add(likedSongs); // Add the whole array at once
            await TrackPlayer.skip(selectedSongIndex);// Then just skip to the selected track/song

            // Update the global state with the new dynamic categoryId
            setActivePlaylistId(categoryId);
        }
        await TrackPlayer.play();


    }

    return (
        <View style={[styles.container, { backgroundColor: colors.bkGroundClr, paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <View style={styles.vectorIcons}>
                <TouchableOpacity
                    onPress={goToPrevScreen}
                >
                    <Ionicons
                        name={'arrow-back'}
                        size={30}
                        color={colors.iconPrimary}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Fontisto
                        name={'equalizer'}
                        size={iconSizes.large}
                        color={colors.iconPrimary}
                    />
                </TouchableOpacity>
            </View>
            <FlatList
                ListHeaderComponent={
                    <Text style={[styles.likedScreen, { color: colors.textPrimary }]}>
                        Liked Screen</Text>
                }
                data={likedSongs}
                renderItem={({ item }) => {
                    return (
                        <SongCard
                            containerStyle={{ width: '47%' }}
                            imageStyle={{
                                height: 170,
                                width: "100%",  // Use 100% width for responsiveness
                            }}
                            data={item}
                            handlePlay={() => {
                                // Call the function 'handlePlayTrack' without passing the array, it's already in scope
                                handlePlayTrack(item)
                            }}
                        />
                    )
                }}
                contentContainerStyle={{
                    paddingBottom: 400,
                    paddingHorizontal: spacing.large,
                }}
                columnWrapperStyle={{
                    justifyContent: 'space-between',

                }}
                numColumns={2}
                ListEmptyComponent={
                    <View style={styles.emptyListContainer}>
                        <Text style={[styles.emptyListText, { color: colors.textSecondary }]}>
                            You haven't liked any songs yet
                        </Text>
                        <Text style={[styles.emptyListText, { color: colors.textSecondary }]}>
                            Tap the heart on a song to add it here
                        </Text>
                    </View>
                }

            />
            <FloatingPlayer />
        </View>
    )
}

export default LikedScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: colors.bkGroundClr,

    },
    vectorIcons: {
        // paddingTop: 60,
        paddingHorizontal: spacing.large,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 20,
    },
    likedScreen: {
        fontSize: FONTsize.xtraLarge,
        // color: colors.textPrimary,
        fontFamily: fonts.Bold,
        // paddingHorizontal: spacing.medium,
        paddingBottom: 20,
        // marginBottom: 20,
    },
    emptyListContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100, // Push it down a bit from the header
    },
    emptyListText: {
        fontFamily: fonts.Medium,
        fontSize: FONTsize.medium,
        textAlign: 'center',
        paddingHorizontal: spacing.large,
        lineHeight: 22,
    }
})