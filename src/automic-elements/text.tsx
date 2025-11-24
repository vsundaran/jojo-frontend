import { Text } from 'react-native-paper';
import { lightTheme } from '../theme';

export const MainText = ({ children }: { children: React.ReactNode }) => (
  <Text
    style={{
      color: lightTheme.colors.text,
      textAlign: 'center',
      fontSize: 18,
      fontStyle: 'normal',
      fontWeight: '500',
      lineHeight: 28,
    }}
  >
    {children}
  </Text>
);
