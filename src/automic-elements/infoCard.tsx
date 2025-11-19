import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { lightTheme } from '../theme';
import { scale, verticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Or appropriate icon set

interface InfoCardProps {
    title: string;
    items: string[];
}

export const InfoCard = ({ title, items }: InfoCardProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon name="lightbulb-on-outline" size={scale(20)} color="#F59E0B" style={styles.icon} />
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.content}>
                {items.map((item, index) => (
                    <Text key={index} style={styles.itemText}>
                        • {item}
                    </Text>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#F7BD49', // blessingsBorderColor or similar orange
        borderRadius: scale(12),
        padding: scale(16),
        backgroundColor: '#FFFFFF',
        marginTop: verticalScale(16),
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: verticalScale(8),
    },
    icon: {
        marginRight: scale(8),
    },
    title: {
        fontSize: scale(16),
        fontWeight: '700',
        color: '#F59E0B', // warning/orange color
        fontFamily: 'Poppins',
    },
    content: {
        paddingLeft: scale(4),
    },
    itemText: {
        fontSize: scale(13),
        color: lightTheme.colors.text,
        marginBottom: verticalScale(4),
        lineHeight: scale(20),
        fontFamily: 'Poppins',
    },
});
