// src/screens/Login/LoginScreen.tsx
import React from 'react';
import { View } from 'react-native';
import { Button, AppText } from '@src/blueprints';
import { BaseLayout, AppTextInput } from '@src/components';
import { contents } from '@src/context';
import { RootStackScreenProps } from '@src/navigation/navigation.types';
import { Screen } from '@src/navigation/screen';
import useLogin from './useLogin';

// Type the component with the Screen enum
const LoginScreen: React.FC<RootStackScreenProps<Screen.LOGIN>> = ({
  navigation,
  route
}) => {
  const {
    styles,
    color,
    handleButtonSubmit,
  } = useLogin();



  return (
    <BaseLayout>
      <View style={styles.header} />
      <View style={styles.content}>
        <AppText style={styles.titleLogin}>{contents('login.log_in')}</AppText>
        {/* Your form here */}
        <Button
          title={contents('login.login')}
          onPress={() => handleButtonSubmit({ email: '', password: '' })}
          palette={color}
        />
      </View>
    </BaseLayout>
  );
};

export default LoginScreen;
