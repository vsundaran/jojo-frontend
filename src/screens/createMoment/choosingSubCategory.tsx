import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';
import { scale, verticalScale } from 'react-native-size-matters';
import { lightTheme } from '../../theme';
import { SelectionChip } from '../../automic-elements/selectionChip';
import Container from '../../automic-elements/container';

export const ChoosingSubCategory = ({ navigation }: any) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>('Birthday');

    const categories = [
        'Birthday',
        'Wedding anniversary',
        'Work Anniversary',
        'Sweet 16',
        '60th Wedding',
        'Others',
    ];

    const handlePress = (category: string) => {
        setSelectedCategory(category);
        navigation.navigate('MomentCreatingForm', { category });
    };

    return (
        <Container style={styles.container}>
            <Text style={styles.title}>Choose sub Category</Text>
            <View style={styles.chipsContainer}>
                {categories.map((category) => (
                    <SelectionChipTwo
                        key={category}
                        label={category}
                        selected={selectedCategory === category}
                        onPress={() => handlePress(category)}
                        style={styles.chip}
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
        borderRadius: scale(20), // More rounded for this screen as per design
        paddingHorizontal: scale(20),
        minWidth: 0, // Allow auto width
    },
});



interface SelectionChipProps {
    label: string;
    selected: boolean;
    onPress: () => void;
    style?: ViewStyle;
}

export const SelectionChipTwo = ({ label, selected, onPress, style }: SelectionChipProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                stylesChips.container,
                selected ? stylesChips.selectedContainer : stylesChips.unselectedContainer,
                style,
            ]}
            activeOpacity={0.8}
        >
            <Text
                style={[
                    stylesChips.text,
                    selected ? stylesChips.selectedText : stylesChips.unselectedText,
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
    selectedContainer: {
        backgroundColor: '#FADAFF', // Light pink from gradientColors or similar
        borderWidth: 0,
        elevation: 10,
    },
    unselectedContainer: {
        backgroundColor: '#FADAFF', // nonActiveChip
        borderWidth: 0,
    },
    text: {
        fontSize: scale(14),
        fontWeight: '500',
        fontFamily: 'Poppins',
    },
    selectedText: {
        color: '#8B12B6', // wishesColor or similar pink/purple
        fontWeight: '600',
    },
    unselectedText: {
        color: lightTheme.colors.text,
    },
});
