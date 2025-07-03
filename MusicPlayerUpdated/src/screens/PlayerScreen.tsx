import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
// import { colors } from '../constants/colors'
import { FONTsize, iconSizes, spacing } from '../constants/dimensions'
import { fonts } from '../constants/fonts'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import PlayerRepeatToggle from '../components/PlayerRepeatToggle'
import PlayerShuffleToggle from '../components/PlayerShuffleToggle'
import PlayerScreenProgressBar from '../components/PlayerScreenProgressBar'
import { GoToNext, GoToPrevButton, PlayPauseButton } from '../components/PlayerControl'
import { useNavigation, useTheme } from '@react-navigation/native'
import TrackPlayer, { useActiveTrack } from 'react-native-track-player'
import { isExist } from '../utilityFunction'
import useLikedSongs from '../ZustandStore/LikeStore'
import { CustomTheme } from 'src/theme/CustomTheme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import MovingText from '../components/MovingText'




const imageUrl = 'https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/655/325x325/1712055855_8OZEb5mgxW_MANSHN---Code-Art-Final.jpg'

const PlayerScreen = () => {

    // --- RULE: Call ALL hooks at the top level, unconditionally ---
    const insets = useSafeAreaInsets();
    const { colors } = useTheme() as CustomTheme;
    const navigation = useNavigation();
    const activeTrack = useActiveTrack();
    const [isMute, setIsMute] = useState(false);
    const { likedSongs, addToLiked } = useLikedSongs();
    console.log('likedSongs:---', likedSongs || 'empty array')

    //When the screen loads, check the current player volume and set the mute icon accordingly:
    useEffect(() => {
        setVolumeIcon();
    }, [])

    // --- End of hooks ---

    // console.log('Active track:----', activeTrack);

    const setVolumeIcon = async () => {
        const Volume = await TrackPlayer.getVolume();
        setIsMute(Volume === 0 ? true : false);
    }

    // --- Defensive Check ---
    // If the track is not yet loaded, show a loading screen or return null.
    // This prevents the crash and handles the initial `undefined` state.
    if (!activeTrack) {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: colors.bkGroundClr }} >
                <ActivityIndicator size={'large'} color={colors.iconPrimary} />
            </View>
        )
    }


    const goToPrevScreen = () => {
        navigation.goBack();
    }
    const toggleMuteUnmute = async () => {
        TrackPlayer.setVolume(isMute ? 1 : 0);
        setIsMute(!isMute);
    }


    return (
        <View style={[styles.container, { backgroundColor: colors.bkGroundClr, paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            {/* This view will expand, pushing the controls to the bottom */}
            <View style={{ flex: 1 }}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        onPress={goToPrevScreen}
                    >
                        <Ionicons
                            name={'arrow-back'}
                            size={30}
                            color={colors.iconPrimary}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.headerText, { color: colors.textPrimary }]}>
                        Playing Now
                    </Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: activeTrack?.artwork || 'https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/875/325x325/sky-high-x-feel-good-mashup-1744110058-9Z7X0XldXy.jpg' }}
                        style={styles.imageStyle}
                    />
                </View>
                <View style={styles.titleArtistAndHeart}>
                    <View style={styles.titleAndArtist}>
                        {/* USE MovingText FOR THE TITLE */}
                        <MovingText
                            text={activeTrack?.title ?? 'uknown title'}
                            animationThreshold={25} // Start scrolling if title is long
                            style={[styles.title, { color: colors.textPrimary }]}
                        />
                        <Text
                            style={[styles.artist, { color: colors.textSecondary }]}
                            numberOfLines={1}
                            adjustsFontSizeToFit={true}
                            minimumFontScale={0.7} // Optional: prevents text from getting too small
                        >
                            {activeTrack?.artist ?? 'unkown artist'}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => addToLiked(activeTrack)}>
                            <AntDesign
                                name={isExist(likedSongs, activeTrack) ? 'heart' : 'hearto'}
                                size={iconSizes.large}
                                color={colors.iconSecondary}
                            />
                    </TouchableOpacity>
                </View>
                <View style={styles.playerScreenControls}>
                    <TouchableOpacity
                        style={styles.volumeContainer}
                        onPress={toggleMuteUnmute}
                    >
                        <Feather
                            name={isMute ? 'volume-x' : 'volume-1'}
                            size={iconSizes.xtraLarge}
                            color={colors.iconSecondary}
                        />
                    </TouchableOpacity>

                    <View style={styles.repeatShuffleContainer}>
                        <PlayerRepeatToggle />
                        <PlayerShuffleToggle />
                    </View>

                </View>

                <View style={styles.playerProgressBar}>
                    <PlayerScreenProgressBar />
                </View>
            </View>
            {/* --- End of the new wrapper --- */}
            {/* The below controls are now outside the expanding view, so they stay at the bottom */}
            <View style={styles.playPauseNextContainer}>
                <GoToPrevButton />
                <PlayPauseButton />
                <GoToNext />

            </View>
        </View>
    )
}

export default PlayerScreen

const styles = StyleSheet.create({
    container: {
        // backgroundColor: colors.bkGroundClr,
        flex: 1,

    },
    headerContainer: {
        // paddingTop: 60,
        paddingHorizontal: spacing.large,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        fontSize: FONTsize.xtraLarge,
        // color: colors.textPrimary,
        fontFamily: fonts.Bold,
        flex: 1,
        textAlign: 'center',
    },
    imageContainer: {
        // justifyContent: 'center',
        alignItems: 'center',
        marginTop: spacing.large,

    },
    imageStyle: {
        height: 300,
        width: 300,
        borderRadius: 10,
    },
    titleArtistAndHeart: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.medium,
        paddingVertical: spacing.large,
        width: '100%',

    },
    titleAndArtist: {
        flex: 1,
        alignItems: 'center',  //this will bring the title and artist in the middle
        // paddingRight: spacing.small,
        // overflow: 'hidden',
        // justifyContent:"center"

    },
    title: {
        width: '100%',
        fontFamily: fonts.Medium,
        fontSize: FONTsize.xtraLarge,
        // color: colors.textPrimary,
        paddingVertical: spacing.small,
        textAlign: 'center',
        // paddingLeft: 60,
        // paddingRight: spacing.large

    },
    artist: {
        width: '100%',
        fontFamily: fonts.Regular,
        fontSize: FONTsize.large,
        // color: colors.textSecondary,
        textAlign: 'center',
    },
    playerScreenControls: {
        marginVertical: spacing.medium,
        paddingHorizontal: spacing.medium,
        flexDirection: 'row',
        // justifyContent:'space-between',
        alignItems: 'center',

    },
    volumeContainer: {
        flex: 1,

    },
    repeatShuffleContainer: {
        flexDirection: 'row',
        gap: spacing.medium,
    },

    playerProgressBar: {
        marginVertical: spacing.large,
        paddingHorizontal: spacing.medium

    },
    playPauseNextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        // marginVertical: 65,
        paddingTop: spacing.large,
        gap: spacing.xtraLarge,
        paddingBottom: spacing.medium,
    }
})