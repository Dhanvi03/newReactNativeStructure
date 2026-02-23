import React, { createContext, useState } from 'react';
import { ActivityIndicator, View, StyleSheet, Modal } from 'react-native';
import { useLoadingRegistry } from '../hooks/ui/useLoadingRegistry';

type LoaderRef = {
    show: () => void;
    hide: () => void;
};

const LoaderContext = createContext<LoaderRef | null>(null);

let loaderRef: LoaderRef | null = null;

export const setLoaderRef = (ref: LoaderRef | null) => {
    loaderRef = ref;
};

export const getLoaderController = () => loaderRef;

export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [visible, setVisible] = useState(false);
    const isLoadingRegistry = useLoadingRegistry();

    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    // Update global ref
    if (!loaderRef) {
        setLoaderRef({ show, hide });
    }

    const startLoading = visible || isLoadingRegistry;

    return (
        <LoaderContext.Provider value={{ show, hide }}>
            {children}
            <Modal transparent visible={startLoading} animationType="fade">
                <View style={styles.container}>
                    <View style={styles.loaderBox}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                </View>
            </Modal>
        </LoaderContext.Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderBox: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
    }
});
