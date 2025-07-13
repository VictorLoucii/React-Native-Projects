
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useRef } from 'react'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeStore } from '../themes/ThemeStore';
import { useNavigation, useTheme, useRoute, RouteProp } from '@react-navigation/native';
import { CustomTheme } from '../themes/CustomTheme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FONTsize, spacing } from '../constants/dimensions';
import { FONTS } from '../constants/fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Video, { OnLoadData, OnProgressData } from 'react-native-video'; 
import Slider from '@react-native-community/slider'; 

//import type file:
import { VideoPlayerScreenRouteProp } from '../navigation/navigationTypes';

const VideoPlayerScreen = () => {
    const insets = useSafeAreaInsets();
    const { isDarkMode } = useThemeStore();
    const { colors } = useTheme() as CustomTheme;
    const navigation = useNavigation();
    const route = useRoute<VideoPlayerScreenRouteProp>();
    const { sermon } = route.params;

    // Ref and State for slider functionality
    const videoRef = useRef<Video>(null);
    const [progress, setProgress] = useState({ currentTime: 0, duration: 0 });
    const [isSeeking, setIsSeeking] = useState(false);

    // When the user starts sliding
    const onSlidingStart = () => {
        setIsSeeking(true);
    };

    //When the user releases the slider
    const onSlidingComplete = async (value: number) => {
        if (videoRef.current) {
            videoRef.current.seek(value);
        }
        setIsSeeking(false);
    };

    // Update the slider's position as the video plays
    const handleProgress = (data: OnProgressData) => {
        if (!isSeeking) {
            setProgress(prev => ({ ...prev, currentTime: data.currentTime }));
        }
    };

    //Get the total duration of the video when it loads
    const handleLoad = (data: OnLoadData) => {
        setProgress(prev => ({ ...prev, duration: data.duration }));
    };

    //  Format time from seconds to MM:SS
    const formatTime = (seconds: number) => {
        const date = new Date(seconds * 1000);
        const hh = date.getUTCHours();
        const mm = date.getUTCMinutes();
        const ss = date.getUTCSeconds().toString().padStart(2, '0');
        if (hh) {
            return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
        }
        return `${mm}:${ss}`;
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.bkGroundClr }]}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} translucent={true} backgroundColor='transparent' />
            <TouchableOpacity style={[styles.backButtonTouchable, { top: insets.top }]} onPress={() => navigation.goBack()}>
                <Ionicons name={'return-up-back'} size={30} style={[styles.backButtonStyling, { color: colors.icon }]} />
            </TouchableOpacity>
            <View style={styles.headingContainer}>
                <Text style={[styles.headingStyle, { color: colors.textPrimary }]}>{sermon.title}</Text>
            </View>

            <Video
                ref={videoRef} 
                source={{ uri: sermon.video_url }}
                style={styles.videoStyle}
                controls={true}   //set to true if you want to use the default slider
                resizeMode="contain"
                onLoad={handleLoad} 
                onProgress={handleProgress} // --- NEW ---
                onError={(e) => console.log('Video Error:', e)}
            />

            {/* --- CUSTOM SLIDER COMPONENT --- */}
            {/* <View style={styles.sliderContainer}>
                <Text style={[styles.timeText, { color: colors.textPrimary }]}>{formatTime(progress.currentTime)}</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={progress.duration}
                    value={progress.currentTime}
                    minimumTrackTintColor="#A96F00"
                    maximumTrackTintColor={colors.textPrimary}
                    thumbTintColor="#A96F00"
                    onSlidingStart={onSlidingStart}
                    onSlidingComplete={onSlidingComplete}
                />
                <Text style={[styles.timeText, { color: colors.textPrimary }]}>{formatTime(progress.duration)}</Text>
            </View> */}

            <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
                {/* ... The rest of your details view remains the same ... */}
                <View style={styles.detailsContainer}>
                    <View style={styles.iconAndTitle}><Ionicons name={'book-outline'} size={29} color={colors.icon} /><Text style={[styles.subTitle, { color: colors.textPrimary }]}>{sermon.title}</Text></View>
                    <View style={styles.dateIconAndText}><MaterialIcons name={'person-outline'} size={29} color={colors.icon} /><Text style={[styles.dateText, { color: colors.textPrimary }]}>{sermon.pastor}</Text></View>
                    <View style={styles.dateIconAndText}><MaterialIcons name={'calendar-month'} size={29} color={colors.icon} /><Text style={[styles.dateText, { color: colors.textPrimary }]}>{sermon.date}</Text></View>
                    <Text style={[styles.descriptionText, { color: colors.textPrimary, marginTop: spacing.medium }]}>When we walk with the lord we learn to trust his word.When we walk with the lord we learn to trust his word.When we walk with the lord we learn to trust his word.When we walk with the lord we learn to trust his word.</Text>
                    <TouchableOpacity style={styles.commentButton}><Text style={styles.commentText}>LEAVE A COMMENT</Text></TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default VideoPlayerScreen

const styles = StyleSheet.create({
    container: { flex: 1 },
    backButtonTouchable: { zIndex: 1, position: 'absolute', left: 24 },
    backButtonStyling: {},
    headingContainer: {},
    headingStyle: { fontSize: FONTsize.medium, fontFamily: FONTS.interSemiBold, textAlign: 'center', paddingVertical: spacing.small },
    videoStyle: { height: 235, backgroundColor: 'black' },

    // ---STYLES FOR SLIDER ---
    sliderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: spacing.medium,
        marginTop: spacing.small,
    },
    slider: {
        flex: 1,
        marginHorizontal: spacing.small,
    },
    timeText: {
        fontFamily: FONTS.interRegular,
        fontSize: FONTsize.small,
    },
    // --- END Slider STYLES ---

    detailsContainer: { marginTop: spacing.large, paddingHorizontal: spacing.biggerMedium, gap: spacing.medium },
    iconAndTitle: { flexDirection: 'row', gap: spacing.medium, alignItems: 'center' },
    subTitle: { fontSize: FONTsize.large, fontFamily: FONTS.interSemiBold },
    dateIconAndText: { flexDirection: 'row', gap: spacing.medium, alignItems: 'center' },
    dateText: { fontSize: FONTsize.medium, fontFamily: FONTS.interLightItalic },
    descriptionText: { fontSize: FONTsize.biggerMedium, fontFamily: FONTS.interRegular },
    commentButton: { height: 51, borderColor: '#A96F00', borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginTop: spacing.large },
    commentText: { color: '#A96F00', fontFamily: FONTS.interRegular, fontSize: FONTsize.biggerMedium }
})