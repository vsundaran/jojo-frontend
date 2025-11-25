import { Text } from 'react-native-paper';
import { lightTheme } from '../theme';
import { scale, verticalScale } from 'react-native-size-matters';

export const SubText = ({ children }: { children: React.ReactNode }) => (
  <Text
    style={{
      color: lightTheme.colors.text,
      textAlign: 'center',
      fontSize: scale(16),
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: verticalScale(22.75),
    }}
  >
    {children}
  </Text>
);
