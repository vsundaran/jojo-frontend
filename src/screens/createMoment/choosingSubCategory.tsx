import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ViewStyle,
  BackHandler,
} from 'react-native';
import { Text } from 'react-native-paper';
import { scale, verticalScale } from 'react-native-size-matters';
import { lightTheme } from '../../theme';
import Container from '../../automic-elements/container';
import { Category } from '../../data/momentCategories';
import { MomentCreatingForm } from './momentcreatingForm';

export const ChoosingSubCategory = ({ navigation, route }: any) => {
  const category: Category = route.params?.category;
  const moment: any = route.params?.moment;
  // const subCategory = route.params?.subCategory;
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    moment?.subCategory || null,
  );

  const handlePress = (subCategory: string) => {
    setSelectedSubCategory(subCategory);
    // navigation.navigate('MomentCreatingForm', { category, subCategory });
  };

  // Handle back button press
  useEffect(() => {
    const handleBackPress = () => {
      // If we have a moment, we came from the edit flow (MyMoments)
      if (moment) {
        // Navigate back to app-layout with MyMoments tab
        navigation.navigate('app-layout', {
          footerSlectedIndex: 0,
          initialTab: '2',
          timestamp: Date.now(),
        });
        return true; // Prevent default back behavior
      }
      // Otherwise, we came from the create flow, use default back behavior
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => backHandler.remove();
  }, [moment, navigation]);

  console.log(category, 'category');
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Container style={styles.container}>
        <Text style={styles.title}>Choose sub Category</Text>
        <View style={styles.chipsContainer}>
          {category?.subCategories.map(subCategory => (
            <SelectionChipTwo
              darkColor={category.darkColor}
              key={subCategory}
              label={subCategory}
              selected={selectedSubCategory === subCategory}
              onPress={() => handlePress(subCategory)}
              style={styles.chip}
              primaryColor={category.primaryColor}
              bgColor={category.bgColor}
            />
          ))}
        </View>
        <View style={{ marginTop: 30 }}>
          <MomentCreatingForm
            navigation={navigation}
            route={route}
            selectedSubCategory={selectedSubCategory}
            moment={moment}
          />
        </View>
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(20),
  },
  title: {
    fontSize: scale(13),
    color: lightTheme.colors.darkText,
    marginBottom: verticalScale(4),
    fontFamily: 'Poppins-Medium',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(8),
    marginTop: verticalScale(8),
  },
  chip: {
    borderRadius: scale(20),
    minWidth: 0,
  },
});

interface SelectionChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  style?: ViewStyle;
  primaryColor: string;
  bgColor: string;
  darkColor?: string;
}

export const SelectionChipTwo = ({
  label,
  selected,
  onPress,
  style,
  primaryColor,
  bgColor,
  darkColor,
}: SelectionChipProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        stylesChips.container,
        selected
          ? { backgroundColor: bgColor, borderColor: bgColor, elevation: 5 }
          : {
            backgroundColor: bgColor,
            borderColor: lightTheme.colors.nonActiveChip,
          },
        style,
      ]}
      activeOpacity={0.8}
    >
      <Text
        style={[
          stylesChips.text,
          selected ? { color: darkColor } : { color: lightTheme.colors.text },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const stylesChips = StyleSheet.create({
  container: {
    paddingVertical: verticalScale(3),
    paddingHorizontal: scale(10),
    borderRadius: scale(8),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: scale(60),
  },
  text: {
    fontSize: scale(12),
    fontFamily: 'Poppins-Medium',
  },
});
