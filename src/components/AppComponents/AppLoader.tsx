import React, { memo } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useUIStore } from '@src/store/useUIStore';
import { useLoadingRegistry } from '@src/hooks/ui/useLoadingRegistry';
import { useAppContext } from '@src/hooks'; // To match your theme

export const AppLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { color } = useAppContext();
    
    // Selectors ensure this component ONLY re-renders when these specific values change
    const isManualLoading = useUIStore((state) => state.isGlobalLoading);
    const isAutoLoading = useLoadingRegistry();

    const showLoader = isManualLoading || isAutoLoading;

    return (
        <View style={styles.root}>
            {children}
            
            {showLoader && (
                <View 
                    style={styles.overlay} 
                    pointerEvents="auto" // Prevents user from clicking buttons behind the loader
                >
                    <View style={[styles.loaderBox, { backgroundColor: color.backgroundColor }]}>
                        <ActivityIndicator size="large" color={color.primary} />
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)', // Slightly darker for better focus
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999, // High z-index to stay above headers/tabs
    },
    loaderBox: {
        padding: 24,
        borderRadius: 16,
        // Standard shadow for a professional feel
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    }
});

export default memo(AppLoader);