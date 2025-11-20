import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';
import { scale, verticalScale } from 'react-native-size-matters';
import { lightTheme } from '../../theme';
import Container from '../../automic-elements/container';
import { Category } from '../../data/momentCategories';

export const ChoosingSubCategory = ({ navigation, route }: any) => {
    const category: Category = route.params?.category;
    const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);

    const handlePress = (subCategory: string) => {
        setSelectedSubCategory(subCategory);
        navigation.navigate('MomentCreatingForm', { category, subCategory });
    };

    return (
        <Container style={styles.container}>
            <Text style={styles.title}>Choose sub Category</Text>
            <View style={styles.chipsContainer}>
                {category?.subCategories.map((subCategory) => (
                    <SelectionChipTwo
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
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: scale(20),
        paddingVertical: verticalScale(20),
    },
    title: {
        fontSize: scale(16),
        fontWeight: '600',
        color: lightTheme.colors.darkText,
        marginBottom: verticalScale(20),
        fontFamily: 'Poppins',
    },
    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: scale(12),
    },
    chip: {
        borderRadius: scale(20),
        paddingHorizontal: scale(20),
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
}

export const SelectionChipTwo = ({ label, selected, onPress, style, primaryColor, bgColor }: SelectionChipProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                stylesChips.container,
                selected ? { backgroundColor: bgColor, borderColor: bgColor } : { backgroundColor: lightTheme.colors.nonActiveChip, borderColor: lightTheme.colors.nonActiveChip },
                style,
            ]}
            activeOpacity={0.8}
        >
            <Text
                style={[
                    stylesChips.text,
                    selected ? { color: primaryColor, fontWeight: '600' } : { color: lightTheme.colors.text },
                ]}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
};

const stylesChips = StyleSheet.create({
    container: {
        paddingVertical: verticalScale(8),
        paddingHorizontal: scale(16),
        borderRadius: scale(8),
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: scale(60),
    },
    text: {
        fontSize: scale(14),
        fontWeight: '500',
        fontFamily: 'Poppins',
    },
});
