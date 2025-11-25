import React from 'react';
import { Text } from 'react-native-paper';
import { lightTheme } from '../theme';
import { scale, verticalScale } from 'react-native-size-matters';

export const WelcomeText = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text
      style={{
        color: lightTheme.colors.jojoLogoColor,
        textAlign: 'center',
        fontSize: scale(30),
        lineHeight: verticalScale(40),
        fontFamily: 'Poppins-SemiBold',
      }}
    >
      {children}
    </Text>
  );
};
