import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from './header';
import FooterNavigation from './bottomNavigation';
import LoginScreen from '../screens/login';
import OTPVerification from '../screens/otpVerification';
import Signup from '../screens/signup';
import LanguageSelectionScreen from '../screens/languageSelection';
import { LayoutProvider } from '../context/LayoutContext';

export default function AppLayout({ route }: any) {
  const initialTab = route?.params?.initialTab;
  const footerSlectedIndex = route?.params?.footerSlectedIndex;
  const timestamp = route?.params?.timestamp;
  const [authStep, setAuthStep] = useState<'NONE' | 'LOGIN' | 'OTP' | 'SIGNUP' | 'LANGUAGE'>('NONE');
  const [authData, setAuthData] = useState<{ mobileNumber: string; isNewUser: boolean }>({ mobileNumber: '', isNewUser: false });

  const handleLoginRequest = () => {
    setAuthStep('LOGIN');
  };

  const handleLoginClose = () => {
    setAuthStep('NONE');
    setAuthData({ mobileNumber: '', isNewUser: false });
  };

  const handleSendOtpSuccess = (data: { mobileNumber: string; isNewUser: boolean }) => {
    setAuthData(data);
    if (data.isNewUser) {
      // For new users, we go to Signup (which handles OTP verification internally in the current design? 
      // Wait, looking at Signup.tsx, it takes OTP input. So it does verification.
      // But the user said: "Once the OTP is sent... the login popup will be disappered and the signup UI willl come"
      // So yes, for new user: Login -> Signup (which includes OTP entry).
      // For existing user: Login -> OTPVerification.

      // Actually, let's re-read the user request carefully.
      // "For the new user... Once the OTP is sent... the signup UI willl come in pop up."
      // And Signup.tsx has OTP input fields. So this matches.
      setAuthStep('SIGNUP');
    } else {
      setAuthStep('OTP');
    }
  };

  const handleVerifySuccess = () => {
    // Existing user flow complete
    handleLoginClose();
  };

  const handleSignupSuccess = () => {
    // New user signed up and verified. Now language selection.
    setAuthStep('LANGUAGE');
  };

  const handleLanguageComplete = () => {
    // Language selection complete
    handleLoginClose();
  };

  console.log(initialTab, 'inital');
  return (
    <LayoutProvider>
      <SafeAreaView edges={['bottom']} style={{ flex: 1, backgroundColor: 'white' }}>
        <Header onLoginRequest={handleLoginRequest} />
        <FooterNavigation
          initialTab={initialTab}
          timestamp={timestamp}
          footerSlectedIndex={footerSlectedIndex}
          onLoginRequest={handleLoginRequest}
        />

        {authStep === 'LOGIN' && (
          <LoginScreen
            isVisible={true}
            onClose={handleLoginClose}
            onSendOtpSuccess={handleSendOtpSuccess}
            initialMobileNumber={authData.mobileNumber}
          />
        )}

        {authStep === 'OTP' && (
          <OTPVerification
            isVisible={true}
            onClose={handleLoginClose}
            mobileNumber={authData.mobileNumber}
            onVerifySuccess={handleVerifySuccess}
            onBack={handleLoginRequest}
          />
        )}

        {authStep === 'SIGNUP' && (
          <Signup
            isVisible={true}
            onClose={handleLoginClose}
            mobileNumber={authData.mobileNumber}
            onSignupSuccess={handleSignupSuccess}
            onBack={handleLoginRequest}
          />
        )}

        {authStep === 'LANGUAGE' && (
          <LanguageSelectionScreen
            isVisible={true}
            onClose={handleLoginClose} // User can skip/close language selection and still be authenticated
            onComplete={handleLanguageComplete}
          />
        )}
      </SafeAreaView>
    </LayoutProvider>
  );
}
