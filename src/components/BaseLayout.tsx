import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface BaseLayoutProps extends ViewProps {
    children: React.ReactNode;
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({
    children,
    style,
    ...props
}) => {
    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            <View style={[styles.container, style]} {...props}>
                {children}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        flex: 1,
        // padding: 16,
    },
});

export default BaseLayout;
