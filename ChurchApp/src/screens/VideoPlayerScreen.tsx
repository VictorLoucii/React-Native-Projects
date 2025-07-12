import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useThemeStore } from '../themes/ThemeStore';
import { useNavigation, useTheme } from '@react-navigation/native';
import { CustomTheme } from '../themes/CustomTheme';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { FONTsize, spacing } from '../constants/dimensions';
import { FONTS } from '../constants/fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'



const VideoPlayerScreen = () => {

    const insets = useSafeAreaInsets();
    const { isDarkMode, toggleTheme } = useThemeStore();
    const { colors } = useTheme() as CustomTheme;
    const navigation = useNavigation();



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
                    Trusting the Word Of God
                </Text>
            </View>

            <Image
                source={require('../../assets/sermon.jpg')}
                style={styles.imageStyle}
            />

            <ScrollView
                contentContainerStyle={{
                    paddingBottom:200,
                }}
            >
                <View style={styles.detailsContainer}>

                    <View style={styles.iconAndTitle}>
                        <Ionicons
                            name={'book-outline'}
                            size={29}
                            color={colors.icon}
                        />
                        <Text style={[styles.subTitle, { color: colors.textPrimary }]}>
                            Good Friday Meeting
                        </Text>
                    </View>

                    <View style={styles.dateIconAndText}>
                        <MaterialIcons
                            name={'calendar-month'}
                            size={29}
                            color={colors.icon}
                        />
                        <Text style={[styles.dateText, { color: colors.textPrimary }]}>
                            12-09-2023
                        </Text>
                    </View>

                    <View style={styles.timeIconAndText}>
                        <Feather
                            name={'clock'}
                            size={29}
                            color={colors.icon}
                        />
                        <Text style={[styles.timeText, { color: colors.textPrimary }]}>
                            10:00 AM
                        </Text>
                    </View>

                    <Text style={[styles.timeText, { color: colors.textPrimary }]}>
                        Theme: An Audience of One
                    </Text>

                    <Text style={[styles.timeText, { color: colors.textPrimary }]}>
                        Join us for our Good Friday Meeting—an inspiring morning of fellowship, encouragement, and empowerment. Enjoy a delicious breakfast as we gather to celebrate the strength and beauty of JESUS in our community. All are welcome!
                    </Text>

                    <TouchableOpacity style={styles.commentButton}>
                        <Text style={styles.commentText}>
                            LEAVE A COMMENT
                        </Text>

                    </TouchableOpacity>

                </View>

            </ScrollView>






        </View>
    )
}

export default VideoPlayerScreen

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
        height: 330,
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
    commentButton: {
        height: 51,
        borderColor: '#A96F00',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    commentText: {
        color: '#A96F00',
        fontFamily: FONTS.interRegular,
        fontSize: FONTsize.biggerMedium
    }
})