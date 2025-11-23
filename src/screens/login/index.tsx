import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { scale, verticalScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { lightTheme } from '../../theme';
import CustomModal from '../../automic-elements/customModal';
import CustomButton from '../../automic-elements/customButton';
import { useSendOTP } from '../../hooks/useAuthQuery';

import Toast from 'react-native-toast-message';

const LoginScreen = () => {
  const [visible, setVisible] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation<any>();
  const { mutate: sendOTP, isPending } = useSendOTP();

  const onDismiss = () => {
    setVisible(false);
    navigation.goBack();
  };

  const handleSendOtp = () => {
    if (phoneNumber.length < 10) return;

    const formattedNumber = `+91${phoneNumber}`;
    console.log('Send OTP to:', formattedNumber);

    sendOTP(
      { mobileNumber: formattedNumber },
      {
        onSuccess: (response) => {
          console.log('Send OTP Success:', response.data);
          const { isNewUser } = response.data;
          setVisible(false);
          if (isNewUser) {
            navigation.navigate('signup', { mobileNumber: formattedNumber });
          } else {
            navigation.navigate('otp-verification', { mobileNumber: formattedNumber });
          }

          Toast.show({
            type: 'success',
            text1: 'OTP sent successfully',
          });
        },
        onError: (error: any) => {
          console.error('Send OTP Error:', error);
          Alert.alert('Error', error.response?.data?.message || 'Failed to send OTP');
        },
      }
    );
  };

  return (
    <CustomModal visible={visible} onDismiss={onDismiss} disableCloseIcon>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* Icon Section */}
          <View style={styles.iconContainer}>
            {/* Background Icon */}
            <Image
              source={require('../../assets/iconsBackground.png')}
              style={styles.backgroundImage}
            />

            {/* Inner White Circle with Phone Icon */}
            <View style={styles.innerCircle}>
              <Image
                source={require('../../assets/gg_phone.png')}
                style={styles.phoneIcon}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Text Section */}
          <Text style={styles.title}>Welcome to JoJo</Text>
          <Text style={styles.subtitle}>Create moments and spread joy</Text>

          {/* Phone Number Input Section */}
          <View style={styles.inputContainer}>
            {/* <Text style={styles.inputLabel}>Where should we send your OTP?</Text> */}
            <View style={styles.phoneInputWrapper}>
              <View style={{ flex: 1 }}>
                <TextInput
                  mode="outlined"
                  label={'Where should we send your OTP?'}
                  left={
                    <TextInput.Icon
                      icon={() => (
                        <View style={{}}>
                          <Text style={{
                            fontSize: scale(16),
                            color: lightTheme.colors.darkText,
                            // marginLeft: 10,
                            fontWeight: 'bold'
                          }}>+91</Text>
                        </View>
                      )}
                    />
                  }
                  style={styles.phoneInput}
                  placeholder="1234 567890"
                  placeholderTextColor={lightTheme.colors.textSecondary}
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  maxLength={10}
                />
              </View>
            </View>
          </View>

          {/* Send OTP Button */}
          <CustomButton
            title={isPending ? "Sending..." : "Send OTP"}
            onPress={handleSendOtp}
            style={styles.sendButton}
            disabled={phoneNumber.length < 10 || isPending}
          />

          {/* Footer Text */}
          <Text style={styles.footerText}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: lightTheme.spacing.md,
    paddingBottom: lightTheme.spacing.lg,
  },
  iconContainer: {
    marginBottom: lightTheme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  backgroundImage: {
    position: 'absolute',
    width: scale(250),
    height: scale(250),
    // top: -scale(50), // Adjust positioning to match design
    opacity: 0.8,
  },
  innerCircle: {
    width: scale(54),
    height: scale(54),
    borderRadius: scale(16),
    backgroundColor: lightTheme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  phoneIcon: {
    width: scale(30),
    height: scale(30),
  },
  title: {
    fontSize: scale(22),
    fontWeight: 'bold',
    color: lightTheme.colors.darkText,
    marginBottom: lightTheme.spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: scale(14),
    color: lightTheme.colors.text,
    marginBottom: lightTheme.spacing.xl,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: lightTheme.spacing.xl,
  },
  inputLabel: {
    fontSize: scale(14),
    color: lightTheme.colors.darkText,
    marginBottom: lightTheme.spacing.xs,
    marginLeft: lightTheme.spacing.xs,
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(45),
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    width: '100%',
  },
  countryCode: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 4,
  },
  phoneInput: {
    flex: 1,
    height: '100%',
    borderRadius: 20,
    fontSize: scale(16),
    color: lightTheme.colors.text,
  },
  sendButton: {
    marginBottom: lightTheme.spacing.lg,
  },
  footerText: {
    fontSize: scale(10),
    color: lightTheme.colors.text,
    textAlign: 'center',
    lineHeight: scale(14),
  },
});

export default LoginScreen;
