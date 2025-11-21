import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { lightTheme } from '../../theme';
import CustomButton from '../../automic-elements/customButton';

const categories = [
    {
        id: 1,
        title: 'Wishes',
        icon: require('../../assets/giftIcon.png'),
        color: lightTheme.colors.wishesColor,
    },
    {
        id: 2,
        title: 'Motivation',
        icon: require('../../assets/fire.png'),
        color: lightTheme.colors.motivationColor,
    },
    {
        id: 3,
        title: 'Song',
        icon: require('../../assets/song.png'),
        color: lightTheme.colors.songColor,
    },
    {
        id: 4,
        title: 'Blessings',
        icon: require('../../assets/blessing.png'),
        color: lightTheme.colors.blessingsColor,
    },
    {
        id: 5,
        title: 'Celebration',
        icon: require('../../assets/celebration.png'),
        color: lightTheme.colors.celebrationColor,
    },
];

export const NoMoments = () => {
    return (
        <View style={styles.container}>
            <View style={styles.iconsContainer}>
                {categories.map((category) => (
                    <View
                        key={category.id}
                        style={[styles.iconWrapper, { backgroundColor: category.color }]}
                    >
                        <Image source={category.icon} style={styles.icon} resizeMode="contain" />
                    </View>
                ))}
            </View>

            <Text style={styles.title}>No Moments Created Yet</Text>
            <Text style={styles.subtitle}>
                Create and enjoy your moment with JoJo
            </Text>

            <CustomButton title='Create Your First Moment' onPress={() => { }} icon={() => <MaterialIcons name="add" size={scale(24)} color="#F7941D" />} />

        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: lightTheme.colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: scale(20),
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: scale(12),
        marginBottom: verticalScale(32),
    },
    iconWrapper: {
        width: scale(48),
        height: scale(48),
        borderRadius: scale(12),
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
    },
    icon: {
        width: scale(24),
        height: scale(24),
        tintColor: '#FFFFFF',
    },
    title: {
        fontSize: scale(20),
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
        marginBottom: verticalScale(8),
    },
    subtitle: {
        fontSize: scale(14),
        color: '#6B7280',
        textAlign: 'center',
        marginBottom: verticalScale(32),
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#414042',
        paddingVertical: verticalScale(12),
        paddingHorizontal: scale(24),
        borderRadius: scale(24),
        gap: scale(8),
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: scale(16),
        fontWeight: '600',
    },
});
