import { Text } from 'react-native-paper';
import { lightTheme } from '../theme';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export const MainText = ({ children }: { children: React.ReactNode }) => (
  <Text
    style={{
      color: lightTheme.colors.text,
      textAlign: 'center',
      fontSize: moderateScale(18),
      fontStyle: 'normal',
      fontWeight: '500',
      lineHeight: verticalScale(28),
    }}
  >
    {children}
  </Text>
);
