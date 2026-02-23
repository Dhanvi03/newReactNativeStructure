import { StyleSheet } from 'react-native';

import { Palette, scaledSize, scaleHeight, scaleWidth } from '@src/utils';

export const loginStyles = ({ backgroundColor,primary,textColor}: Palette) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
    content: {
      backgroundColor: backgroundColor,
      borderRadius: scaledSize(30),
      flex: 2,
      paddingHorizontal: scaleWidth(15),
      paddingTop: scaleHeight(25),
      top: -scaleHeight(25),
    },
    titleLogin:{
      color: textColor,
       fontSize: 24,
        fontWeight: 'bold',
         textAlign: 'center',
          marginBottom: 20
    },
    fieldContainer: {},
    header: {
      backgroundColor: primary,
      flex: 1,
    },
    input: {
      marginVertical: scaleHeight(10),
    },
    loginBtn: {
      marginTop: scaleHeight(15),
    },
  });
