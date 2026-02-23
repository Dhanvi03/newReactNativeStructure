import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './src/services/api/queryClient';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/utils/navigationRef';
import RootNavigator from './src/navigation/RootNavigator';
import FlashMessage from "react-native-flash-message";
import { useAppBootstrap } from './src/hooks/ui/useAppBootstrap';
import { Animated } from 'react-native';
import { ErrorBoundary, ConnectivityBanner } from './src/components';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  const { isAppReady, showSplash, splashOpacity, initialRoute } = useAppBootstrap();

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <ConnectivityBanner />
          <NavigationContainer ref={navigationRef}>
            {isAppReady && <RootNavigator initialRouteName={initialRoute} />}
          </NavigationContainer>

          {showSplash && (
            <Animated.View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: '#FF0000',
                opacity: splashOpacity,
                zIndex: 9999,
              }}
            />
          )}

          <FlashMessage position="top" />
        </ErrorBoundary>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;