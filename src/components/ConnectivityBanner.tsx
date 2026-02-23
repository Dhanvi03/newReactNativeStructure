import React, { useEffect, useState,  useEffectEvent } from 'react'; // Note the import!
import { StyleSheet, Animated } from 'react-native';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { AppText } from '@src/blueprints';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ConnectivityBanner = () => {
    const [isConnected, setIsConnected] = useState<boolean | null>(true);
    const [isVisible, setIsVisible] = useState(false);
    const [animation] = useState(new Animated.Value(0));
    const insets = useSafeAreaInsets();

    // 1. Extract the "Event" logic here.
    // This function can read 'animation', 'isVisible', or any future prop/state
    // WITHOUT forcing the useEffect below to re-run.
    const onNetworkChange = useEffectEvent((state: NetInfoState) => {
        setIsConnected(state.isConnected);

        if (!state.isConnected) {
            setIsVisible(true);
            Animated.timing(animation, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(animation, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start(() => setIsVisible(false));
        }
    });

    useEffect(() => {
        // 2. The Effect is now purely about "Subscription"
        // It has NO dependencies, so it never unbinds/rebinds unnecessarily.
        const unsubscribe = NetInfo.addEventListener(state => {
             onNetworkChange(state);
        });

        return () => unsubscribe();
    }, []); // ✅ Empty dependency array is now safe!

    const translateY = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [-100, 0],
    });

    if (!isVisible && isConnected) return null;

    return (
        <Animated.View style={[
            styles.container,
            {
                transform: [{ translateY }],
                paddingTop: insets.top || 10
            }
        ]}>
            <AppText style={styles.text}>No Internet Connection</AppText>
        </Animated.View>
    );
};
// ... styles export ...

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FF4B4B',
        paddingBottom: 10,
        alignItems: 'center',
        zIndex: 10000,
    },
    text: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
});

export default ConnectivityBanner;
