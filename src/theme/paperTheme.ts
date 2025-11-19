import { MD3LightTheme as PaperLightTheme } from 'react-native-paper';
import { lightTheme } from '.';


export const paperTheme = {
  ...PaperLightTheme,
  colors: {
    ...PaperLightTheme.colors,
    primary: lightTheme.colors.primary,
    secondary: lightTheme.colors.secondary,
    background: lightTheme.colors.background,
    surface: lightTheme.colors.surface,
    error: lightTheme.colors.error,
    text: lightTheme.colors.text,
    outline: lightTheme.colors.border,
  },
};
