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
import { lightTheme } from '../theme';
// import MaterialIcon from 'react-native-vector-icons/MaterialDesignIcons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export interface WishCardProps {
  title: string;
  description: string;
  tags?: string[];
  callCount?: number;
  likeCount?: number;
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
          borderWidth: 2,
          borderTopWidth: 5,
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
            style={{ width: 34, height: 34 }}
          />
        </View>

        <View style={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <Chip
              key={index}
              //   label={tag}
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
        {/* <MaterialIcons name="phone" size={20} color="#10B981" /> */}
        {/* <Text style={styles.statText}>{callCount}</Text> */}
        <Chip
          style={{
            borderRadius: 25,
            backgroundColor: lightTheme.colors.greenSurface,
          }}
          icon={() => <MaterialIcons name="phone" size={20} color="#10B981" />}
          onPress={() => console.log('Pressed')}
          textStyle={{ color: '#000' }}
        >
          {callCount}
        </Chip>
        {/* </Button> */}

        <Button
          icon="heart-outline"
          style={styles.statItem}
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
    borderRadius: 24,
    paddingHorizontal: 22,
    paddingVertical: 18,
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
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
