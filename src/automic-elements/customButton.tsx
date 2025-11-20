import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Button } from 'react-native-paper';
import { scale, verticalScale } from 'react-native-size-matters';
import { lightTheme } from '../theme';

interface CustomButtonProps {
    onPress: () => void;
    title: string;
    disabled?: boolean;
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    contentStyle?: StyleProp<ViewStyle>;
    mode?: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';
}

const CustomButton: React.FC<CustomButtonProps> = ({
    onPress,
    title,
    disabled = false,
    loading = false,
    style,
    labelStyle,
    contentStyle,
    mode = 'contained',
}) => {
    return (
        <Button
            mode={mode}
            onPress={onPress}
            style={[styles.button, style]}
            contentStyle={[styles.content, contentStyle]}
            labelStyle={[styles.label, labelStyle]}
            disabled={disabled}
            loading={loading}
            buttonColor={mode === 'contained' ? lightTheme.colors.primary : undefined}
        >
            {title}
        </Button>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '100%',
        borderRadius: lightTheme.borderRadius.md,
    },
    content: {
        width: '100%',
        height: verticalScale(33),
    },
    label: {
        fontSize: scale(15),
        color: '#FFFFFF',
        fontWeight: '600',
    },
});

export default CustomButton;
