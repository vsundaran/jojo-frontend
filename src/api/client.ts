import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../constants/StorageKeys';
import { Platform } from 'react-native';
import MessageService from '../services/messageService';

export const PROD =
  'https://jojo-prod-backend-hjhdf8dacjbuhyar.eastus-01.azurewebsites.net/api';
export const DEV =
  'https://jojo-dev-backend-f9a5bvgggchga4fw.eastus-01.azurewebsites.net/api';
export const local =
  Platform.OS === 'ios'
    ? 'http://localhost:3000/api'
    : 'http://10.0.2.2:3000/api';

const apiClient = axios.create({
  baseURL: local,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  async config => {
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
  error => {
    console.error('📤 [API REQUEST ERROR]', error);
    return Promise.reject(error);
  },
);

// Response Interceptor
apiClient.interceptors.response.use(
  response => {
    console.log('📥 [API RESPONSE]', {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  error => {
    if (error.response) {
      console.log('📥 [API RESPONSE ERROR]', {
        url: error.config?.url,
        status: error.response.status,
        data: error.response.data,
      });

      // Global error message
      const errorMessage = error.response.data?.message || 'Something went wrong';
      MessageService.showMessage({
        type: 'error',
        message: errorMessage,
      });
    } else {
      console.log(
        '📥 [API RESPONSE ERROR] Network Error or other issue',
        error.message,
      );

      MessageService.showMessage({
        type: 'error',
        message: error.message || 'Network Error',
      });
    }
    return Promise.reject(error);
  },
);

export default apiClient;
