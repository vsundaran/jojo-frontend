import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { lightTheme } from '../theme';
import { Image, View, TouchableOpacity, Pressable, Text, Animated } from 'react-native';
import logo from '../assets/logo.png';
import { Menu, Portal, Dialog, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import ConfirmationModal from './confirmationModal';
import { scale } from 'react-native-size-matters';
import { useLayout } from '../context/LayoutContext';

export default function Header({ onLoginRequest }: { onLoginRequest?: () => void }) {
  const navigation = useNavigation<any>();
  const { logout, user } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const showLogoutConfirmation = () => {
    closeMenu();
    setLogoutModalVisible(true);
  };

  const handleLogout = async () => {
    await logout();
    setLogoutModalVisible(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'app-layout' }],
    });
  };

  console.log(user);

  // Generate initials based on name structure
  const getInitials = (fullName: string | undefined): string => {
    if (!fullName) return 'G';

    const trimmedName = fullName.trim();
    const words = trimmedName.split(/\s+/); // Split by whitespace

    if (words.length === 0) return 'G';

    // If it's a single word
    if (words.length === 1) {
      const word = words[0];
      if (word.length === 1) {
        // Single letter name - show one letter
        return word.toUpperCase();
      } else {
        // Single word with multiple letters - show first and last letters
        return (word.charAt(0) + word.charAt(word.length - 1)).toUpperCase();
      }
    }

    // Multiple words - show first letters of first two words
    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
  };

  const name = getInitials(user?.name);

  const { headerTranslateY } = useLayout();

  return (
    <Animated.View
      style={{
        height: 70,
        transform: [{ translateY: headerTranslateY }],
        zIndex: 20,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <LinearGradient
        colors={lightTheme.colors.gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          height: 70,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          // paddingHorizontal: lightTheme.spacing.md,
          // borderWidth: 1,
          boxShadow: 'none',
          elevation: 0,
        }}
      >
        <View style={{
          width: "100%",
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: lightTheme.spacing.md,
        }}>

          <View
            style={{ overflow: 'hidden', borderRadius: 10000, backgroundColor: lightTheme.colors.background, width: 50, height: 50 }}
          >
            <Image source={logo} style={{ width: 50, height: 50 }} />
          </View>

          <>
            <TouchableOpacity onPress={!user ? () => onLoginRequest && onLoginRequest() : openMenu} activeOpacity={0.7}>
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  gap: 1,
                  backgroundColor: lightTheme.colors.background,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
              >
                <Text
                  style={{
                    fontSize: scale(14),
                    fontFamily: 'Poppins-SemiBold',
                    color: lightTheme.colors.jojoLogoColor,
                  }}
                >
                  {name.charAt(0)}
                </Text>
                {name.length > 1 && (
                  <Text
                    style={{
                      fontSize: scale(14),
                      fontFamily: 'Poppins-SemiBold',
                      color: lightTheme.colors.darkText,
                    }}
                  >
                    {name.charAt(1)}
                  </Text>
                )}
              </View>
            </TouchableOpacity>

            <Portal>
              {menuVisible && (
                <>
                  <Pressable
                    onPress={closeMenu}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                    }}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      top: 70,
                      right: 70,
                      backgroundColor: lightTheme.colors.background,
                      borderRadius: 10,
                      paddingVertical: 0,
                      paddingHorizontal: 0,
                      elevation: 6,
                      shadowColor: '#000',
                      shadowOpacity: 0.2,
                      shadowRadius: 10,
                      width: 'auto',
                    }}
                  >
                    <Pressable
                      onPress={showLogoutConfirmation}
                      android_ripple={{ color: '#e0e0e0' }}
                      style={({ pressed }) => ({
                        paddingVertical: 4,
                        paddingHorizontal: 4,
                        backgroundColor: pressed ? '#f5f5f5' : 'transparent',
                      })}
                    >
                      <View>
                        <Button
                          onPress={showLogoutConfirmation}
                          textColor={lightTheme.colors.text}
                          contentStyle={{ justifyContent: 'flex-start' }}
                          labelStyle={{ fontSize: 16 }}
                        >
                          Logout
                        </Button>
                      </View>
                    </Pressable>
                  </View>
                </>
              )}
            </Portal>
          </>

          <ConfirmationModal
            visible={logoutModalVisible}
            onDismiss={() => setLogoutModalVisible(false)}
            onConfirm={handleLogout}
            title="Logout"
            content="Are you sure you want to logout?"
            confirmLabel="Logout"
            cancelLabel="Cancel"
          />
        </View>
      </LinearGradient>
    </Animated.View>
  );
}
