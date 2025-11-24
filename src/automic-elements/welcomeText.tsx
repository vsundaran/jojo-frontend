import React from 'react';
import { Text } from 'react-native-paper';
import { lightTheme } from '../theme';

export const WelcomeText = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text
      style={{
        color: lightTheme.colors.jojoLogoColor,
        textAlign: 'center',
        fontSize: 30,
        lineHeight: 40,
        fontFamily: 'Poppins-SemiBold',
      }}
    >
      {children}
    </Text>
  );
};
