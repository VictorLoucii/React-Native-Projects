import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { FONTS } from '../constants/fonts';
import { FONTsize, spacing } from '../constants/dimensions';

const HomeScreenHeader = () => {

    const insets = useSafeAreaInsets();


    return (
        <View style={[styles.container, { paddingTop: insets.top}]}>
            <View style={styles.userIconAndNotificationContainer}>
                <View style={styles.userIconContainer}>
                    <Image
                        source={require('../../assets/person.png')}
                        style={styles.userIconStyle}
                    />
                </View>
                <View style={styles.notificatoinImageContainer}>
                    <Image
                        source={require('../../assets/notifications_none_24px.png')}
                        style={styles.notificationImageStyle}
                    />
                </View>
            </View>
            <Text style={styles.WelcomeStyle}>
                Welcome User
            </Text>
            <View style={styles.searchIconAndInputContainer}>
                <Image
                    source={require('../../assets/searchIcon.png')}
                    style={styles.searchIconStyle}
                />
                <TextInput
                    placeholder='Search your Query here'
                    onChangeText={() => null}
                    style={styles.textInputStyle}
                />
            </View>
        </View>
    )
}

export default HomeScreenHeader

const styles = StyleSheet.create({
    container: {
        // flex:1,
        // paddingHorizontal:30,

    },
    userIconAndNotificationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.large,
        alignItems: 'center',
        paddingVertical: 10,
    },
    userIconContainer: {
        height: 60,
        width: 60,
        backgroundColor: '#D3D3D3',
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    userIconStyle: {
        height: 64,
        width: 64,
    },
    notificatoinImageContainer: {
        height: 40,
        width: 40,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',

    },
    notificationImageStyle: {
        height: 22.2,
        width: 22.2,
    },
    WelcomeStyle: {
        marginTop: 20,
        fontFamily: FONTS.interSemiBold,
        color: '#FFFFFF',
        fontSize: FONTsize.superXtraLg,
        paddingHorizontal: spacing.large,

    },
    searchIconAndInputContainer: {
        flexDirection: 'row',
        marginTop: 20,
        width: '90%',
        height: 54,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: spacing.large,
        borderRadius: 12,
        alignSelf: 'center',
        alignItems: 'center',
        gap: 13,

    },
    searchIconStyle: {
        color: '#000000',
        height: 29,
        width: 29,
        justifyContent: 'center',
    },
    textInputStyle: {
        flex: 1,
        fontFamily: FONTS.interRegular,
        fontSize: FONTsize.medium,
        justifyContent: 'center'
    },


})