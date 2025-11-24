import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  Image,
} from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { lightTheme } from '../../theme';
import { scale, verticalScale } from 'react-native-size-matters';

export interface WishCardProps {
  title: string;
  onPress?: () => void;
  primaryColor?: string;
  borderColor?: string;
  bgColor?: string;
  darkColor?: string;
  containerStyle?: ViewStyle;
}

export const CategoryCard: React.FC<WishCardProps> = ({
  title,
  onPress,
  primaryColor = lightTheme.colors.wishesColor,
  borderColor = lightTheme.colors.wishesColor,
  bgColor = '',
  containerStyle,
  darkColor = '',
}) => {
  return (
    <TouchableRipple
      onPress={onPress}
      rippleColor="rgba(0, 0, 0, .15)"
      style={[
        styles.container,
        {
          borderWidth: 2,
          borderLeftWidth: 2,
          borderTopWidth: 5,
          borderColor: borderColor,
          backgroundColor: bgColor,
        },
        { ...containerStyle, elevation: 0 },
      ]}
    >
      <View>
        <View style={styles.headerSection}>
          <View
            style={[
              styles.iconButton,
              {
                backgroundColor: primaryColor,
                elevation: 10,
              },
            ]}
          >
            <Image
              source={
                title == 'Motivation'
                  ? require('../../assets/fire.png')
                  : title == 'Song'
                    ? require('../../assets/song.png')
                    : title == 'Blessings'
                      ? require('../../assets/blessing.png')
                      : title == 'Celebration'
                        ? require('../../assets/celebration.png')
                        : require('../../assets/giftIcon.png')
              }
              style={{ width: scale(18), height: scale(18), }}
            />
          </View>
        </View>

        <Text
          style={{
            color: darkColor,
            fontSize: scale(12),
            fontWeight: '600',
            lineHeight: verticalScale(17),
            marginTop: verticalScale(1),
            fontFamily: 'Poppins-SemiBold',
            textAlign: 'center',
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 24,
    paddingVertical: verticalScale(10),
    position: 'relative',
    alignItems: 'center',
    backgroundColor: lightTheme.colors.background,
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 7,
    gap: 12,
  },
  iconButton: {
    width: scale(36),
    height: scale(36),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
