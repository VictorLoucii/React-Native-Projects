import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming } from 'react-native-reanimated'

type MovingTextProps = {
    text: string;
    animationThreshold: number;
    style?: StyleProp<TextStyle>;  //import StyleProp and TextStyle from react-native
};

const MovingText: React.FC<MovingTextProps> = ({ text, animationThreshold, style }) => {

    const translateX = useSharedValue(0);
    const shouldWeAnimate = text.length >= animationThreshold;
    const textWidth = text.length * 3;

    useEffect(() => {
        if (!shouldWeAnimate) {
            translateX.value = 0; // For short titles, no animation, start at 0
            return;
        }

        // For long titles, set an initial offset (e.g., 150) to prevent clipping
        translateX.value = 150;

        translateX.value = withDelay(
            1000,
            withRepeat(
                withTiming(
                    -textWidth, {
                    duration: 5000,
                    easing: Easing.linear,
                }),
                -1,
                true
            )
        )
    }, [translateX, text, textWidth, shouldWeAnimate]) // Added shouldWeAnimate to dependencies

    const animatedStyling = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }]
        }

    })


    return (
        <View style={styles.container}>

            <Animated.Text
                numberOfLines={1}
                style={[
                    animatedStyling,
                    style,
                    shouldWeAnimate && {
                        width: 9999,
                        // textAlign: 'left'
                    },
                ]}

            >
                {text}
            </Animated.Text>
        </View>
    )
}

export default MovingText

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        // width: '100%'
    }
})