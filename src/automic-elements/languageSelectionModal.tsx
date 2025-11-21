import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Text, TextInput, Chip } from 'react-native-paper';
import CustomModal from './customModal';
import CountryFlag from "react-native-country-flag";
import { scale, verticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from './customButton';
import { lightTheme } from '../theme';
import { LANGUAGES } from '../constants/flag';

/* ------------------------------------------------------
   1. LANGUAGE INTERFACE
-------------------------------------------------------*/
interface Language {
    id: string;
    name: string;
    flagCode: string; // IMPORTANT: ISO code for react-native-country-flag
}

/* ------------------------------------------------------
   2. FULL MASTER DATA — 200 LANGUAGES  
   (id, name, flagCode)
-------------------------------------------------------*/


/* ------------------------------------------------------
   3. COMPONENT PROPS
-------------------------------------------------------*/
interface LanguageSelectionModalProps {
    visible: boolean;
    onDismiss: () => void;
    onComplete: (selectedLanguages: Language[]) => void;
    initialSelectedLanguages?: Language[];
}

/* ------------------------------------------------------
   4. MAIN MODAL COMPONENT
-------------------------------------------------------*/
const LanguageSelectionModal: React.FC<LanguageSelectionModalProps> = ({
    visible,
    onDismiss,
    onComplete,
    initialSelectedLanguages = [],
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLanguages, setSelectedLanguages] = useState<Language[]>(initialSelectedLanguages);

    /* FILTER */
    const filteredLanguages = useMemo(() => {
        if (!searchQuery) return LANGUAGES;
        return LANGUAGES.filter((lang) =>
            lang.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);


    /* SELECT / UNSELECT */
    const toggleLanguage = (language: Language) => {
        setSelectedLanguages((prev) => {
            const exists = prev.find((l) => l.id === language.id);
            if (exists) {
                return prev.filter((l) => l.id !== language.id);
            }
            return [...prev, language];
        });
    };

    const isSelected = (id: string) => selectedLanguages.some((l) => l.id === id);


    /* SUBMIT */
    const handleComplete = () => {
        onComplete(selectedLanguages);
        onDismiss();
    };


    /* RENDER ONE LANGUAGE ROW */
    const renderLanguageItem = ({ item }: { item: Language }) => {
        const selected = isSelected(item.id);

        return (
            <TouchableOpacity
                onPress={() => toggleLanguage(item)}
                activeOpacity={0.7}
                style={[
                    styles.languageItem,
                    selected && { borderColor: "#FF9C01", backgroundColor: "#FFF8F0", borderWidth: 1 }
                ]}
            >
                <View style={styles.languageRow}>
                    <CountryFlag isoCode={item.flagCode} size={20} />

                    <Text style={styles.languageName}>
                        {item.name}
                    </Text>
                </View>

                {selected && (
                    <View style={styles.checkIconContainer}>
                        <Icon name="check" size={16} color="#FFF" />
                    </View>
                )}
            </TouchableOpacity>
        );
    };


    /* UI */
    return (
        <CustomModal visible={visible} onDismiss={onDismiss} disableCloseIcon>
            <View style={styles.container}>

                {/* HEADER */}
                <View style={styles.header}>
                    <View style={styles.iconContainer}>
                        <Image
                            source={require('../assets/iconsBackground.png')}
                            style={styles.backgroundImage}
                        />

                        <View style={styles.innerCircle}>
                            <Image source={require('../assets/globe.png')} />
                        </View>
                    </View>

                    <Text style={styles.title}>Choose Languages</Text>
                    <Text style={styles.subtitle}>
                        Select one or more languages you're comfortable with
                    </Text>
                </View>


                {/* SELECTED TAGS */}
                {selectedLanguages.length > 0 && (
                    <View style={styles.selectedContainer}>
                        <Text style={styles.selectedLabel}>
                            Selected ({selectedLanguages.length}):
                        </Text>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {selectedLanguages.map((lang) => (
                                <Chip
                                    key={lang.id}
                                    onClose={() => toggleLanguage(lang)}
                                    style={styles.chip}
                                    textStyle={styles.chipText}
                                >
                                    {lang.name}
                                </Chip>
                            ))}
                        </ScrollView>
                    </View>
                )}


                {/* SEARCH */}
                <TextInput
                    placeholder="Search languages..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    mode="outlined"
                    style={styles.searchInput}
                    left={<TextInput.Icon icon="magnify" />}
                />


                {/* LIST */}
                <FlatList
                    data={filteredLanguages}
                    renderItem={renderLanguageItem}
                    keyExtractor={(item) => item.id}
                    style={{
                        maxHeight: selectedLanguages.length > 0 ? "70%" : "88%",
                    }}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => (
                        <View style={{ height: verticalScale(12) }} />
                    )}
                />


                {/* BUTTON */}
                <CustomButton
                    title="Complete Setup"
                    mode="contained"
                    onPress={handleComplete}
                    style={styles.button}
                />
            </View>
        </CustomModal>
    );
};

/* ------------------------------------------------------
   5. STYLES
-------------------------------------------------------*/
const styles = StyleSheet.create({
    container: {
        height: "100%"
    },
    backgroundImage: {
        position: 'absolute',
        width: 250,
        height: 250,
    },
    innerCircle: {
        width: 64,
        height: 64,
        borderRadius: 16,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
    },
    header: {
        alignItems: 'center',
        marginBottom: verticalScale(20),
        width: "100%"
    },
    iconContainer: {
        width: scale(60),
        height: scale(60),
        backgroundColor: '#FFF',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        color: '#1F2937',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 12,
        color: '#6B7280',
        textAlign: 'center',
        paddingHorizontal: 20,
    },

    selectedContainer: {
        backgroundColor: '#FFF8F0',
        borderRadius: 12,
        padding: 12,
        borderColor: '#FF9C01',
        borderWidth: 1,
        marginBottom: 16,
    },

    selectedLabel: {
        fontSize: 12,
        color: '#6B7280',
        marginBottom: 8,
    },

    chip: {
        marginRight: 8,
        backgroundColor: lightTheme.colors.primary,
    },
    chipText: {
        fontSize: 12,
        color: '#FFF',
    },

    searchInput: {
        backgroundColor: '#FFF',
        marginBottom: 16,
    },

    listContent: {
        paddingBottom: 10,
    },

    languageItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFF',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },

    languageRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },

    languageName: {
        fontSize: 14,
        fontWeight: '500',
    },

    checkIconContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: lightTheme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },

    button: {
        marginTop: 20,
        borderRadius: 12,
        backgroundColor: lightTheme.colors.primary,
    },
});

export default LanguageSelectionModal;
