import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { BaseLayout } from './BaseLayout';
import { AppText, Button } from '@src/blueprints';
import { useThemeStore } from '@src/store';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    private handleRestart = () => {
        this.setState({ hasError: false, error: null });
    };

    public render() {
        if (this.state.hasError) {
            return (
                <BaseLayout>
                    <View style={styles.container}>
                        <AppText style={styles.title}>Oops! Something went wrong.</AppText>
                        <AppText style={styles.message}>
                            {this.state.error?.message || 'An unexpected error occurred.'}
                        </AppText>
                        <Button
                            title="Try Again"
                            onPress={this.handleRestart}
                            buttonContainerStyle={styles.button}
                            palette={useThemeStore.getState().colors}
                        />
                    </View>
                </BaseLayout>
            );
        }

        return this.props.children;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    message: {
        fontSize: 14,
        color: '#666',
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        width: '60%',
    }
});

export default ErrorBoundary;
