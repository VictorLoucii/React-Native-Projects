import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { colors } from '../constants/colors'
import { iconSizes } from '../constants/dimensions'
import TrackPlayer from 'react-native-track-player'
import { useShuffleStore } from '../ZustandStore/ShuffleStore'
import { useTheme } from '@react-navigation/native';
import { CustomTheme } from 'src/theme/CustomTheme';

const PlayerShuffleToggle = () => {

    const { isShuffleOn, toggleShuffle } = useShuffleStore();
    const { colors } = useTheme() as CustomTheme;

    return (
        <View>
            <TouchableOpacity
                onPress={() => toggleShuffle()}
            >
                <MaterialCommunityIcons
                    name={isShuffleOn ? 'shuffle' : 'shuffle-disabled'}
                    size={iconSizes.large}
                    color={colors.iconSecondary}
                />
            </TouchableOpacity>
        </View>
    )
}

export default PlayerShuffleToggle

const styles = StyleSheet.create({})