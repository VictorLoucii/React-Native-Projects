import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming } from 'react-native-reanimated'

type MovingTextProps = {
    text: string;
    animationThreshold: number;
    style?:StyleProp<TextStyle>;  //import StyleProp and TextStyle from react-native
};

const MovingText:React.FC<MovingTextProps> = ({ text, animationThreshold, style }) => {

    const translateX = useSharedValue(0);
    const shouldWeAnimate = text.length >= animationThreshold;
    const textWidth = text.length * 3;

    useEffect(() => {
        if (!shouldWeAnimate) return;
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
    }, [translateX, text, textWidth, animationThreshold])


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
                        paddingHorizontal: 5,
                    },
                ]}
            >
                <Text>{text}</Text>
            </Animated.Text>
        </View>
    )
}

export default MovingText

const styles = StyleSheet.create({
    container:{
        overflow:'hidden',
    }
})