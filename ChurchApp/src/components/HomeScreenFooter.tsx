import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { FONTsize, spacing } from '../constants/dimensions';
import { FONTS } from '../constants/fonts';
// import TabButton from './tabButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'


const HomeScreenFooter = () => {

    const insets = useSafeAreaInsets();
    // Define the padding you want *above* the content, and the padding you want *below* the content (before the safe area starts).
    const VERTICAL_PADDING = 10;

    const [activeTab, setActiveTab] = useState('Home');
    const activeColor = '#A96F00';
    const inactiveColor = '#FFFFFF';

    return (
        <View style={[styles.container, { paddingBottom: insets.bottom + VERTICAL_PADDING }]}>

            <TouchableOpacity
                onPress={() => setActiveTab('Home')}
                style={styles.iconAndTextContainer}

            >
                <MaterialIcons
                    name={'home'}
                    size={30}
                    color={activeTab === 'Home' ? activeColor : inactiveColor}
                />
                <Text style={[styles.textStyle, { color: activeTab === 'Home' ? activeColor : inactiveColor }]}>
                    Home
                </Text>
            </TouchableOpacity>


            <TouchableOpacity
                onPress={() => setActiveTab('Connect')}
                style={styles.iconAndTextContainer}
            >
                <Ionicons
                    name={'people'}
                    size={30}
                    color={activeTab === 'Connect' ? activeColor : inactiveColor}
                />
                <Text style={[styles.textStyle, { color: activeTab === 'Connect' ? activeColor : inactiveColor }]}>
                    Connect
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => setActiveTab('Give')}
                style={styles.iconAndTextContainer}
            >
                <Ionicons
                    name={'gift'}
                    size={30}
                    color={activeTab === 'Give' ? activeColor : inactiveColor}
                />
                <Text style={[styles.textStyle, { color: activeTab === 'Give' ? activeColor : inactiveColor }]}>
                    Give
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => setActiveTab('Media')}
                style={styles.iconAndTextContainer}
            >
                <FontAwesome
                    name={'play-circle-o'}
                    size={30}
                    color={activeTab === 'Media' ? activeColor : inactiveColor}
                />
                <Text style={[styles.textStyle, { color: activeTab === 'Media' ? activeColor : inactiveColor }]}>
                    Media
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => setActiveTab('More')}
                style={styles.iconAndTextContainer}
            >
                <MaterialIcons
                    name={'more-vert'}
                    size={30}
                    color={activeTab === 'More' ? activeColor : inactiveColor}
                />
                <Text style={[styles.textStyle, { color: activeTab === 'More' ? activeColor : inactiveColor }]}>
                    More
                </Text>
            </TouchableOpacity>

        </View>
    )
}

export default HomeScreenFooter

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // justifyContent: 'space-around', // This creates the even spacing
        alignItems: 'center',
        // height: 76, // Height from Figma, not including safe area
        // backgroundColor: '#000000',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#FFFFFF',
        paddingTop: 15,
        paddingHorizontal: spacing.medium,
    },
    iconAndTextContainer: {
        gap: spacing.xtraSmall,
        alignItems: 'center',
        justifyContent: 'center',
        flex:1, //This makes each button expand to take up an equal amount of space in the footer, which is a better way to achieve the space-around effect.

    },
    textStyle: {
        fontSize: FONTsize.small,
        fontFamily: FONTS.interRegular,
        textAlign: 'center'
        // color: '#FFFFFF',
    },

})