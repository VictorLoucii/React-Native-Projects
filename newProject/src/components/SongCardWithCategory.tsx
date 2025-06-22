import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SongCard from './SongCard'
import { FONTsize, spacing } from '../constants/dimensions'
// import { colors } from '../constants/colors'
import { fonts } from '../constants/fonts'
import TrackPlayer from 'react-native-track-player'
import { useTheme } from '@react-navigation/native'
import { CustomTheme } from '../theme/CustomTheme'
import { usePlayerStore } from '../ZustandStore/PlayerStore'

type SongProps = {
    url: string;
    title: string;
    artist: string;
    artwork: string;
    album?: string;
}

type SongCardWithCategoryProps = {
    title: string,
    songs: SongProps[],
}

const SongCardWithCategory: React.FC<SongCardWithCategoryProps> = ({ title,
    songs }) => {

    const { activePlaylistId, setActivePlaylistId } = usePlayerStore();

    const { colors } = useTheme() as CustomTheme;

    //create a function that will play songs/tracks in queue
    const handlePlayTrack = async (selectedTrack) => {
        console.log('songs:---', songs);

        //optimized version using Zustand and TrackPlayer.skip():
        const categoryId = title;

        if (activePlaylistId === categoryId) {
            console.log(`Same playlist selected : (${categoryId}). Skipping to new track`)
            const selectedSongIndex = songs.findIndex((track) => {
                return(
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

            const selectedSongIndex = songs.findIndex((track) => {
                return (
                    track.url === selectedTrack.url
                )
            });
            console.log("TrackIndex:-----", selectedSongIndex);
            //condition for, if track doesn't exist:
            if (selectedSongIndex === -1) return;

            // The efficient way to build a new queue:
            await TrackPlayer.reset();
            await TrackPlayer.add(songs); // Add the whole array at once
            await TrackPlayer.skip(selectedSongIndex);// Then just skip to the selected track/song

            // Update the global state with the new dynamic categoryId
            setActivePlaylistId(categoryId);
        }
        await TrackPlayer.play();

        //unoptimized version:
        //find the selectedSongIndex of the selectedTrack:
        // const selectedSongIndex = songs.findIndex((track) => {
        //     return (
        //         track.url === selectedTrack.url
        //     )
        // });
        // console.log("TrackIndex:-----", selectedSongIndex);
        // //condition for, if track doesn't exist:
        // if (selectedSongIndex === -1) return;

        // //song before selectedSongIndex(user clicked song)
        // const songsBefore = songs.slice(0, selectedSongIndex);
        // console.log("songsBefore:----", songsBefore);

        // //songs after selectedSongIndex(user clicked song)
        // const songsAfter = songs.slice(selectedSongIndex + 1);
        // console.log("songsAfter:----", songsAfter);

        // //reset the trackplayer:
        // await TrackPlayer.reset();

        // // Play selected song first, then the rest:
        // await TrackPlayer.add(selectedTrack);
        // await TrackPlayer.add(songsAfter);
        // await TrackPlayer.add(songsBefore);

        // await TrackPlayer.play();
    }


    return (
        <View style={styles.container}>
            <Text style={[styles.headingText, { color: colors.textPrimary }]}>{title}</Text>
            <FlatList
                data={songs}
                renderItem={({ item }) =>
                    <SongCard
                        data={item}
                        handlePlay={(selectedTrack) => {
                            console.log('Selected Track:---', selectedTrack);
                            handlePlayTrack(selectedTrack);
                        }}
                    />}
                horizontal={true}
                ItemSeparatorComponent={<View style={{ marginHorizontal: 15 }} />}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: spacing.large,

                }}

            />
        </View>
    )
}

export default SongCardWithCategory

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        marginBottom: spacing.xtraLarge

    },
    headingText: {
        fontSize: FONTsize.xtraLarge,
        // color: colors.textPrimary,
        fontFamily: fonts.Bold,
        paddingHorizontal: spacing.large,
        marginBottom: 20,
    }
})


//notes:
// The handlePlayTrack function works, but it's not optimized. The main inefficiency comes from how it rebuilds the entire playback queue every single time a user clicks a song.