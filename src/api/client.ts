import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../constants/StorageKeys';

const apiClient = axios.create({
    // baseURL: 'https://jojo-dev-backend-f9a5bvgggchga4fw.eastus-01.azurewebsites.net/api',
    baseURL: 'http://10.0.2.2:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
apiClient.interceptors.request.use(
    async (config) => {
        try {
            const token = await AsyncStorage.getItem(StorageKeys.AUTH_TOKEN);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error('Error retrieving token from storage:', error);
        }

        console.log('📤 [API REQUEST]', {
            url: config.url,
            method: config.method,
            baseURL: config.baseURL,
            headers: config.headers,
            params: config.params,
            data: config.data,
        });

        return config;
    },
    (error) => {
        console.error('📤 [API REQUEST ERROR]', error);
        return Promise.reject(error);
    }
);

// Response Interceptor
apiClient.interceptors.response.use(
    (response) => {
        console.log('📥 [API RESPONSE]', {
            url: response.config.url,
            status: response.status,
            data: response.data,
        });
        return response;
    },
    (error) => {
        if (error.response) {
            console.log('📥 [API RESPONSE ERROR]', {
                url: error.config?.url,
                status: error.response.status,
                data: error.response.data,
            });
        } else {
            console.log('📥 [API RESPONSE ERROR] Network Error or other issue', error.message);
        }
        return Promise.reject(error);
    }
);

export default apiClient;
