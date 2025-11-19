import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';
import { lightTheme } from '../theme';
import { scale, verticalScale } from 'react-native-size-matters';

interface SelectionChipProps {
    label: string;
    selected: boolean;
    onPress: () => void;
    style?: ViewStyle;
}

export const SelectionChip = ({ label, selected, onPress, style }: SelectionChipProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.container,
                selected ? styles.selectedContainer : styles.unselectedContainer,
                style,
            ]}
            activeOpacity={0.8}
        >
            <Text
                style={[
                    styles.text,
                    selected ? styles.selectedText : styles.unselectedText,
                ]}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
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
        borderColor: '#8B12B6', // Matching border
        elevation: 10,
        borderWidth: 0,
    },
    unselectedContainer: {
        backgroundColor: '#F3F4F6', // nonActiveChip
        borderColor: '#D9D9D9;', // border
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
