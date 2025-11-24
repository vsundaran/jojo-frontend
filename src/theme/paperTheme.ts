import { MD3LightTheme as PaperLightTheme, configureFonts } from 'react-native-paper';
import { lightTheme } from '.';

const fontConfig = {
  fontFamily: 'Poppins-Regular',
};

const fonts = configureFonts({ config: fontConfig });

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
  fonts: configureFonts({
    config: {
      fontFamily: 'Poppins-Regular',
    },
  }),
};
