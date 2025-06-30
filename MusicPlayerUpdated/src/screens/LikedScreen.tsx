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

const LikedScreen = () => {

    const { activePlaylistId, setActivePlaylistId } = usePlayerStore();

    const { colors } = useTheme() as CustomTheme;  //note that this colors object is coming from the files DarkMode/LightMode in theme folder not from the colors.js file in the constants folder


    const { likedSongs } = useLikedSongs();
    const navigation = useNavigation();
    const goToPrevScreen = () => {
        navigation.goBack();
    }
    //create a function that will play songs/tracks in queue
    const handlePlayTrack = async (selectedTrack ) => {
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
        <View style={[styles.container, { backgroundColor: colors.bkGroundClr }]}>
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
                                width: 170,
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
                }}
                columnWrapperStyle={{
                    justifyContent: 'flex-end',

                }}
                numColumns={2}

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
        paddingTop: 60,
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
        paddingHorizontal: spacing.large,
        marginBottom: 20,
    }
})