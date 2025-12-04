import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMessage } from '../context/MessageContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const COLORS = {
    error: '#ac2b2bff',
    success: '#1B5E20',
    warning: '#F57C00',
    info: '#1565C0',
};

export const MessageBar = () => {
    const { message, type, visible, hideMessage } = useMessage();
    const insets = useSafeAreaInsets();
    const translateY = useRef(new Animated.Value(-200)).current;

    useEffect(() => {
        if (visible) {
            Animated.spring(translateY, {
                toValue: 0,
                useNativeDriver: true,
                speed: 12,
                bounciness: 5,
            }).start();
        } else {
            Animated.timing(translateY, {
                toValue: -200,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [visible, translateY]);

    const backgroundColor = COLORS[type];

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    backgroundColor,
                    paddingTop: insets.top > 0 ? insets.top : 50, // Increased default padding
                    transform: [{ translateY }],
                },
            ]}
        >
            <View style={styles.contentContainer}>
                <Text style={styles.messageText} numberOfLines={2}>
                    {message}
                </Text>
                <TouchableOpacity onPress={hideMessage} style={styles.closeButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <MaterialIcons name="close" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 99999,
        elevation: 100, // High elevation for Android
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 20, // Increased bottom padding
        paddingTop: 15, // Increased top padding
    },
    messageText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
        flex: 1,
        marginRight: 10,
    },
    closeButton: {
        padding: 4,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 12,
    },
});
