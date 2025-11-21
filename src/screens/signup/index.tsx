import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { Text, Button, TextInput, Divider } from 'react-native-paper';
import { scale, verticalScale } from 'react-native-size-matters';
import { useNavigation, useRoute } from '@react-navigation/native';
import { lightTheme } from '../../theme';
import CustomModal from '../../automic-elements/customModal';

const Signup = () => {
    const [name, setName] = useState('');
    const [visible, setVisible] = useState(true);
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { mobileNumber } = route.params || {};

    const onDismiss = () => {
        setVisible(false);
        navigation.goBack();
    };

    const handleContinue = () => {
        console.log('Continue with name:', name);
        setVisible(false);
        navigation.navigate('otp-verification', { mobileNumber, name });
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
});

export default Signup;
