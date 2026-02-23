import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TextInputProps as RNTextInputProps,
} from 'react-native';

interface AppTextInputProps extends RNTextInputProps {
  label?: string;
  variant?: 'filled' | 'outlined';
  error?: string;
  name?: string; // Included for formik compatibility as a prop
}

// Forward ref to allow focusing from parent components
const AppTextInput = React.forwardRef<TextInput, AppTextInputProps>(
  (
    { label, variant = 'filled', error, style, ...props }: AppTextInputProps,
    ref,
  ) => {
    return (
      <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}
        <TextInput
          ref={ref}
          style={[
            styles.input,
            variant === 'filled' ? styles.filled : styles.outlined,
            error ? styles.errorInput : null,
            style,
          ]}
          placeholderTextColor="#999"
          {...props}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  input: {
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#333',
  },
  filled: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  errorInput: {
    borderColor: '#D32F2F',
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: '#D32F2F',
  },
});

export default AppTextInput;