import { useCallback, useRef } from 'react';
import { TextInput } from 'react-native';
import { Screen } from '@src/navigation/screen';
import { useAppContext, useLogin as useAuthLogin } from '@src/hooks';
import * as yup from 'yup';
import { loginStyles } from './Login.style';

// Define the shape of your form for TypeScript safety
export type LoginFormValues = typeof initialValues;

const initialValues = {
  email: '',
  password: '',
};

// Define schema outside to prevent re-creation on every render
const validationSchema = yup.object().shape({
  email: yup.string().trim().email('Invalid email').required('Email is required'),
  password: yup.string().trim().min(6, 'Too short').required('Password is required'),
});

const useLogin = () => {
  const { color , language} = useAppContext();
  const { mutate: login, isPending } = useAuthLogin();
  const passwordRef = useRef<TextInput>(null);

  const handleButtonSubmit = (values: LoginFormValues)=>{
    login(values)
  };

  return {
    isLoading: isPending,
    validationSchema,
    handleButtonSubmit,
    initialValues,
    passwordRef,
    styles: loginStyles(color),
    color,
  };
};

export default useLogin;