import React from 'react';
import { Text } from 'react-native-paper';
import { StyleSheet, TextStyle } from 'react-native';
import { lightTheme } from '../theme';
import { scale, moderateScale } from 'react-native-size-matters';

interface FormLabelProps {
    children: React.ReactNode;
    style?: TextStyle;
    optionalText?: string;
}

export const FormLabel = ({ children, style, optionalText }: FormLabelProps) => (
    <Text style={[styles.label, style]}>
        {children}
        {optionalText && <Text style={styles.optional}> {optionalText}</Text>}
    </Text>
);

const styles = StyleSheet.create({
    label: {
        fontSize: moderateScale(14),
        fontWeight: '600',
        color: lightTheme.colors.darkText,
        marginBottom: lightTheme.spacing.sm,
        fontFamily: 'Poppins', // Assuming Poppins is used based on other files
    },
    optional: {
        color: lightTheme.colors.textSecondary,
        fontSize: moderateScale(12),
        fontWeight: '400',
    },
});
