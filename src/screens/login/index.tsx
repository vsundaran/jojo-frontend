import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useNavigation, useRoute } from '@react-navigation/native';
import { lightTheme } from '../../theme';
import CustomModal from '../../automic-elements/customModal';
import CustomButton from '../../automic-elements/customButton';
import { useSendOTP } from '../../hooks/useAuthQuery';


const LoginScreen = ({ isVisible, onClose, onSendOtpSuccess, initialMobileNumber }: { isVisible?: boolean; onClose?: () => void; onSendOtpSuccess?: (data: { mobileNumber: string, isNewUser: boolean }) => void; initialMobileNumber?: string }) => {
  const [internalVisible, setInternalVisible] = useState(true);
  const visible = isVisible !== undefined ? isVisible : internalVisible;
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { mobileNumber } = route.params || {};

  useEffect(() => {
    if (initialMobileNumber) {
      const number = initialMobileNumber.replace('+91', '');
      setPhoneNumber(number);
    } else if (mobileNumber) {
      // Remove +91 prefix if present, as the input handles it separately
      const number = mobileNumber.replace('+91', '');
      setPhoneNumber(number);
    }
  }, [mobileNumber, initialMobileNumber]);

  const { mutate: sendOTP, isPending } = useSendOTP();

  const onDismiss = () => {
    if (onClose) {
      onClose();
    } else {
      setInternalVisible(false);
      navigation.goBack();
    }
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

          if (onSendOtpSuccess) {
            onSendOtpSuccess({ mobileNumber: formattedNumber, isNewUser });
          } else {
            if (onClose) {
              onClose();
            } else {
              setInternalVisible(false);
            }
            if (isNewUser) {
              navigation.navigate('signup', { mobileNumber: formattedNumber });
            } else {
              navigation.navigate('otp-verification', { mobileNumber: formattedNumber });
            }
          }
        },
        onError: (error: any) => {
          console.error('Send OTP Error:', error);
          Alert.alert('Error', error.response?.data?.message || 'Failed to send OTP');
        },
      }
    );
  };

  return (
    <CustomModal visible={visible} onDismiss={onDismiss}>
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
                            fontSize: moderateScale(14),
                            color: lightTheme.colors.darkText,
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
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    color: lightTheme.colors.darkText,
    marginBottom: lightTheme.spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: moderateScale(14),
    color: lightTheme.colors.text,
    marginBottom: lightTheme.spacing.xl,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: lightTheme.spacing.xl,
  },
  inputLabel: {
    fontSize: moderateScale(14),
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
    fontSize: moderateScale(14),
    color: lightTheme.colors.text,
  },
  sendButton: {
    marginBottom: lightTheme.spacing.lg,
  },
  footerText: {
    fontSize: moderateScale(10),
    color: lightTheme.colors.text,
    textAlign: 'center',
    lineHeight: scale(14),
  },
});

export default LoginScreen;
