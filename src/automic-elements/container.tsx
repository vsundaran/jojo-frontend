import { View, StyleSheet, ViewStyle } from 'react-native';

export interface ContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function Container({ children, style }: ContainerProps) {
  const containerStyle = StyleSheet.flatten([styles.container, style]);

  return <View style={containerStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
});
