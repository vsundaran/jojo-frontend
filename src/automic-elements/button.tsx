import { ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';

export const MainButton = ({
  onPress,
  children,
  style,
}: {
  onPress: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
}) => (
  <Button
    mode="text"
    onPress={onPress}
    style={[{ boxShadow: 'none', padding: 0, margin: 0 }, style]}
  >
    {children}
  </Button>
);
