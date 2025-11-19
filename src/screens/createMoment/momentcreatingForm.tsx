import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, Menu } from 'react-native-paper';
import { scale, verticalScale } from 'react-native-size-matters';
import { lightTheme } from '../../theme';
import { FormLabel } from '../../automic-elements/formLabel';
import { SelectionChip } from '../../automic-elements/selectionChip';
import { InfoCard } from '../../automic-elements/infoCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const MomentCreatingForm = () => {
    const [momentText, setMomentText] = useState('');
    const [isImmediate, setIsImmediate] = useState(true);
    const [duration, setDuration] = useState(60);
    const [language, setLanguage] = useState('Tamil');
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);
    const [scheduledTime, setScheduledTime] = useState('');

    const languages = ['Tamil', 'English', 'Hindi', 'Malayalam'];

    const handleCreateMoment = () => {
        // Handle creation logic
        console.log({ momentText, isImmediate, duration, language });
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {/* Description Input */}
            <View style={{ ...styles.section, marginBottom: verticalScale(35) }}>
                <FormLabel optionalText="(max 60 characters)">Tell us about your moment</FormLabel>
                <View style={styles.inputContainer}>
                    <TextInput
                        mode="outlined"
                        placeholder="e.g., Its my birthday today. Would love to hear some wishes."
                        placeholderTextColor={lightTheme.colors.placeholder}
                        value={momentText}
                        onChangeText={setMomentText}
                        maxLength={60}
                        multiline
                        numberOfLines={5}
                        style={styles.textInput}
                        outlineStyle={styles.inputOutline}
                        contentStyle={styles.inputContent}
                        theme={{ colors: { primary: lightTheme.colors.primary, background: '#FFFFFF' } }}
                    />
                    <Text style={styles.charCount}>{momentText.length}/60</Text>
                </View>
            </View>

            {/* Go Live Time Toggle */}
            <View style={styles.section}>
                <FormLabel>When do you want your moment to go live?</FormLabel>
                <View style={styles.toggleContainer}>
                    <TouchableOpacity
                        style={[styles.toggleButton, isImmediate && styles.toggleButtonActive]}
                        onPress={() => setIsImmediate(true)}
                        activeOpacity={0.9}
                    >
                        <Text style={[styles.toggleText, isImmediate && styles.toggleTextActive]}>Immediate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.toggleButton, !isImmediate && styles.toggleButtonActive]}
                        onPress={() => setIsImmediate(false)}
                        activeOpacity={0.9}
                    >
                        <Text style={[styles.toggleText, !isImmediate && styles.toggleTextActive]}>Later</Text>
                    </TouchableOpacity>
                </View>

                {/* Date/Time Selection for Later */}
                {!isImmediate && (
                    <View style={styles.dateTimeContainer}>
                        <TextInput
                            mode="outlined"
                            placeholder="dd-mm-yyyy --:--"
                            placeholderTextColor="#9CA3AF"
                            value={scheduledTime}
                            onChangeText={setScheduledTime}
                            style={styles.dateTimeInput}
                            outlineStyle={styles.dateTimeOutline}
                            right={<TextInput.Icon icon="calendar-blank-outline" color="#8B12B6" />}
                            theme={{ colors: { primary: lightTheme.colors.primary, background: '#FFFFFF' } }}
                        // editable={false} // Currently just UI
                        />
                    </View>
                )}
            </View>


            {/* Duration Selection */}
            <View style={styles.section}>
                <FormLabel>How many mins should this moment be active?</FormLabel>
                <View style={styles.chipsContainer}>
                    {[30, 60, 90, 120].map((mins) => (
                        <SelectionChip
                            key={mins}
                            label={mins.toString()}
                            selected={duration === mins}
                            onPress={() => setDuration(mins)}
                            style={styles.chip}
                        />
                    ))}
                </View>
            </View>

            {/* Language Selection */}
            <View style={styles.section}>
                <FormLabel>What language do you prefer?</FormLabel>
                <Menu
                    visible={showLanguageMenu}
                    onDismiss={() => setShowLanguageMenu(false)}
                    anchor={
                        <TouchableOpacity
                            onPress={() => setShowLanguageMenu(true)}
                            style={styles.dropdownTrigger}
                        >
                            <Text style={styles.dropdownText}>{language}</Text>
                            <Icon name="chevron-down" size={24} color="#D459FF" />
                        </TouchableOpacity>
                    }
                    contentStyle={{ backgroundColor: '#FFFFFF' }}
                >
                    {languages.map((lang) => (
                        <Menu.Item
                            key={lang}
                            onPress={() => {
                                setLanguage(lang);
                                setShowLanguageMenu(false);
                            }}
                            title={lang}
                        />
                    ))}
                </Menu>
            </View>

            {/* Create Button */}
            <Button
                mode="contained"
                onPress={handleCreateMoment}
                style={styles.createButton}
                labelStyle={styles.createButtonLabel}
                contentStyle={styles.createButtonContent}
            >
                Create Moment
            </Button>

            {/* Info Card */}
            <InfoCard
                title="How it works:"
                items={[
                    'Your moment will appear on the Wall of Joy',
                    'People can send you support reactions',
                    'Someone might connect with you for a 30sec call',
                    'Stay online to receive calls!',
                ]}
            />
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    contentContainer: {
        padding: scale(16),
        paddingBottom: verticalScale(32),
    },
    section: {
        marginBottom: verticalScale(20),
    },
    inputContainer: {
        position: 'relative',
    },
    textInput: {
        backgroundColor: '#FFFFFF',
        fontSize: scale(14),
    },
    inputOutline: {
        height: verticalScale(68),
        paddingVertical: verticalScale(12),
        borderRadius: scale(8),
        borderColor: '#9A9797',
    },
    inputContent: {
        paddingBottom: verticalScale(20), // Space for char count
    },
    charCount: {
        position: 'absolute',
        bottom: verticalScale(8),
        right: scale(12),
        fontSize: scale(12),
        color: '#9CA3AF',
    },
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: '#F3F4F6',
        borderRadius: scale(34),
        padding: scale(2),
        height: verticalScale(36),
    },
    toggleButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scale(34),
    },
    toggleButtonActive: {
        backgroundColor: '#FADAFF', // Pink background
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 4,
    },
    toggleText: {
        fontSize: scale(14),
        color: lightTheme.colors.text,
        fontWeight: '500',
    },
    toggleTextActive: {
        color: '#8B12B6', // Active pink text
        fontWeight: '600',
    },
    dateTimeContainer: {
        marginTop: verticalScale(20),
    },
    dateTimeInput: {
        backgroundColor: '#FFFFFF',
        fontSize: scale(14),
    },
    dateTimeOutline: {
        borderRadius: scale(8),
        borderColor: '#9A9797',
    },
    chipsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    chip: {
        flex: 1,
        marginHorizontal: scale(4),
        minWidth: 0, // Allow shrinking
    },
    dropdownTrigger: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#9CA3AF', // Grey border
        borderRadius: scale(8),
        paddingHorizontal: scale(16),
        paddingVertical: verticalScale(12),
        backgroundColor: '#FFFFFF',
    },
    dropdownText: {
        fontSize: scale(14),
        color: '#9CA3AF', // Placeholder color style
    },
    createButton: {
        backgroundColor: '#414042', // Dark grey from theme primary
        borderRadius: scale(8),
        marginTop: verticalScale(8),
        marginBottom: verticalScale(18),
    },
    createButtonContent: {
        height: verticalScale(48),
    },
    createButtonLabel: {
        fontSize: scale(16),
        fontWeight: '700',
        color: '#FFFFFF',
    },
});
