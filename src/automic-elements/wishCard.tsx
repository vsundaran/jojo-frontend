import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  Image,
} from 'react-native';
import { Button, Chip } from 'react-native-paper';
import { lightTheme } from '../theme';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export interface WishCardProps {
  title: string;
  description: string;
  tags?: string[];
  callCount?: number;
  likeCount?: number;
  isLiked?: boolean;
  onIconPress?: () => void;
  onLikePress?: () => void;
  onCallPress?: () => void;
  onTagPress?: (tag: string) => void;
  primaryColor?: string;
  borderColor?: string;
  containerStyle?: ViewStyle;
}

export const WishCard: React.FC<WishCardProps> = ({
  title,
  description,
  tags = [],
  callCount = 0,
  likeCount = 0,
  isLiked = false,
  onIconPress,
  onLikePress,
  onCallPress,
  onTagPress,
  primaryColor = lightTheme.colors.wishesColor,
  borderColor = lightTheme.colors.wishesColor,
  containerStyle,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          borderWidth: moderateScale(2),
          borderTopWidth: moderateScale(5),
          borderColor: borderColor,
        },
        { ...containerStyle, elevation: 0 },
      ]}
    >
      {/* Header Section with Icon and Tags */}
      <View style={styles.headerSection}>
        <View style={[styles.iconButton, { backgroundColor: primaryColor }]}>
          <Image
            source={
              title == 'Motivation'
                ? require('../assets/fire.png')
                : title == 'Song'
                  ? require('../assets/song.png')
                  : title == 'Blessings'
                    ? require('../assets/blessing.png')
                    : require('../assets/giftIcon.png')
            }
            style={{ width: scale(24), height: scale(24) }}
          />
        </View>

        <View style={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <Chip
              key={index}
              onPress={() => onTagPress?.(tag)}
              mode="outlined"
              style={[
                styles.chip,
                {
                  borderColor: primaryColor,
                  backgroundColor: index === 0 ? primaryColor : 'transparent',
                },
              ]}
              textStyle={[
                styles.chipText,
                {
                  color: index === 0 ? '#fff' : primaryColor,
                },
              ]}
            >
              {tag}
            </Chip>
          ))}
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.contentSection}>
        <Text style={styles.description}>{description}</Text>
      </View>

      {/* Footer Section with Stats */}
      <View style={styles.footerSection}>
        <Chip
          style={{
            borderRadius: moderateScale(25),
            backgroundColor: lightTheme.colors.greenSurface,
            alignItems: 'center',
          }}
          icon={() => <MaterialIcons name="phone" size={moderateScale(14)} color="#10B981" />}
          onPress={() => console.log('Pressed')}
          textStyle={{ color: '#000', fontSize: moderateScale(13) }}
        >
          {callCount}
        </Chip>

        <Button
          icon={() => (
            <MaterialIcons
              name={isLiked ? "cards-heart" : "cards-heart-outline"}
              size={moderateScale(24)}
              color={isLiked ? "#EB4848" : undefined}
            />
          )}
          style={styles.statItem}
          labelStyle={{ fontSize: moderateScale(14), marginVertical: verticalScale(2) }}
          onPress={onLikePress}
        >
          {likeCount}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: moderateScale(24),
    paddingHorizontal: scale(22),
    paddingVertical: verticalScale(10),
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(7),
    gap: scale(12),
  },
  iconButton: {
    width: scale(48),
    height: scale(48),
    borderRadius: moderateScale(16),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: '#fff',
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: scale(8),
    flex: 1,
    flexWrap: 'wrap',
  },
  chip: {
    borderRadius: moderateScale(20),
    height: verticalScale(22),
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipText: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    lineHeight: verticalScale(18),
    marginVertical: 0,
    marginHorizontal: 0,
  },
  contentSection: {
    marginBottom: verticalScale(7),
    paddingHorizontal: scale(4),
  },
  title: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: lightTheme.colors.text,
    marginBottom: verticalScale(4),
  },
  description: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: lightTheme.colors.text,
    lineHeight: verticalScale(24),
  },
  footerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(8),
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: lightTheme.colors.text,
    minWidth: scale(24),
  },
});
