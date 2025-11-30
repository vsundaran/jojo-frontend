import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { AppTheme } from '../types';

export const lightTheme: AppTheme = {
  colors: {
    primary: '#414042', // Indigo
    secondary: '#EC4899', // Pink
    accent: '#10B981', // Emerald
    background: '#FFFFFF',
    surface: '#F8FAFC',
    error: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
    text: '#414042',
    darkText: '#1D1E1F',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    placeholder: '#9CA3AF',
    gradientColors: ['#E7F9EC', '#E0EAFF', '#FADAFF', '#FCE4EA', '#FFF0D0'],
    statusBar: '#ffffffff',
    jojoLogoColor: '#F7941D',
    modalBackground: '#00000080',
    transperent: 'transparent',
    nonActiveChip: '#F3F4F6',
    wishesColor: '#D459FF',
    wishesBorderColor: '#E39FFB',
    greenSurface: '#E5FFF7',
    green: '#007C32',
    motivationBorderColor: '#A6C3FF',
    motivationColor: '#5E8EF1',
    songBorderColor: '#5ACEA1',
    songColor: '#5ACEA1',
    blessingsColor: '#F7BD49',
    blessingsBorderColor: '#F7BD49',
    iconDefaultColor: '#77808D',
    celebrationColor: '#FF7878',
    celebrationBorderColor: '#FF7878',
  },
  spacing: {
    xs: scale(4),
    sm: scale(8),
    md: scale(16),
    lg: scale(24),
    xl: scale(32),
  },
  typography: {
    h1: {
      fontSize: moderateScale(24),
      fontWeight: 'bold',
      lineHeight: scale(32),
      fontFamily: 'Poppins-Bold',
    },
    h2: {
      fontSize: moderateScale(20),
      fontWeight: '600',
      lineHeight: scale(28),
      fontFamily: 'Poppins-SemiBold',
    },
    h3: {
      fontSize: moderateScale(16),
      fontWeight: '600',
      lineHeight: scale(24),
      fontFamily: 'Poppins-SemiBold',
    },
    body: {
      fontSize: moderateScale(14),
      lineHeight: scale(20),
      fontFamily: 'Poppins-Regular',
    },
    caption: {
      fontSize: moderateScale(12),
      lineHeight: scale(16),
      fontFamily: 'Poppins-Regular',
    },
    button: {
      fontSize: moderateScale(16),
      fontWeight: '600',
      fontFamily: 'Poppins-Medium',
    },
  },
  borderRadius: {
    sm: scale(4),
    md: scale(8),
    lg: scale(12),
  },
  headerHeight: verticalScale(56),
};
