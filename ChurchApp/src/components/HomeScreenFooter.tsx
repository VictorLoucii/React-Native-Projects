import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { FONTsize, spacing } from '../constants/dimensions';
import { FONTS } from '../constants/fonts';
// import TabButton from './tabButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';  //import this and put this as the type for 'state' and 'navigation' otherwise you'll get ts errors

//this FC has become our custom TabNavigator
const HomeScreenFooter = ({ state, navigation }: BottomTabBarProps) => {
    console.log('state:---',state);
    console.log('navigation:---',navigation);


    const insets = useSafeAreaInsets();
    // Define the padding you want *above* the content, and the padding you want *below* the content (before the safe area starts).
    const VERTICAL_PADDING = 10;

    // const [activeTab, setActiveTab] = useState('Home');
    const activeColor = '#A96F00';
    const inactiveColor = '#FFFFFF';

    const activeRouteName = state.routes[state.index].name;

    return (
        <View style={[styles.container, { paddingBottom: insets.bottom + VERTICAL_PADDING }]}>

            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                style={styles.iconAndTextContainer}

            >
                <MaterialIcons
                    name={'home'}
                    size={30}
                    color={activeRouteName === 'Home' ? activeColor : inactiveColor}
                />
                <Text style={[styles.textStyle, { color: activeRouteName === 'Home' ? activeColor : inactiveColor }]}>
                    Home
                </Text>
            </TouchableOpacity>


            <TouchableOpacity
                onPress={() => navigation.navigate('Connect')}
                style={styles.iconAndTextContainer}
            >
                <Ionicons
                    name={'people'}
                    size={30}
                    color={activeRouteName === 'Connect' ? activeColor : inactiveColor}
                />
                <Text style={[styles.textStyle, { color: activeRouteName === 'Connect' ? activeColor : inactiveColor }]}>
                    Connect
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('Give')}
                style={styles.iconAndTextContainer}
            >
                <Ionicons
                    name={'gift'}
                    size={30}
                    color={activeRouteName === 'Give' ? activeColor : inactiveColor}
                />
                <Text style={[styles.textStyle, { color: activeRouteName === 'Give' ? activeColor : inactiveColor }]}>
                    Give
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('Media')}
                style={styles.iconAndTextContainer}
            >
                <FontAwesome
                    name={'play-circle-o'}
                    size={30}
                    color={activeRouteName === 'Media' ? activeColor : inactiveColor}
                />
                <Text style={[styles.textStyle, { color: activeRouteName === 'Media' ? activeColor : inactiveColor }]}>
                    Media
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('More')}
                style={styles.iconAndTextContainer}
            >
                <MaterialIcons
                    name={'more-vert'}
                    size={30}
                    color={activeRouteName === 'More' ? activeColor : inactiveColor}
                />
                <Text style={[styles.textStyle, { color: activeRouteName === 'More' ? activeColor : inactiveColor }]}>
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
        backgroundColor:'#000000'
    },
    iconAndTextContainer: {
        gap: spacing.xtraSmall,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1, //This makes each button expand to take up an equal amount of space in the footer, which is a better way to achieve the space-around effect.

    },
    textStyle: {
        fontSize: FONTsize.small,
        fontFamily: FONTS.interRegular,
        textAlign: 'center'
        // color: '#FFFFFF',
    },

})