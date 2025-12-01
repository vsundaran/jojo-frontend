import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../constants/StorageKeys';

export interface Language {
    id: string;
    name: string;
    flagCode: string;
}

/**
 * Load available languages from cache or API
 * This function checks AsyncStorage first, then falls back to API if needed
 */
export const loadAvailableLanguages = async (): Promise<Language[]> => {
    try {
        const cached = await AsyncStorage.getItem(StorageKeys.AVAILABLE_LANGUAGES);
        if (cached) {
            return JSON.parse(cached);
        }
        return [];
    } catch (error) {
        console.error('Failed to load available languages:', error);
        return [];
    }
};

/**
 * Save available languages to AsyncStorage
 */
export const saveAvailableLanguages = async (languages: Language[]): Promise<void> => {
    try {
        await AsyncStorage.setItem(
            StorageKeys.AVAILABLE_LANGUAGES,
            JSON.stringify(languages)
        );
    } catch (error) {
        console.error('Failed to save available languages:', error);
    }
};

/**
 * Get a single language object by ID
 */
export const getLanguageById = (
    id: string,
    availableLanguages: Language[]
): Language | undefined => {
    return availableLanguages.find(lang => lang.id === id);
};

/**
 * Get multiple language objects by IDs
 */
export const getLanguagesByIds = (
    ids: string[],
    availableLanguages: Language[]
): Language[] => {
    return ids
        .map(id => getLanguageById(id, availableLanguages))
        .filter((lang): lang is Language => lang !== undefined);
};
