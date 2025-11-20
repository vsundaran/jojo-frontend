// import React, { useState } from 'react';
// import { StyleSheet, View, Image } from 'react-native';
// import { Text, Button, TextInput } from 'react-native-paper';
// import { scale, verticalScale } from 'react-native-size-matters';
// import { lightTheme } from '../../theme';
// import CustomModal from '../../automic-elements/customModal';

// const Signup = () => {
//     const [visible, setVisible] = useState(true);
//     const [name, setName] = useState('');

//     const onDismiss = () => {
//         setVisible(false);
//     };

//     const handleContinue = () => {
//         console.log('Continue with name:', name);
//         onDismiss();
//     };

//     return (
//         <CustomModal visible={visible} onDismiss={onDismiss}>
//             <View style={styles.container}>
//                 {/* Icon Section */}
//                 <View style={styles.iconContainer}>
//                     {/* Background Icon */}
//                     <Image
//                         source={require('../../assets/iconsBackground.png')}
//                         style={styles.backgroundImage}
//                     />

//                     {/* Inner White Circle */}
//                     <View style={styles.innerCircle}>
//                         <Image
//                             style={styles.lockIcon}
//                             source={require('../../assets/lockIcon.png')}
//                             resizeMode="contain"
//                         />
//                     </View>
//                 </View>

//                 {/* Title */}
//                 <Text style={styles.title}>Sign up</Text>

//                 {/* Input Section */}
//                 <View style={styles.inputContainer}>
//                     <TextInput
//                         mode="outlined"
//                         label="How may we address you?"
//                         placeholder="name or nick name"
//                         value={name}
//                         onChangeText={setName}
//                         style={styles.input}
//                         theme={{
//                             colors: {
//                                 primary: lightTheme.colors.text,
//                                 background: lightTheme.colors.background,
//                                 outline: lightTheme.colors.border,
//                             },
//                             roundness: scale(8),
//                         }}
//                     />
//                 </View>

//                 {/* Continue Button */}
//                 <Button
//                     mode="contained"
//                     onPress={handleContinue}
//                     style={styles.button}
//                     contentStyle={styles.buttonContent}
//                     labelStyle={styles.buttonLabel}
//                     buttonColor={lightTheme.colors.darkText}
//                 >
//                     Continue
//                 </Button>
//             </View>
//         </CustomModal>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         alignItems: 'center',
//         paddingHorizontal: lightTheme.spacing.md,
//         paddingBottom: lightTheme.spacing.lg,
//     },
//     iconContainer: {
//         marginBottom: lightTheme.spacing.md,
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: scale(80),
//         width: scale(80),
//     },
//     backgroundImage: {
//         position: 'absolute',
//         width: scale(200),
//         height: scale(200),
//         opacity: 0.5,
//     },
//     innerCircle: {
//         width: scale(64),
//         height: scale(64),
//         borderRadius: scale(16),
//         backgroundColor: lightTheme.colors.background,
//         justifyContent: 'center',
//         alignItems: 'center',
//         elevation: 10,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.1,
//         shadowRadius: 10,
//     },
//     lockIcon: {
//         width: scale(24),
//         height: scale(24),
//         tintColor: lightTheme.colors.primary,
//     },
//     title: {
//         fontSize: scale(24),
//         fontWeight: 'bold',
//         color: lightTheme.colors.darkText,
//         marginBottom: lightTheme.spacing.xl,
//         textAlign: 'center',
//     },
//     inputContainer: {
//         width: '100%',
//         marginBottom: lightTheme.spacing.xl,
//     },
//     input: {
//         width: '100%',
//         backgroundColor: lightTheme.colors.background,
//     },
//     button: {
//         width: '100%',
//         borderRadius: lightTheme.borderRadius.md,
//         marginTop: lightTheme.spacing.md,
//     },
//     buttonContent: {
//         height: verticalScale(48),
//     },
//     buttonLabel: {
//         fontSize: scale(16),
//         fontWeight: 'bold',
//         color: '#FFFFFF',
//     },
// });

// export default Signup;


