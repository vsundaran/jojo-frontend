import { Text } from 'react-native-paper';
import { lightTheme } from '../theme';

export const SubText = ({ children }: { children: React.ReactNode }) => (
  <Text
    style={{
      color: lightTheme.colors.text,
      textAlign: 'center',
      fontSize: 16,
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: 22.75,
    }}
  >
    {children}
  </Text>
);
