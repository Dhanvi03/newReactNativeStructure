import { createNavigationContainerRef, StackActions } from '@react-navigation/native';
import { RootStackParamList } from '@src/navigation/navigation.types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

/**
 * Global navigation function
 */
export function navigate<RouteName extends keyof RootStackParamList>(
    name: RouteName,
    params?: RootStackParamList[RouteName]
) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name as any, params as any);
    }
}

/**
 * Global reset function
 */
export function reset<RouteName extends keyof RootStackParamList>(
    name: RouteName,
    params?: RootStackParamList[RouteName]
) {
    if (navigationRef.isReady()) {
        navigationRef.reset({
            index: 0,
            routes: [{ name: name as any, params: params as any }],
        });
    }
}

/**
 * Global replace function
 */
export function replace<RouteName extends keyof RootStackParamList>(
    name: RouteName,
    params?: RootStackParamList[RouteName]
) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.replace(name as any, params as any));
    }
}
