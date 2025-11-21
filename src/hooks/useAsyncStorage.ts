import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

export const useAsyncStorage = (key: string) => {
    const [storedValue, setStoredValue] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const getValue = useCallback(async () => {
        try {
            setLoading(true);
            const value = await AsyncStorage.getItem(key);
            setStoredValue(value);
            return value;
        } catch (e) {
            setError(e as Error);
            console.error(`Error getting value for key ${key}:`, e);
            return null;
        } finally {
            setLoading(false);
        }
    }, [key]);

    const setValue = useCallback(async (value: string) => {
        try {
            setLoading(true);
            await AsyncStorage.setItem(key, value);
            setStoredValue(value);
        } catch (e) {
            setError(e as Error);
            console.error(`Error setting value for key ${key}:`, e);
        } finally {
            setLoading(false);
        }
    }, [key]);

    const removeValue = useCallback(async () => {
        try {
            setLoading(true);
            await AsyncStorage.removeItem(key);
            setStoredValue(null);
        } catch (e) {
            setError(e as Error);
            console.error(`Error removing value for key ${key}:`, e);
        } finally {
            setLoading(false);
        }
    }, [key]);

    useEffect(() => {
        getValue();
    }, [getValue]);

    return {
        storedValue,
        loading,
        error,
        getValue,
        setValue,
        removeValue,
    };
};
