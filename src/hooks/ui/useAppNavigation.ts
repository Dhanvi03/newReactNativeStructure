import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/navigation/navigation.types';

/**
 * A custom hook to use the application-wide typed navigation object.
 * Use this instead of `useNavigation` to avoid repeating complex type definitions.
 * 
 * @example
 * const navigation = useAppNavigation();
 * navigation.navigate(Screen.LOGIN);
 */
export const useAppNavigation = () => {
    return useNavigation<NativeStackNavigationProp<RootStackParamList>>();
};
