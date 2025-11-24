import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Chip, Divider } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../automic-elements/header';
import { lightTheme } from '../../theme';

interface ScrollingCategoryProps {
  activeCategory: string;
  onCategorySelect: (category: string) => void;
}

export default function ScrollingCategory({ activeCategory, onCategorySelect }: ScrollingCategoryProps) {
  const categories = ['All', 'wishes', 'motivation', 'songs', 'blessings', 'celebrations'];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          paddingHorizontal: 8,
          paddingVertical: 8,
          alignItems: 'center',
        }}
      >
        {categories.map(item => {
          const isActive = activeCategory === item;

          return (
            <View key={item}>
              {isActive ? (
                // Active chip → gradient background
                <LinearGradient
                  colors={lightTheme.colors.gradientColors}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    borderRadius: 39602500,
                    padding: 1,
                  }}
                >
                  <Chip
                    style={{
                      backgroundColor: 'transparent',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => onCategorySelect(item)}
                  >
                    {item}
                  </Chip>
                </LinearGradient>
              ) : (
                // Inactive chip → normal style
                <Chip
                  mode="outlined"
                  style={{
                    backgroundColor: lightTheme.colors.nonActiveChip,
                    borderColor: '#E2E8F0',
                    borderWidth: 1,
                    borderRadius: 39602500,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => onCategorySelect(item)}
                >
                  {item}
                </Chip>
              )}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