import React, { useState, useRef } from 'react';
import {
    StyleSheet,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    TextInput as TextField,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import { Text, Button, Avatar, TextInput, Divider } from 'react-native-paper';
import { scale, verticalScale } from 'react-native-size-matters';
import { lightTheme } from '../../theme';
import CustomModal from '../../automic-elements/customModal';

const Signup = () => {
    const [otp, setOtp] = useState('');
    const inputRef = useRef<TextField>(null);

    const handleOtpChange = (text: string) => {
        if (/^\d*$/.test(text) && text.length <= 6) {
            setOtp(text);
            if (text.length === 6) {
                Keyboard.dismiss();
            }
        }
    };

    const handleVerify = () => {
        console.log('Verify OTP:', otp);
        onDismiss();
        // Add verification logic here
    };

    const handleResend = () => {
        console.log('Resend OTP');
        // Add resend logic here
    };

    const [visible, setIsvisible] = useState(true);
    const onDismiss = () => {
        setIsvisible(false);
    };

    return (
        <CustomModal visible={visible} onDismiss={onDismiss}>
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
                                // size={34}
                                source={require('../../assets/lockIcon.png')}
                            />
                        </View>
                    </View>

                    {/* Text Section */}
                    <Text style={styles.title}>Sign up</Text>


                    <View style={styles.inputContainer}>
                        <TextInput
                            mode="outlined" label="How may we address you?"
                            placeholder="name or nick name"
                            // value={name}
                            // onChangeText={setName}
                            style={styles.input}
                            theme={{
                                colors: {
                                    primary: lightTheme.colors.text,
                                    background: lightTheme.colors.background, outline: lightTheme.colors.border,
                                },
                                roundness: scale(8),
                            }}
                        />
                    </View>

                    <Divider style={{ width: '100%', height: verticalScale(2), marginBottom: lightTheme.spacing.md, backgroundColor: "#E2E8F0" }} />

                    <Text style={styles.instruction}>
                        Enter the code we sent to +91 *****50284
                    </Text>

                    {/* OTP Input Section */}
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
                        <View style={styles.otpInputs}>
                            {[...Array(6)].map((_, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.otpCircle,
                                        otp.length === index && styles.otpCircleActive,
                                        otp.length > index && styles.otpCircleFilled,
                                    ]}
                                    onPress={() => inputRef.current?.focus()}
                                    activeOpacity={1}
                                >
                                    <Text style={styles.otpText}>{otp[index] || ''}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View style={styles.resendContainer}>
                        {/* Resend Link */}
                        <TouchableOpacity onPress={handleResend}>
                            <Text style={styles.resendText}>Resend</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Verify Button */}
                    <Button
                        mode="contained"
                        onPress={handleVerify}
                        style={styles.verifyButton}
                        contentStyle={styles.verifyButtonContent}
                        labelStyle={styles.verifyButtonLabel}
                        disabled={otp.length !== 6}
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
        // paddingHorizontal: lightTheme.spacing.md,
        paddingBottom: lightTheme.spacing.lg,
    },
    inputContainer: {
        width: '100%',
        marginBottom: lightTheme.spacing.xl,
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

    iconContainer: {
        marginBottom: lightTheme.spacing.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconBackground: {
        width: scale(80),
        height: scale(80),
        alignItems: 'center',
        justifyContent: 'center',
    },
    lockIcon: {
        width: scale(30),
        height: scale(30),
        tintColor: lightTheme.colors.primary,
    },
    title: {
        fontSize: scale(20),
        fontWeight: 'bold',
        color: lightTheme.colors.darkText,
        marginBottom: lightTheme.spacing.xl,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: scale(16),
        fontWeight: '500',
        color: lightTheme.colors.text,
        marginBottom: lightTheme.spacing.sm,
        textAlign: 'center',
    },
    resendContainer: {
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    instruction: {
        fontSize: scale(14),
        color: lightTheme.colors.text,
        textAlign: 'center',
        marginBottom: lightTheme.spacing.md,
    },
    otpContainer: {
        marginBottom: lightTheme.spacing.lg,
        width: '100%',
        alignItems: 'center',
    },
    hiddenInput: {
        position: 'absolute',
        width: 1,
        height: 1,
        opacity: 0,
    },
    otpInputs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: scale(8),
        width: '100%',
    },
    input: {
        width: '100%',
        backgroundColor: lightTheme.colors.background,
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
    otpText: {
        fontSize: scale(16),
        fontWeight: '600',
        color: lightTheme.colors.text,
    },
    resendText: {
        fontSize: scale(12),
        color: lightTheme.colors.darkText,
        fontWeight: '500',
        marginBottom: lightTheme.spacing.lg,
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
});

export default Signup;
