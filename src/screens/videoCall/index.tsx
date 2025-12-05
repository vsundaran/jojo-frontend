
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { scale, verticalScale } from 'react-native-size-matters';

import { useRoute } from "@react-navigation/native";
import { Call } from "../../types";

interface VideoCallScreenProps { }

export default function VideoCallScreen({ }: VideoCallScreenProps) {
    const route = useRoute();
    const { callData } = (route.params as { callData: Call }) || {};

    // Log to verify data reception (can be removed later or used for logic)
    useEffect(() => {
        if (callData) {
            console.log("VideoCallScreen received call data:", callData.callId);
        }
    }, [callData]);
    const [countdown, setCountdown] = useState(30);

    useEffect(() => {
        if (countdown <= 0) return;

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [countdown]);

    const formatCountdown = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#414042" />

            {/* Top Bar */}
            <View style={styles.topBar}>
                {/* Countdown Timer */}
                <View style={styles.timerContainer}>
                    <Text style={styles.timerText}>{formatCountdown(countdown)}</Text>
                </View>
            </View>

            {/* Center Section - Video Placeholder */}
            <View style={styles.centerSection}>
                <View style={styles.videoPlaceholder}>
                    <Icon name="person" size={140} color="#999" />
                </View>
            </View>

            {/* Bottom Control Bar */}
            <View style={styles.bottomControlBar}>
                {/* Microphone Button */}
                <TouchableOpacity style={styles.controlButton}>
                    <Icon name="mic" size={28} color="#414042" />
                </TouchableOpacity>

                {/* Call End Button (Red) */}
                <TouchableOpacity style={[styles.controlButton, styles.callEndButton]}>
                    <Icon name="call-end" size={28} color="#FFFFFF" />
                </TouchableOpacity>

                {/* Video Camera Button */}
                <TouchableOpacity style={styles.controlButton}>
                    <Icon name="videocam" size={28} color="#414042" />
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#414042',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: verticalScale(50),
        paddingHorizontal: scale(20),
        position: 'relative',
    },

    timerContainer: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: scale(20),
        paddingVertical: verticalScale(8),
        borderRadius: scale(20),
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },

    timerText: {
        fontSize: scale(16),
        fontWeight: '600',
        color: '#FF9800', // Orange color
        fontFamily: 'Poppins-SemiBold',
    },

    userBadge: {
        position: 'absolute',
        right: scale(20),
        top: verticalScale(50),
        width: scale(40),
        height: scale(40),
        borderRadius: scale(20),
        backgroundColor: '#2196F3', // Blue background
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },

    userBadgeText: {
        fontSize: scale(18),
        fontWeight: 'bold',
        color: '#FFFFFF',
        fontFamily: 'Poppins-Bold',
    },


    centerSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // paddingHorizontal: scale(20),
    },

    videoPlaceholder: {
        width: '100%',
        height: '90%',
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: verticalScale(20),
    },

    bottomControlBar: {
        borderTopLeftRadius: scale(30),
        borderTopRightRadius: scale(30),
        paddingVertical: verticalScale(25),
        paddingHorizontal: scale(40),
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    controlButton: {
        width: scale(60),
        height: scale(60),
        borderRadius: scale(30),
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },

    callEndButton: {
        backgroundColor: '#E53935', // Red background for call end
    },
});
