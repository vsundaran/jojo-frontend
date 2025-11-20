import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Text, TextInput, Button, Chip, Divider, useTheme } from 'react-native-paper';
import CustomModal from './customModal';
import { scale, verticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from './customButton';
import { lightTheme } from '../theme';

// Define Language Interface
interface Language {
    id: string;
    name: string;
}

// Mock Data for Languages
const LANGUAGES: Language[] = [
    { id: '1', name: 'English' },
    { id: '2', name: 'हिन्दी (Hindi)' },
    { id: '3', name: 'தமிழ் (Tamil)' },
    { id: '4', name: 'తెలుగు (Telugu)' },
    { id: '5', name: 'മലയാളം (Malayalam)' },
    { id: '6', name: 'ಕನ್ನಡ (Kannada)' },
    { id: '7', name: 'मराठी (Marathi)' },
    { id: '8', name: 'বাংলা (Bengali)' },
    { id: '9', name: 'ગુજરાતી (Gujarati)' },
    { id: '10', name: 'ਪੰਜਾਬੀ (Punjabi)' },
    { id: '11', name: 'ଓଡ଼ିଆ (Odia)' },
];

interface LanguageSelectionModalProps {
    visible: boolean;
    onDismiss: () => void;
    onComplete: (selectedLanguages: Language[]) => void;
    initialSelectedLanguages?: Language[];
}

const LanguageSelectionModal: React.FC<LanguageSelectionModalProps> = ({
    visible,
    onDismiss,
    onComplete,
    initialSelectedLanguages = [],
}) => {
    const theme = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLanguages, setSelectedLanguages] = useState<Language[]>(initialSelectedLanguages);

    // Filter languages based on search query
    const filteredLanguages = useMemo(() => {
        if (!searchQuery) return LANGUAGES;
        return LANGUAGES.filter((lang) =>
            lang.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    // Toggle language selection
    const toggleLanguage = (language: Language) => {
        setSelectedLanguages((prev) => {
            const exists = prev.find((l) => l.id === language.id);
            if (exists) {
                return prev.filter((l) => l.id !== language.id);
            } else {
                return [...prev, language];
            }
        });
    };

    const isSelected = (id: string) => selectedLanguages.some((l) => l.id === id);

    const handleComplete = () => {
        onComplete(selectedLanguages);
        onDismiss();
    };

    const renderSelectedChips = () => (
        <View style={styles.selectedContainer}>
            <Text style={styles.selectedLabel}>Selected ({selectedLanguages.length}):</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsScroll}>
                {selectedLanguages.map((lang) => (
                    <Chip
                        key={lang.id}
                        onClose={() => toggleLanguage(lang)}
                        style={styles.chip}
                        textStyle={styles.chipText}
                        closeIcon="close"
                    >
                        {lang.name}
                    </Chip>
                ))}
            </ScrollView>
        </View>
    );

    const renderLanguageItem = ({ item }: { item: Language }) => {
        const selected = isSelected(item.id);
        return (
            <TouchableOpacity
                style={[
                    styles.languageItem,
                    selected && { borderColor: '#FF9C01', borderWidth: 1, backgroundColor: '#FFF8F0' }
                ]}
                onPress={() => toggleLanguage(item)}
                activeOpacity={0.7}
            >
                <View style={styles.languageRow}>
                    {/* Flag placeholder if needed in future, currently just name */}
                    <Text style={styles.languageName}>{item.name}</Text>
                </View>
                {selected && (
                    <View style={styles.checkIconContainer}>
                        <Icon name="check" size={scale(16)} color="#FFF" />
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <CustomModal visible={visible} onDismiss={onDismiss} contentContainerStyle={{ maxHeight: '85%' }}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.iconContainer}>
                        <Image source={require('../assets/globe.png')} style={styles.globeIcon} resizeMode="contain" />
                    </View>
                    <Text style={styles.title}>Choose Languages</Text>
                    <Text style={styles.subtitle}>
                        Select one or more languages you're comfortable with
                    </Text>
                </View>

                {/* Selected Languages Area */}
                {selectedLanguages.length > 0 && renderSelectedChips()}

                {/* Search Bar */}
                <TextInput
                    placeholder="Search languages..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    mode="outlined"
                    style={styles.searchInput}
                    outlineStyle={styles.searchOutline}
                    left={<TextInput.Icon icon="magnify" color="#9CA3AF" />}
                    theme={{ roundness: 12 }}
                />

                {/* Language List */}
                <FlatList
                    data={filteredLanguages}
                    renderItem={renderLanguageItem}
                    keyExtractor={(item) => item.id}
                    style={styles.list}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={{ height: verticalScale(12) }} />}
                />

                {/* Footer Button */}
                <CustomButton
                    title='Complete Setup'
                    mode="contained"
                    onPress={handleComplete}
                    style={styles.button}
                    contentStyle={styles.buttonContent}
                    labelStyle={styles.buttonLabel}
                />
            </View>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    container: {
        // paddingHorizontal: scale(4),
        paddingBottom: verticalScale(10),
        flex: 1, // Ensure container takes available space
    },
    header: {
        alignItems: 'center',
        marginBottom: verticalScale(20),
    },
    iconContainer: {
        width: scale(60),
        height: scale(60),
        backgroundColor: '#FFF',
        borderRadius: scale(16),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: verticalScale(16),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    globeIcon: {
        width: scale(32),
        height: scale(32),
        tintColor: lightTheme.colors.primary, // Use theme primary color
    },
    title: {
        fontSize: scale(20),
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: verticalScale(8),
        textAlign: 'center',
    },
    subtitle: {
        fontSize: scale(12),
        color: '#6B7280',
        textAlign: 'center',
        paddingHorizontal: scale(20),
    },
    selectedContainer: {
        backgroundColor: '#FFF8F0',
        borderRadius: scale(12),
        padding: scale(12),
        marginBottom: verticalScale(16),
        borderWidth: 1,
        borderColor: '#FF9C01',
    },
    selectedLabel: {
        fontSize: scale(12),
        color: '#6B7280',
        marginBottom: verticalScale(8),
    },
    chipsScroll: {
        paddingRight: scale(10),
    },
    chip: {
        marginRight: scale(8),
        backgroundColor: lightTheme.colors.primary, // Use theme primary color
        height: verticalScale(32),
    },
    chipText: {
        color: '#FFF',
        fontSize: scale(12),
    },
    searchInput: {
        backgroundColor: '#FFF',
        marginBottom: verticalScale(16),
        height: verticalScale(48),
        fontSize: scale(14),
    },
    searchOutline: {
        borderColor: '#E5E7EB',
        borderRadius: scale(12),
    },
    list: {
        flex: 1, // Allow list to take available space and scroll
    },
    listContent: {
        paddingBottom: verticalScale(10),
    },
    languageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: scale(16),
        backgroundColor: '#FFF',
        borderRadius: scale(12),
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    languageRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    languageName: {
        fontSize: scale(14),
        color: '#374151',
        fontWeight: '500',
    },
    checkIconContainer: {
        width: scale(24),
        height: scale(24),
        borderRadius: scale(12),
        backgroundColor: lightTheme.colors.primary, // Use theme primary color
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginTop: verticalScale(20),
        backgroundColor: lightTheme.colors.primary, // Use theme primary color
        borderRadius: scale(12),
    },
    buttonContent: {
        height: verticalScale(48),
    },
    buttonLabel: {
        fontSize: scale(16),
        fontWeight: 'bold',
        color: '#FFF',
    },
});

export default LanguageSelectionModal;
