import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, PermissionsAndroid, Platform, Alert, BackHandler } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { scale, verticalScale } from 'react-native-size-matters';
import { useRoute, useNavigation } from "@react-navigation/native";
import { Call } from "../../types";
import { ACSCallService } from "../../services/acsCallService";
import { ACSVideoView } from "../../components/ACSVideoView";

interface VideoCallScreenProps { }

export default function VideoCallScreen({ }: VideoCallScreenProps) {
    const route = useRoute();
    const navigation = useNavigation();
    const { callData } = (route.params as { callData: Call }) || {};

    const [isCallConnected, setIsCallConnected] = useState(false);
    const [remoteParticipantId, setRemoteParticipantId] = useState<string | null>(null);
    const [isMicMuted, setIsMicMuted] = useState(false);
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [countdown, setCountdown] = useState(30);
    const [callStatus, setCallStatus] = useState("Connecting...");

    // Timer ref to clear it on unmount
    const timerRef = useRef<any>(null);

    useEffect(() => {
        const initCall = async () => {
            if (!callData) {
                Alert.alert("Error", "No call data received");
                navigation.goBack();
                return;
            }

            try {
                // Request permissions
                if (Platform.OS === 'android') {
                    const granted = await PermissionsAndroid.requestMultiple([
                        PermissionsAndroid.PERMISSIONS.CAMERA,
                        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
                    ]);

                    if (
                        granted['android.permission.CAMERA'] !== PermissionsAndroid.RESULTS.GRANTED ||
                        granted['android.permission.RECORD_AUDIO'] !== PermissionsAndroid.RESULTS.GRANTED
                    ) {
                        Alert.alert("Permission Denied", "Camera and Microphone permissions are required.");
                        navigation.goBack();
                        return;
                    }
                }

                // Initialize ACS
                const token = callData.participantToken || callData.creatorToken || "";
                console.log("Initializing ACS with token length:", token.length);

                if (!token || token.length < 50) { // Basic check for placeholder tokens
                    Alert.alert("Error", "Invalid ACS Token. Please ensure the backend provides a valid JWT token.");
                    navigation.goBack();
                    return;
                }
                await ACSCallService.init(token);

                // Setup listeners
                const removeStateListener = ACSCallService.addListener('onCallStateChanged', (event) => {
                    console.log("Call State:", event.state);
                    setCallStatus(event.state);
                    if (event.state === 'CONNECTED') {
                        setIsCallConnected(true);
                        // Stop countdown when connected? Or keep it as per requirement?
                        // Requirement: "If countdown reaches 0: Do NOT automatically end the call. Countdown is only a UI element"
                    } else if (event.state === 'DISCONNECTED') {
                        handleCallEnded();
                    }
                });

                const removeParticipantListener = ACSCallService.addListener('onParticipantJoined', (event) => {
                    console.log("Participant Joined:", event.participantId);
                    // For 1:1 call, we assume the first remote participant is the one we want to show
                    setRemoteParticipantId(event.participantId);
                });

                const removeVideoListener = ACSCallService.addListener('onRemoteVideoAdded', (event) => {
                    console.log("Remote Video Added:", event);
                    // Force re-render or update state if needed, but the view should handle stream rendering by ID
                    setRemoteParticipantId(event.participantId);
                });

                // Join Call
                await ACSCallService.joinCall(callData.callId, "User"); // Replace "User" with actual display name if available

                // Start local video
                await ACSCallService.toggleCamera(true);

                return () => {
                    removeStateListener();
                    removeParticipantListener();
                    removeVideoListener();
                };

            } catch (error) {
                console.error("Call Initialization Error:", error);
                Alert.alert("Error", "Failed to join call");
                navigation.goBack();
            }
        };

        initCall();

        // Handle Back Button
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            return true; // Prevent default back action
        });

        return () => {
            cleanupCall();
            backHandler.remove();
        };
    }, [callData]);

    // Countdown Logic
    useEffect(() => {
        if (countdown <= 0) return;

        timerRef.current = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    if (timerRef.current) clearInterval(timerRef.current);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [countdown]);

    const cleanupCall = async () => {
        try {
            await ACSCallService.endCall();
        } catch (e) {
            console.error("Error ending call:", e);
        }
    };

    const handleCallEnded = () => {
        cleanupCall();
        navigation.goBack();
    };

    const toggleMic = async () => {
        const newMutedState = !isMicMuted;
        await ACSCallService.toggleMic(newMutedState);
        setIsMicMuted(newMutedState);
    };

    const toggleCamera = async () => {
        const newCameraState = !isCameraOn;
        await ACSCallService.toggleCamera(newCameraState);
        setIsCameraOn(newCameraState);
    };

    const formatCountdown = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#414042" />

            {/* Remote Video (Full Screen) */}
            {remoteParticipantId ? (
                <View style={styles.remoteVideoContainer}>
                    <ACSVideoView participantId={remoteParticipantId} style={styles.remoteVideo} />
                </View>
            ) : (
                <View style={styles.centerSection}>
                    <View style={styles.videoPlaceholder}>
                        <Icon name="person" size={140} color="#999" />
                        <Text style={styles.statusText}>{callStatus}</Text>
                    </View>
                </View>
            )}

            {/* Local Video (Floating) */}
            {isCameraOn && (
                <View style={styles.localVideoContainer}>
                    <ACSVideoView participantId="local" style={styles.localVideo} />
                </View>
            )}

            {/* Top Bar */}
            <View style={styles.topBar}>
                <View style={styles.timerContainer}>
                    <Text style={styles.timerText}>{formatCountdown(countdown)}</Text>
                </View>
            </View>

            {/* Bottom Control Bar */}
            <View style={styles.bottomControlBar}>
                {/* Microphone Button */}
                <TouchableOpacity style={[styles.controlButton, isMicMuted && styles.disabledButton]} onPress={toggleMic}>
                    <Icon name={isMicMuted ? "mic-off" : "mic"} size={28} color={isMicMuted ? "#FFFFFF" : "#414042"} />
                </TouchableOpacity>

                {/* Call End Button (Red) */}
                <TouchableOpacity style={[styles.controlButton, styles.callEndButton]} onPress={handleCallEnded}>
                    <Icon name="call-end" size={28} color="#FFFFFF" />
                </TouchableOpacity>

                {/* Video Camera Button */}
                <TouchableOpacity style={[styles.controlButton, !isCameraOn && styles.disabledButton]} onPress={toggleCamera}>
                    <Icon name={isCameraOn ? "videocam" : "videocam-off"} size={28} color={!isCameraOn ? "#FFFFFF" : "#414042"} />
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
    remoteVideoContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000',
    },
    remoteVideo: {
        flex: 1,
    },
    localVideoContainer: {
        position: 'absolute',
        right: scale(20),
        top: verticalScale(100),
        width: scale(100),
        height: verticalScale(140),
        borderRadius: scale(10),
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#FFF',
        elevation: 5,
        zIndex: 10,
    },
    localVideo: {
        flex: 1,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: verticalScale(50),
        paddingHorizontal: scale(20),
        position: 'relative',
        zIndex: 20,
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
    centerSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoPlaceholder: {
        width: '100%',
        height: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusText: {
        color: '#FFF',
        marginTop: 20,
        fontSize: 18,
    },
    bottomControlBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopLeftRadius: scale(30),
        borderTopRightRadius: scale(30),
        paddingVertical: verticalScale(25),
        paddingHorizontal: scale(40),
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
        zIndex: 20,
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
    disabledButton: {
        backgroundColor: '#757575',
    },
    callEndButton: {
        backgroundColor: '#E53935', // Red background for call end
    },
});
