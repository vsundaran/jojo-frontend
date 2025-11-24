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
import { Button, Card, Chip } from 'react-native-paper';
// import MaterialIcon from 'react-native-vector-icons/MaterialDesignIcons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { lightTheme } from '../../theme';

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
  containerStyle?: ViewStyle;
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
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          borderWidth: 2,
          borderLeftWidth: 5,
          borderTopWidth: 2,
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
            style={{ width: 34, height: 34 }}
          />
        </View>

        <View>
          <Text
            style={{
              color: primaryColor,
              fontSize: 22,
              fontWeight: 600,
              lineHeight: 27,
              marginTop: 3,
              fontFamily: 'Poppins-Regular',
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              color: lightTheme.colors.text,
              fontSize: 16,
              fontWeight: 400,
              lineHeight: 20,
              marginTop: 4,
              maxWidth: 200,
              fontFamily: 'Poppins-Regular',
            }}
          >
            {description}
          </Text>

        </View>
      </View>
      <View
        style={{
          padding: 8,
          minWidth: 36,
          height: 36,
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
            fontSize: 16,
            fontWeight: 500,
            lineHeight: 20,
            fontFamily: 'Poppins-Regular',
          }}
        >
          {count}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    paddingHorizontal: 22,
    paddingVertical: 18,
    position: 'relative',
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginBottom: 7,
    gap: 12,
  },
  iconButton: {
    width: 56,
    height: 56,
    borderRadius: 16,
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
    marginBottom: 7,
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: lightTheme.colors.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    color: lightTheme.colors.text,
    lineHeight: 24,
  },
  footerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 14,
    fontWeight: 600,
    color: lightTheme.colors.text,
    minWidth: 24,
  },
});
