import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ViewStyle, ActivityIndicator } from 'react-native';
import { Card, Chip, Switch, Text } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { lightTheme } from '../../../theme';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { isExpired } from '../../../utils/isExpired';

export type MomentVariant = 'Wishes' | 'Motivation' | 'Song' | 'Blessings' | 'Celebration';

export interface MomentCardProps {
    title: MomentVariant;
    subTag: string;
    description: string;
    expiryDate: string;
    callCount: number;
    likeCount: number;
    isOn: boolean;
    onToggle: () => void;
    containerStyle?: ViewStyle;
    showToggle?: boolean;
    isLoading?: boolean;
    onEdit?: () => void;
}

const getVariantStyles = (variant: MomentVariant) => {
    switch (variant) {
        case 'Wishes':
            return {
                primary: lightTheme.colors.wishesColor,
                border: lightTheme.colors.wishesBorderColor,
                icon: require('../../../assets/giftIcon.png'),
            };
        case 'Motivation':
            return {
                primary: lightTheme.colors.motivationColor,
                border: lightTheme.colors.motivationBorderColor,
                icon: require('../../../assets/fire.png'),
            };
        case 'Song':
            return {
                primary: lightTheme.colors.songColor,
                border: lightTheme.colors.songBorderColor,
                icon: require('../../../assets/song.png'),
            };
        case 'Blessings':
            return {
                primary: lightTheme.colors.blessingsColor,
                border: lightTheme.colors.blessingsBorderColor,
                icon: require('../../../assets/blessing.png'),
            };
        case 'Celebration':
            return {
                primary: lightTheme.colors.celebrationColor,
                border: lightTheme.colors.celebrationBorderColor,
                icon: require('../../../assets/celebration.png'),
            };
        default:
            return {
                primary: lightTheme.colors.wishesColor,
                border: lightTheme.colors.wishesBorderColor,
                icon: require('../../../assets/giftIcon.png'),
            };
    }
};

export const MomentCard: React.FC<MomentCardProps> = ({
    title,
    subTag,
    description,
    likeCount,
    isOn,
    onToggle,
    containerStyle,
    isLoading = false,
    onEdit,
    expiryDate,
}) => {
    const isExp = isExpired(expiryDate);
    const { primary, border, icon } = getVariantStyles(title);

    return (
        <View
            style={[
                styles.container,
                {
                    borderColor: border,
                },
                containerStyle,
            ]}
        >
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.leftHeader}>
                    <View style={[styles.iconContainer, { backgroundColor: primary }]}>
                        <Image source={icon} style={styles.iconImage} />
                    </View>
                    <View style={styles.tagsWrapper}>
                        <Chip
                            style={[styles.chip, { backgroundColor: primary }]}
                            textStyle={styles.chipTextActive}
                        >
                            {title}
                        </Chip>
                        <Chip
                            style={[styles.chip, { borderColor: primary, borderWidth: 1, backgroundColor: 'transparent' }]}
                            textStyle={[styles.chipTextInactive, { color: primary }]}
                        >
                            {subTag}
                        </Chip>
                    </View>
                </View>
                {
                    !isExp ? (
                        <TouchableOpacity
                            style={{
                                width: 32,
                                height: 32,
                                borderRadius: 16,
                                backgroundColor: 'transparent',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            onPress={onEdit}
                        >
                            <MaterialCommunityIcons name="arrow-top-right-thin" size={18} color={primary} />
                        </TouchableOpacity>
                    ) : null
                }

            </View>

            {/* Content */}
            <Text style={styles.description}>{description}</Text>

            {/* Footer */}
            <View style={styles.footer}>
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <View style={styles.statIconWrapper}>
                            <MaterialIcons name="favorite" size={14} color="#EF4444" />
                        </View>
                        <Text style={styles.statText}>{likeCount}</Text>
                    </View>
                </View>

                {!isExp ? (
                    <TouchableOpacity
                        style={[
                            styles.toggleButton,
                            { backgroundColor: isOn ? '#007C32' : '#EB4848' },
                            isLoading && { opacity: 0.7 }
                        ]}
                        onPress={onToggle}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator size="small" color="#FFFFFF" style={{ marginRight: 0 }} />
                        ) : isOn ? (
                            <>
                                <Text style={styles.toggleText}>on</Text>
                                <View style={styles.toggleIconCircle}>
                                    <MaterialCommunityIcons name="access-point" size={14} color="#10B981" />
                                </View>
                            </>
                        ) : (
                            <>
                                <View style={styles.toggleIconCircle}>
                                    <MaterialCommunityIcons name="access-point" size={14} color="#6B7280" />
                                </View>
                                <Text style={styles.toggleText}>off</Text>
                            </>
                        )}
                    </TouchableOpacity>
                ) : <Text style={{ color: '#EB4848', fontSize: scale(10), fontFamily: 'Poppins-Regular' }}>Expired</Text>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        paddingVertical: verticalScale(8),
        paddingHorizontal: scale(10),
        borderWidth: 2,
        borderTopWidth: 5,
        marginBottom: verticalScale(16),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: scale(8),
    },
    leftHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        flexWrap: 'nowrap',
    },
    iconContainer: {
        width: scale(36),
        height: scale(36),
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: scale(6),
        // Shadow for icon
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    iconImage: {
        width: scale(18), height: scale(18),
        resizeMode: 'contain',
        tintColor: '#FFFFFF',
    },
    tagsWrapper: {
        flexDirection: 'row',
        gap: 8,
        flexWrap: 'nowrap',
        flex: 1,
        overflow: 'hidden'
    },
    chip: {
        // height: 32,
        borderRadius: 16,
        width: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: scale(0),
        margin: 0
    },
    chipTextActive: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
        marginVertical: 0,
    },
    chipTextInactive: {
        fontSize: 12,
        fontWeight: '600',
        marginHorizontal: 0,
        marginVertical: 0,
    },
    description: {
        fontSize: moderateScale(14),
        lineHeight: verticalScale(15),
        color: lightTheme.colors.darkText,
        marginBottom: scale(3),
        fontWeight: '500',
        minHeight: verticalScale(16),
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6', // Gray 100
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 4,
    },
    statIconWrapper: {
        // No background needed as per design, just icon
    },
    statText: {
        fontSize: 12,
        color: '#6B7280', // Gray 500
        fontWeight: '500',
    },
    toggleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scale(2),
        paddingVertical: scale(2),
        borderRadius: 20,
        gap: 6,
        minWidth: scale(10),
        justifyContent: 'space-between',
    },
    toggleText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 6,
        marginRight: 6,
    },
    toggleIconCircle: {
        width: 18,
        height: 18,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
