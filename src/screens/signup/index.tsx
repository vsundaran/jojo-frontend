import React, { useRef, useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    TextInput as TextInputType,
    Image,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
    Animated,
} from 'react-native';
import { Text, Button, TextInput, Divider } from 'react-native-paper';
import { scale, verticalScale } from 'react-native-size-matters';
import { useNavigation, useRoute } from '@react-navigation/native';
import { lightTheme } from '../../theme';
import CustomModal from '../../automic-elements/customModal';
import { useSendOTP, useVerifyOTP } from '../../hooks/useAuthQuery';
import { useAuth } from '../../context/AuthContext';

const Signup = () => {
    const [name, setName] = useState('');
    const [visible, setVisible] = useState(true);
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { mobileNumber } = route.params || {};
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const { mutate: sendOTP, isPending: isResending } = useSendOTP();
    const shakeAnimation = useRef(new Animated.Value(0)).current;

    const [resendTimer, setResendTimer] = useState(30);

    useEffect(() => {
        let interval: any;
        if (resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [resendTimer]);

    const inputRef = useRef<TextInputType>(null);

    const onDismiss = () => {
        setVisible(false);
        navigation.navigate("login", { mobileNumber });
    };

    const { mutate: verifyOTP, isPending: isVerifying } = useVerifyOTP();

    const handleContinue = () => {
        console.log('Continue with name:', name);

        const verifyData: any = {
            mobileNumber,
            otp,
        };
        if (name) {
            verifyData.name = name;
        }

        verifyOTP(verifyData, {
            onSuccess: async (response) => {
                console.log('Verify OTP Success:', response.data);
                const { token, user } = response.data;
                await login(token, user);
                setVisible(false);
                navigation.navigate('language-selection');
            },
            onError: (error: any) => {
                console.error('Verify OTP Error:', error);
                const errorMessage = error.response?.data?.message || 'Invalid OTP. Please try again.';
                setError(errorMessage);
                triggerShakeAnimation();
                // Clear OTP field
                setOtp('');
                // Refocus input for better UX
                setTimeout(() => {
                    inputRef.current?.focus();
                }, 200);
            },
        });
    };

    const handleOtpChange = (text: string) => {
        if (/^\d*$/.test(text) && text.length <= 6) {
            setOtp(text);
            // Clear error when user starts typing
            if (error) {
                setError('');
            }
            if (text.length === 6) {
                Keyboard.dismiss();
            }
        }
    };

    const triggerShakeAnimation = () => {
        Animated.sequence([
            Animated.timing(shakeAnimation, {
                toValue: 10,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: -10,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: 10,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: 0,
                duration: 50,
                useNativeDriver: true,
            }),
        ]).start();
    };


    const handleResend = () => {
        console.log('Resend OTP to:', mobileNumber);
        sendOTP(
            { mobileNumber },
            {
                onSuccess: () => {
                    setError('');
                    setResendTimer(30);
                },
                onError: (error: any) => {
                    const errorMessage = error.response?.data?.message || 'Failed to resend OTP';
                    setError(errorMessage);
                },
            }
        );
    };

    return (
        <CustomModal visible={visible} onDismiss={onDismiss} disableCloseIcon enableBackIcon onBack={() => { navigation.navigate("login", { mobileNumber }); setVisible(false); }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>

                    <View style={styles.iconContainer}>
                        {/* Background Icon */}
                        <Image
                            source={require('../../assets/iconsBackground.png')}
                            style={styles.backgroundImage}
                        />

                        {/* Inner White Circle */}
                        <View style={styles.innerCircle}>
                            <Image
                                style={{ backgroundColor: 'transparent' }}
                                source={require('../../assets/lockIcon.png')}
                            />
                        </View>
                    </View>

                    {/* Text Section */}
                    <Text style={styles.title}>Sign up</Text>


                    <View style={styles.inputContainer}>
                        <TextInput
                            mode="outlined"
                            label="How may we address you?"
                            placeholder="name or nick name"
                            value={name}
                            onChangeText={setName}
                            style={styles.input}
                            theme={{
                                colors: {
                                    primary: lightTheme.colors.text,
                                    background: lightTheme.colors.background,
                                    outline: lightTheme.colors.border,
                                },
                                roundness: scale(8),
                            }}
                        />
                    </View>

                    <Divider style={{ width: '100%', height: verticalScale(2), marginBottom: lightTheme.spacing.md, backgroundColor: "#E2E8F0" }} />
                    <Text style={styles.instruction}>
                        Enter the code we sent to {mobileNumber.split("").slice(0, 3).join("") + "*****" + mobileNumber.split("").slice(8).join("")}
                    </Text>
                    <View style={styles.otpContainer}>
                        <TextInput
                            ref={inputRef}
                            style={styles.hiddenInput}
                            value={otp}
                            onChangeText={handleOtpChange}
                            keyboardType="number-pad"
                            maxLength={6}
                            autoFocus={false}
                            caretHidden={true}
                        />
                        <Animated.View
                            style={[
                                styles.otpInputs,
                                { transform: [{ translateX: shakeAnimation }] }
                            ]}
                        >
                            {[...Array(6)].map((_, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.otpCircle,
                                        otp.length === index && styles.otpCircleActive,
                                        otp.length > index && styles.otpCircleFilled,
                                        error && styles.otpCircleError,
                                    ]}
                                    onPress={() => inputRef.current?.focus()}
                                    activeOpacity={1}
                                >
                                    <Text style={styles.otpText}>{otp[index] || ''}</Text>
                                </TouchableOpacity>
                            ))}
                        </Animated.View>
                        {error ? (
                            <Text style={styles.errorText}>{error}</Text>
                        ) : null}
                    </View>
                    <View style={styles.resendContainer}>
                        {/* Resend Link */}
                        <TouchableOpacity onPress={handleResend} disabled={isResending || resendTimer > 0}>
                            <Text style={[styles.resendText, (isResending || resendTimer > 0) && { color: lightTheme.colors.textSecondary }]}>
                                {isResending ? "Resending..." : resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Continue Button */}
                    <Button
                        mode="contained"
                        onPress={handleContinue}
                        style={styles.verifyButton}
                        contentStyle={styles.verifyButtonContent}
                        labelStyle={styles.verifyButtonLabel}
                        disabled={!name.trim()}
                        buttonColor={lightTheme.colors.primary}
                    >
                        Continue
                    </Button>
                </View>
            </TouchableWithoutFeedback>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingBottom: lightTheme.spacing.lg,
    },
    resendContainer: {
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    otpContainer: {
        marginBottom: lightTheme.spacing.lg,
        width: '100%',
        alignItems: 'center',
    },
    resendText: {
        fontSize: scale(12),
        color: lightTheme.colors.darkText,
        fontWeight: '500',
        marginBottom: lightTheme.spacing.lg,
    },
    inputContainer: {
        width: '100%',
        marginBottom: lightTheme.spacing.xl,
    },
    instruction: {
        fontSize: scale(14),
        color: lightTheme.colors.darkText,
        textAlign: 'center',
        marginBottom: lightTheme.spacing.md,
    },
    backgroundImage: {
        position: 'absolute',
        width: 250,
        height: 250,
        borderRadius: 16,
    },
    innerCircle: {
        width: 64,
        height: 64,
        borderRadius: 16,
        backgroundColor: lightTheme.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
    },
    hiddenInput: {
        position: 'absolute',
        width: 1,
        height: 1,
        opacity: 0,
    },
    iconContainer: {
        marginBottom: lightTheme.spacing.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: scale(20),
        fontWeight: 'bold',
        color: lightTheme.colors.darkText,
        marginBottom: lightTheme.spacing.xl,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        backgroundColor: lightTheme.colors.background,
    },
    verifyButton: {
        width: '100%',
        borderRadius: lightTheme.borderRadius.md,
    },
    verifyButtonContent: {
        width: '100%',
        height: verticalScale(33),
    },
    verifyButtonLabel: {
        fontSize: scale(15),
        color: '#FFFFFF',
    },

    otpInputs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: scale(8),
        width: '100%',
    },
    otpCircle: {
        width: scale(34),
        height: scale(34),
        borderRadius: scale(17),
        borderWidth: 1,
        borderColor: lightTheme.colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: lightTheme.colors.background,
        shadowColor: lightTheme.colors.darkText,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    otpCircleActive: {
        borderColor: lightTheme.colors.primary,
        borderWidth: 1.5,
    },
    otpCircleFilled: {
        borderColor: lightTheme.colors.primary,
        backgroundColor: lightTheme.colors.surface,
    },
    otpCircleError: {
        borderColor: '#EF4444',
        borderWidth: 1.5,
    },
    otpText: {
        fontSize: scale(16),
        fontWeight: '600',
        color: lightTheme.colors.text,
    },
    errorText: {
        fontSize: scale(12),
        color: '#EF4444',
        marginTop: lightTheme.spacing.sm,
        textAlign: 'center',
        width: '100%',
        fontWeight: '500',
    },
});

export default Signup;