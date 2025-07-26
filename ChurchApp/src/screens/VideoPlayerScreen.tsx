
import { ActivityIndicator, Alert, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeStore } from '../themes/ThemeStore';
import { useNavigation, useTheme, useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import { CustomTheme } from '../themes/CustomTheme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FONTsize, spacing } from '../constants/dimensions';
import { FONTS } from '../constants/fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Video, { OnLoadData, OnProgressData, VideoRef } from 'react-native-video';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';
// 1. IMPORT THE NEW LIBRARY for hiding status bar elements in full screen
import SystemNavigationBar from 'react-native-system-navigation-bar';
//import type file:
import { VideoPlayerScreenRouteProp, Comment } from '../navigation/navigationTypes';
// --- 1. IMPORT THE HOOK (for hiding tab bar) ---
import { useTabBarVisibility } from '../contexts/TabBarVisibilityContext';
import { supabase } from '../../supabase';


import CommentList from '../components/CommentList';
import CommentModal from '../components/CommentModal';



const VideoPlayerScreen = () => {
    const insets = useSafeAreaInsets();
    const { isDarkMode } = useThemeStore();
    const { colors } = useTheme() as CustomTheme;
    const navigation = useNavigation();
    const route = useRoute<VideoPlayerScreenRouteProp>();
    const { sermon } = route.params;

    //states and ref for video 
    const [isPaused, setIsPaused] = useState(false);
    const [isClicked, setIsCliked] = useState(false);
    const [progress, setProgress] = useState({ currentTime: 0 });    // Ref and State for slider functionality
    const [duration, setDuration] = useState(0); // hold the total duration
    const [isSeeking, setIsSeeking] = useState(false);
    const [fullScreen, setFullScreen] = useState(false)
    const [comments, setComments] = useState<Comment[]>([]); // Use the specific Comment type
    const [loadingComments, setLoadingComments] = useState(true);
    const [isCommentModalVisible, setCommentModalVisible] = useState(false);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [editingComment, setEditingComment] = useState<Comment | null>(null);


    const videoRef = useRef<VideoRef>(null);

    // --- 2. GET THE "SETTER" FUNCTION FROM THE CONTEXT  (for hiding tab bar)---
    const { setIsTabBarVisible } = useTabBarVisibility();

    // Use this instead of the useEffect (for hiding tab bar and status bar elements)
    // 3. THIS HOOK NOW CONTROLS EVERYTHING
    useFocusEffect(
        useCallback(() => {
            if (fullScreen) {
                // Hide Tab Bar navigator
                setIsTabBarVisible(false);
                // Go immersive mode on Android
                SystemNavigationBar.immersive();
            } else {
                // Show Tab Bar
                setIsTabBarVisible(true);
                // Show navigation bar on Android
                SystemNavigationBar.navigationShow();
            }

            // Cleanup function: runs when the screen is left
            return () => {
                setIsTabBarVisible(true);
                SystemNavigationBar.navigationShow();
            };
        }, [fullScreen]) // Effect depends on the 'fullScreen' state
    );

    // useEffect to get the current user
    useEffect(() => {
        const getCurrentUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setCurrentUserId(user ? user.id : null);
        };
        getCurrentUser();
    }, []); // Runs once when the screen loads


    //function for deleting commment
    const handleDeleteComment = useCallback(async (commentId: number) => {  //need to use 'useCallback' for React.memo() to work in CommentList and CommentItem
        Alert.alert(
            "Delete Comment",
            "Are you sure you want to delete this comment?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        const { error } = await supabase
                            .from('comments')
                            .delete()
                            .eq('id', commentId);

                        if (error) {
                            Alert.alert("Error", "Failed to delete comment.");
                        } else {
                            // Instantly remove from the UI
                            setComments(prevComments => prevComments.filter(c => c.id !== commentId));
                        }
                    },
                },
            ]
        );
    }, []); // Empty dependency array means this function is created only once

    const handleOpenEditModal = useCallback((commentToEdit: Comment) => {  //need to use 'useCallback' for React.memo() to work in CommentList and CommentItem
        setEditingComment(commentToEdit); // Store the comment being edited
    }, []); // Empty dependency array


    const handleUpdateComment = useCallback(async (newContent: string) => {   //need to use 'useCallback' for React.memo() to work in CommentList and CommentItem
        if (!editingComment) return; // Safety check

        const { data, error } = await supabase
            .from('comments')
            .update({ content: newContent })
            .eq('id', editingComment.id)
            .select() // Ask Supabase to return the updated row
            .single(); // Since we expect only one row

        if (error) {
            Alert.alert("Error", "Failed to update comment.");
        } else if (data) {
            // Update the comment in the local state for an instant UI change
            setComments(prevComments =>
                prevComments.map(c => (c.id === editingComment.id ? { ...c, content: newContent } : c))
            );
            setEditingComment(null); // Close the modal by clearing the editing state
        }
    }, [editingComment]); // This depends on `editingComment`, so it will be re-created when that changes


    //  FUNCTION TO FETCH COMMENTS 
    const fetchComments = async () => {
        setLoadingComments(true); // Spinner ON

        const { data, error } = await supabase  // here data is an array of raw comment objects from the database)
            .from('comments')  //from 'comments' table
            .select(`
            id,
            created_at,
            content,
            user_id,
            profiles ( username, avatar_url )  
        `)   //from table 'profiles' select username and avatar_url columns
            .eq('sermon_id', sermon.id)   //.eq means equal
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error fetching comments:", error.message);
            setComments([]);
        } else if (data) {
            const transformedData: Comment[] = data.map(comment => {
                const profile = Array.isArray(comment.profiles)
                    ? comment.profiles[0]
                    : comment.profiles;

                return {
                    ...comment,
                    profiles: profile
                        ? { username: profile.username, avatar_url: profile.avatar_url }
                        : { username: 'Anonymous User', avatar_url: null }
                };
            });
            console.log('transformedData:-----', transformedData);
            setComments(transformedData);
        }

        setLoadingComments(false);
    };

    // USEEFFECT TO CALL FETCHCOMMENTS ON SCREEN LOAD ---
    useEffect(() => {
        if (!fullScreen) { // Only fetch comments if not in fullscreen
            fetchComments();
        }
    }, [sermon.id, fullScreen]);

    // FUNCTION TO HANDLE NEW COMMENT SUBMISSION 
    const handleCommentSubmit = async (commentText: string) => {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            Alert.alert("You must be logged in to comment.");
            return;
        }

        const { error } = await supabase
            .from('comments')
            .insert({
                content: commentText,
                sermon_id: sermon.id,
                user_id: user.id
            });

        if (error) {
            Alert.alert("Error posting comment: " + error.message);
        } else {
            // Refresh the comments list to show the new one
            await fetchComments();
            // Close the modal
            setCommentModalVisible(false);
        }
    };


    const format = (seconds: number) => {
        // console.log('seconds:', seconds);
        let mins = parseInt((seconds / 60).toString(), 10)
            .toString()
            .padStart(2, '0');
        let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    // When the user starts dragging the slider
    const onSlidingStart = () => {
        setIsSeeking(true);
    };

    // When the user releases the slider
    const onSlidingComplete = (value: number) => {
        videoRef.current?.seek(value);
        setIsSeeking(false);
    };


    return (
        <View style={[styles.container, { backgroundColor: colors.bkGroundClr }, fullScreen ? styles.fullscreenContainer : { paddingTop: insets.top }]}>
            {/* 
            // ADD THE 'hidden' PROP TO HIDE THE TOP STATUS BAR IN FULLSCREEN
            */}
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                translucent={true}
                backgroundColor='transparent'
                hidden={fullScreen}
            />

            {/* conditional rendering based on fullscreen */}
            {/* --- HIDE back button and title IN FULLSCREEN --- */}
            {!fullScreen && (
                <>
                    {/* CORRECTED LINE: Removed extra '}' from onPress */}
                    <TouchableOpacity style={[styles.backButtonTouchable, { top: insets.top }]} onPress={() => navigation.goBack()}>
                        <Ionicons name={'return-up-back'} size={30} style={[styles.backButtonStyling, { color: colors.icon }]} />
                    </TouchableOpacity>
                    <View style={styles.headingContainer}>
                        {/* CORRECTED LINE: Ensure no extra '}' at the end of the style prop */}
                        <Text style={[styles.headingStyle, { color: colors.textPrimary }]}>{sermon.title}</Text>
                    </View>
                </>
            )}

            {/* The video player remains here unhidden */}
            {/* below view is parent for video player and it's controls */}
            <View style={{ width: '100%', height: fullScreen ? '100%' : 235, backgroundColor: 'black', }}>

                {/* Item 1: The Video. It sits at the bottom of the stack. */}
                <Video
                    ref={videoRef}
                    source={{ uri: sermon.video_url }} //note: encode the video from some software(e.g: handbrake) before uploading to supabase
                    // source={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }} // Use this test video
                    style={[styles.videoStyle]}
                    controls={false}  //make it false, so that we can use custom controls for our video 
                    resizeMode="contain"

                    //capturing the video's total duration in the onLoad event and storing it in the duration state
                    onLoad={(data) => {
                        console.log('onLoad data:', data);
                        console.log('data duration:', data.duration);
                        setDuration(data.duration);
                    }}
                    // onProgress handler only saves the current time:
                    onProgress={(data: OnProgressData) => {
                        // console.log('onProgess data: ', data);
                        // Check if the user is NOT seeking before updating progress

                        if (!isSeeking) {
                            // assume at start data.currentTime is 0
                            let newCurrentTime = data.currentTime;  // newCurrentTime is now 0
                            // console.log('newCurrentTime: ', newCurrentTime);

                            // On some platforms, currentTime method is invalid, so we use currentPlaybackTime as a fallback
                            // if (isNaN(newCurrentTime) || newCurrentTime < 0) {
                            //     newCurrentTime = data.currentPlaybackTime;
                            // }

                            // Only update state if we have a valid, positive time
                            if (!isNaN(newCurrentTime) && newCurrentTime >= 0) {
                                setProgress({ currentTime: newCurrentTime });
                            }
                        }
                    }}
                    onError={(e) => console.log('Video Error:', e)}
                    paused={isPaused} //When isPaused becomes true, the video pauses, when isPaused becomes false, the video plays.
                    muted={false}
                />

                {/* Item 2: A dedicated, invisible transparent Touchable layer on top */}
                <TouchableOpacity
                    style={styles.touchableOverlay}
                    activeOpacity={1}
                    onPress={() => setIsCliked(!isClicked)}
                >
                    {isClicked && (
                        // This is the visible black overlay with the controls
                        <View style={styles.controlsOverlay}>

                            <View style={{ flexDirection: 'row', gap: spacing.xtraLarge }}>

                                {/* backward button */}
                                <TouchableOpacity
                                    onPress={(e) => {
                                        console.log('e:', e)
                                        e.stopPropagation();  // Stop the tap from bubbling up to the main overlay

                                        // Seek back 10 seconds, but don't go below 0
                                        const newTime = Math.max(0, progress.currentTime - 10);
                                        console.log('Seeking backward to:', newTime);
                                        console.log('videoRef.current: ', videoRef.current);
                                        videoRef.current?.seek(newTime);
                                        //check RNjs doc "what is videoRef.current?"

                                    }}
                                >
                                    <Image
                                        source={require('../../assets/backward.png')
                                        }
                                        style={{ width: 30, height: 30, tintColor: 'white' }}
                                    />
                                </TouchableOpacity>

                                {/* play-pause button */}
                                <TouchableOpacity
                                    onPress={(e) => {
                                        e.stopPropagation();
                                        setIsPaused(!isPaused);
                                    }}
                                >
                                    <Image
                                        source={isPaused ? require('../../assets/play.png') : require('../../assets/video-pause-button.png')
                                        }
                                        style={{ width: 30, height: 30, tintColor: 'white' }}
                                    />
                                </TouchableOpacity>

                                {/* forward button */}
                                <TouchableOpacity
                                    onPress={(e) => {
                                        e.stopPropagation();  // Stop the tap from bubbling up to the main overlay

                                        // Only seek if we have a valid duration    
                                        const newTime = progress.currentTime + 10;
                                        videoRef.current?.seek(newTime);

                                    }}
                                >
                                    <Image
                                        source={require('../../assets/forward.png')
                                        }
                                        style={{ width: 30, height: 30, tintColor: 'white' }}
                                    />
                                </TouchableOpacity>
                                {/* end of backward,play,pause,forward buttons                 */}
                            </View>

                            <View style={styles.timeAndSlider}>
                                <Text style={styles.videoTime}>
                                    {format(progress.currentTime)}
                                </Text>
                                <Slider
                                    style={{ width: '80%', height: 40 }}
                                    minimumValue={0}
                                    maximumValue={duration}
                                    value={progress.currentTime} // Connect the slider's position to the video's progress
                                    minimumTrackTintColor="#FFFFFF"
                                    maximumTrackTintColor="rgba(255, 255, 255, 0.9)" // A slightly dimmer color for the inactive part
                                    thumbTintColor="#FFFFFF"
                                    //dont use onValueChange because it's resource internsive and inefficent rather use the onSlidingStart and onSlidingComplete pattern
                                    // onValueChange={(x) => {
                                    //     videoRef.current.seek(x);
                                    // }}
                                    onSlidingStart={onSlidingStart}
                                    onSlidingComplete={onSlidingComplete}

                                />
                                <Text style={styles.videoTime}>
                                    {format(duration)}
                                </Text>

                            </View>

                            <View style={styles.orientation}>
                                <TouchableOpacity
                                    style={styles.fullScreenButtonContainer}
                                    onPress={(e) => {
                                        e.stopPropagation();  // Stop the tap from bubbling up to the main overlay
                                        if (fullScreen) {
                                            Orientation.lockToPortrait();
                                        } else {
                                            Orientation.lockToLandscape();
                                        }
                                        setFullScreen(!fullScreen)
                                    }}
                                >
                                    <Image
                                        source={fullScreen ? require('../../assets/minimize.png') : require('../../assets/full-size.png')}
                                        style={{ height: 24, width: 24, tintColor: 'white' }}
                                    />

                                </TouchableOpacity>

                            </View>


                        </View>
                    )}
                </TouchableOpacity>
            </View>


            {/* --- HIDE the scrollview and all its content IN FULLSCREEN --- */}
            {!fullScreen && (
                <>
                    <ScrollView contentContainerStyle={{ paddingBottom: 200, alignItems: 'center' }}
                        showsVerticalScrollIndicator={false}
                    >

                        <View style={styles.detailsContainer}>

                            <View style={styles.iconAndTitle}>
                                <Ionicons name={'book-outline'} size={29} color={colors.icon} />
                                <Text style={[styles.subTitle, { color: colors.textPrimary }]}>{sermon.title}
                                </Text>
                            </View>
                            <View style={styles.dateIconAndText}>
                                <MaterialIcons name={'person-outline'} size={29} color={colors.icon} />
                                <Text style={[styles.dateText, { color: colors.textPrimary }]}>{sermon.pastor}
                                </Text>
                            </View>
                            <View style={styles.dateIconAndText}>
                                <MaterialIcons name={'calendar-month'} size={29} color={colors.icon} />
                                <Text style={[styles.dateText, { color: colors.textPrimary }]}>{sermon.date}
                                </Text>
                            </View>
                            <Text style={[styles.descriptionText, { color: colors.textPrimary, marginTop: spacing.small }]}>
                                When we walk with the lord we learn to trust his word.When we walk with the lord we learn to trust his word.When we walk with the lord we learn to trust his word.When we walk with the lord we learn to trust his word.
                            </Text>
                            <TouchableOpacity style={styles.commentButton}
                                onPress={() => setCommentModalVisible(true)} // Open the modal
                            >
                                <Text style={styles.commentText}>
                                    LEAVE A COMMENT
                                </Text>
                            </TouchableOpacity>

                            {/*  ADD THE COMMENT LIST: */}
                            <View style={styles.commentsSection}>
                                <Text style={[styles.commentsHeader, { color: colors.textPrimary }]}>Comments ({comments.length})</Text>
                                {loadingComments ? (
                                    <ActivityIndicator style={{ marginTop: 20 }} size="large" color={colors.textPrimary} />
                                ) : (
                                    <CommentList
                                        comments={comments}
                                        loading={loadingComments}
                                        currentUserId={currentUserId} // Pass the user ID down
                                        onDeleteComment={handleDeleteComment} // Pass the delete function down
                                        onEditComment={handleOpenEditModal}

                                    />
                                )}
                            </View>



                        </View>
                    </ScrollView>
                </>
            )}
            {/* ==================================================================== */}
            {/* THIS IS THE NEW, CORRECT LOCATION FOR THE MODAL                    */}
            {/* It is a child of the main View, but outside the ScrollView         */}
            {/* ==================================================================== */}
            {/* This single modal now handles both adding and editing comments */}
            <CommentModal
                // Decide which state controls visibility
                isVisible={isCommentModalVisible || !!editingComment}
                // Decide which function to call on close
                onClose={() => {
                    setCommentModalVisible(false);
                    setEditingComment(null);
                }}
                // Decide which submit handler to use
                onSubmit={editingComment ? handleUpdateComment : handleCommentSubmit}
                // Pass the initial text ONLY if we are editing
                initialValue={editingComment ? editingComment.content : ''}
                // Pass the title ONLY if we are editing
                title={editingComment ? 'Edit Your Comment' : 'Leave a Comment'}
            />


        </View>
    )
}

