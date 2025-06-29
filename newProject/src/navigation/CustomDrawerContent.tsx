import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer'
// import { colors } from '../constants/colors'
import { FONTsize, iconSizes, spacing } from '../constants/dimensions'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Octicons from 'react-native-vector-icons/Octicons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { fonts } from '../constants/fonts'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useTheme } from '@react-navigation/native'
import { CustomTheme } from 'src/theme/CustomTheme'
import { useThemeStore } from '../theme/ThemeStore'



const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {


    const { isDarkMode, toggleTheme } = useThemeStore();

    const { colors } = useTheme() as CustomTheme;

    const { navigation } = props;

    const goToAllSongsScreen = () => {
        navigation.navigate('HomeScreen_Drawer', { screen: 'AllSongsScreen' });
    }
    const goToPlayerScreen = () => {
        navigation.navigate('HomeScreen_Drawer', { screen: 'PlayerScreen' });
    }
    const goToLikedScreen = () => {
        navigation.navigate('HomeScreen_Drawer', { screen: 'LikedScreen' });
    }
    const goToHomeScreen = () => {
        navigation.navigate('HomeScreen_Drawer', { screen: 'HomeScreen' });
    }
    const close = () => {
        navigation.closeDrawer();
    }

    // const isDarkMode = true;


    return (
        <DrawerContentScrollView style={[styles.container, { backgroundColor: colors.bkGroundClr }]}>
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    onPress={close}
                >
                    <AntDesign
                        name='close'
                        size={iconSizes.large}
                        color={colors.iconPrimary}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => toggleTheme()}
                >
                    <Octicons
                        name={isDarkMode ? 'moon' : 'sun'}
                        size={iconSizes.large}
                        color={colors.iconPrimary}
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.profileContainer}
            >
                <Ionicons
                    name={'person-outline'}
                    size={iconSizes.large}
                    color={colors.iconPrimary}
                />
                <Text
                    style={[styles.textStyle, { color: colors.textPrimary }]}
                >
                    Profile
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={goToAllSongsScreen}
                style={styles.playerScreenContainer}
            >
                <MaterialIcons
                    name={'library-music'}
                    size={iconSizes.large}
                    color={colors.iconPrimary}
                />
                <Text
                    style={[styles.textStyle, { color: colors.textPrimary }]}
                >
                    All Songs
                </Text>
            </TouchableOpacity>


            <TouchableOpacity
                onPress={goToPlayerScreen}
                style={styles.playerScreenContainer}
            >
                <MaterialIcons
                    name={'audiotrack'}
                    size={iconSizes.large}
                    color={colors.iconPrimary}
                />
                <Text
                    style={[styles.textStyle, { color: colors.textPrimary }]}
                >
                    Player Screen
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.LikedSongsContainer}
                onPress={goToLikedScreen}
            >
                <AntDesign
                    name={'hearto'}
                    size={iconSizes.large}
                    color={colors.iconPrimary}
                />
                <Text
                    style={[styles.textStyle, { color: colors.textPrimary }]}
                >
                    Liked Songs
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.LikedSongsContainer}
                onPress={goToHomeScreen}
            >
                <AntDesign
                    name={'home'}
                    size={iconSizes.large}
                    color={colors.iconPrimary}
                />
                <Text
                    style={[styles.textStyle, { color: colors.textPrimary }]}
                >
                    Home Screen
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.languageContainer}
            >
                <Fontisto
                    name={'language'}
                    size={iconSizes.large}
                    color={colors.iconPrimary}
                />

                <Text
                    style={[styles.textStyle, { color: colors.textPrimary }]}
                >
                    Language
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.languageContainer}
            >
                <AntDesign
                    name={'contacts'}
                    size={iconSizes.large}
                    color={colors.iconPrimary}
                />

                <Text
                    style={[styles.textStyle, { color: colors.textPrimary }]}
                >
                    Contact-Us
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.languageContainer}
            >
                <MaterialCommunityIcons
                    name={'lightbulb-on-outline'}
                    size={iconSizes.large}
                    color={colors.iconPrimary}
                />

                <Text
                    style={[styles.textStyle, { color: colors.textPrimary }]}
                >
                    FAQs
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.languageContainer}
            >
                <Feather
                    name={'settings'}
                    size={iconSizes.large}
                    color={colors.iconPrimary}
                />

                <Text
                    style={[styles.textStyle, { color: colors.textPrimary }]}
                >
                    Settings
                </Text>
            </TouchableOpacity>


        </DrawerContentScrollView>

    )


}

export default CustomDrawerContent

const styles = StyleSheet.create({
    container: {
        // backgroundColor: colors.bkGroundClr,
        padding: spacing.large,

    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.xtraLarge,
    },
    profileContainer: {
        flexDirection: 'row',
        gap: spacing.large,
        alignItems: 'center',
        marginBottom: spacing.large,

    },
    playerScreenContainer: {
        flexDirection: 'row',
        gap: spacing.large,
        alignItems: 'center',
        marginBottom: spacing.large,

    },
    textStyle: {
        fontFamily: fonts.Medium,
        fontSize: FONTsize.xtraLarge,
        // color: colors.textPrimary,

    },
    LikedSongsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.large,
        marginBottom: spacing.large,

    },
    languageContainer: {
        flexDirection: 'row',
        gap: spacing.large,
        alignItems: 'center',
        marginBottom: spacing.large,


    },


})