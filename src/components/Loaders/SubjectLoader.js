import React, { useEffect, useState } from "react";
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';
import {
    Animated,
    Dimensions,
    View
} from "react-native";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
export const SubjectLoader = () => {

    const firstLineRef = React.createRef()
    const screenWidth = Dimensions.get('window').width;

    React.useEffect(() => {
        const facebookAnimated = Animated.stagger(
            400,
            [
                Animated.parallel([
                    firstLineRef.current.getAnimated(),
                ])
            ]
        );
        Animated.loop(facebookAnimated).start();
    }, [])

    return (
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <ShimmerPlaceholder
                ref={firstLineRef}
                style={{ borderRadius: 4, width: screenWidth - 50 }}
                stopAutoRun
                height={60}
            />
        </View>

    )
}


export default SubjectLoader;