export default VideoPlayerScreen

const styles = StyleSheet.create({
    container: { flex: 1 },
    fullscreenContainer: {  //this style is required to remove padding top when in full screen mode
        // paddingTop: 0, // Explicitly remove top padding in fullscreen
    },
    backButtonTouchable: { zIndex: 1, position: 'absolute', left: 24 },
    backButtonStyling: {},
    headingContainer: {},
    headingStyle: { fontSize: FONTsize.medium, fontFamily: FONTS.interSemiBold, textAlign: 'center', paddingVertical: spacing.small },

    videoStyle: { width: '100%', height: '100%', backgroundColor: 'black' },


    detailsContainer: { marginTop: spacing.large, paddingHorizontal: spacing.medium, gap: spacing.medium, width: '100%' },
    iconAndTitle: { flexDirection: 'row', gap: spacing.medium, alignItems: 'center' },
    subTitle: { fontSize: FONTsize.large, fontFamily: FONTS.interSemiBold },
    dateIconAndText: { flexDirection: 'row', gap: spacing.medium, alignItems: 'center' },
    dateText: { fontSize: FONTsize.medium, fontFamily: FONTS.interLightItalic },
    descriptionText: { fontSize: FONTsize.biggerMedium, fontFamily: FONTS.interRegular },
    commentButton: { height: 51, borderColor: '#A96F00', borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginTop: spacing.large },
    commentText: { color: '#A96F00', fontFamily: FONTS.interRegular, fontSize: FONTsize.biggerMedium },
    overlay: {
        width: '100%',
        height: '100%',
        position: 'absolute', // This is the key!
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    // videoContainer: {
    //     width: '100%',
    //     height: '100%',
    //     backgroundColor: 'black', // Good to have a fallback color
    // },
    // fullscreenVideoContainer: {
    //     // The style for fullscreen
    //     ...StyleSheet.absoluteFillObject, // Equivalent to top: 0, left: 0, bottom: 0, right: 0
    //     zIndex: 10, // Ensure it's on top of everything

    // },
    //This is the invisible layer that captures taps
    touchableOverlay: {
        position: 'absolute', // This style lifts the TouchableOpacity out of the normal layout flow and makes it float on top of its sibling, the <Video> component
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    //below styles is the visible black overlay that holds the icons
    controlsOverlay: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    timeAndSlider: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: spacing.small,
        // paddingBottom: spacing.small,
        alignItems: 'center',
    },
    videoTime: {
        color: 'white'
    },
    orientation: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        width: '100%',
        position: 'absolute',
        top: 10,
        // right:10,
        paddingRight: spacing.small,
        // paddingBottom: spacing.small,
        alignItems: 'center',

    },
    fullScreenButtonContainer: { // The new, larger touch area or the maximize/minimize button/icon
        padding: 10, // Creates a 10px invisible border around the icon
    },
    // STYLES FOR COMMENTS:
    commentsSection: {
        marginTop: spacing.large,
        paddingTop: spacing.large,
        borderTopWidth: 1,
        borderColor: '#BDC1C6',
    },
    commentsHeader: {
        fontSize: FONTsize.large,
        fontFamily: FONTS.interSemiBold,
        marginBottom: spacing.medium,
    },

})