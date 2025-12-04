import React, { useEffect } from 'react';
// import NetInfo from '@react-native-community/netinfo';
import { useMessage } from '../context/MessageContext';

/**
 * Example of how to use showMessage for network connectivity changes.
 * Note: Requires @react-native-community/netinfo to be installed.
 */
export const useNetworkMonitor = () => {
    const { showMessage } = useMessage();

    useEffect(() => {
        /*
        const unsubscribe = NetInfo.addEventListener(state => {
          if (state.isConnected === false) {
            showMessage({
              type: 'error',
              message: 'No Internet Connection',
              duration: 4000, // Show for longer
            });
          } else if (state.isConnected === true) {
             // Optional: Show back online message
             showMessage({
                type: 'success',
                message: 'Back Online',
             });
          }
        });
    
        return () => unsubscribe();
        */
    }, [showMessage]);
};
