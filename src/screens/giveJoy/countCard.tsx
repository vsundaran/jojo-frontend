import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Button, Card, Chip } from 'react-native-paper';
// import MaterialIcon from 'react-native-vector-icons/MaterialDesignIcons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { lightTheme } from '../../theme';
import { moderateScale, scale } from 'react-native-size-matters';

export interface WishCardProps {
  title: string;
  description: string;
  count?: number;
  callCount?: number;
  likeCount?: number;
  onIconPress?: () => void;
  onLikePress?: () => void;
  onCallPress?: () => void;
  onTagPress?: (tag: string) => void;
  primaryColor?: string;
  borderColor?: string;
  badgeColor?: string;
  darkTextColor?: string;
  containerStyle?: ViewStyle;
  isLoading?: boolean;
}

export const CountCard: React.FC<WishCardProps> = ({
  title,
  description,
  count = 0,
  callCount = 0,
  likeCount = 0,
  onIconPress,
  onLikePress,
  onCallPress,
  onTagPress,
  primaryColor = lightTheme.colors.wishesColor,
  borderColor = lightTheme.colors.wishesColor,
  badgeColor = '',
  containerStyle,
  darkTextColor = lightTheme.colors.text,
  isLoading = false,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          borderWidth: 1,
          borderLeftWidth: 5,
          borderTopWidth: 1,
          borderColor: borderColor,
        },
        { ...containerStyle, elevation: 0 },
      ]}
    >
      <View style={styles.headerSection}>
        <View style={[styles.iconButton, { backgroundColor: primaryColor }]}>
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
            style={{ width: scale(18), height: scale(18) }}
          />
        </View>

        <View>
          <Text
            style={{
              color: darkTextColor,
              fontSize: moderateScale(12),
              fontFamily: 'Poppins-SemiBold',
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              color: lightTheme.colors.darkText,
              fontSize: moderateScale(12),
              maxWidth: "85%",
              fontFamily: 'Poppins-Regular',
            }}
          >
            {description}
          </Text>

        </View>
      </View>
      <View
        style={{
          minWidth: 22,
          height: 22,
          width: 22,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 1000,
          position: 'absolute',
          right: 12,
          top: 12,
          backgroundColor: badgeColor,
        }}
      >
        <Text
          style={{
            color: lightTheme.colors.text,
            fontSize: scale(8),
            fontFamily: 'Poppins-Bold',
          }}
        >
          {isLoading ? <ActivityIndicator /> : count}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: scale(14),
    paddingHorizontal: scale(12),
    paddingVertical: scale(12),
    position: 'relative',
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: scale(12),
  },
  iconButton: {
    width: scale(36),
    height: scale(36),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 8,
    flex: 1,
  },
  chip: {
    borderRadius: 20,
  },
  chipText: {
    fontSize: 18,
    fontWeight: '600',
  },
  contentSection: {
    marginBottom: scale(7),
    paddingHorizontal: scale(4),
  },
  title: {
    fontSize: scale(14),
    fontWeight: '600',
    color: lightTheme.colors.text,
    marginBottom: 4,
  },
  description: {
    fontSize: scale(12),
    fontWeight: '500',
    color: lightTheme.colors.text,
    lineHeight: scale(24),
  },
  footerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
  },
  statText: {
    fontSize: scale(14),
    fontWeight: 600,
    color: lightTheme.colors.text,
    minWidth: scale(24),
  },
});
