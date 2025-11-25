import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { lightTheme } from '../theme';
import { Image, View, TouchableOpacity, Pressable } from 'react-native';
import logo from '../assets/logo.png';
import { Avatar, Menu, Portal, Dialog, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import ConfirmationModal from './confirmationModal';

export default function Header() {
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
      routes: [{ name: 'login' }],
    });
  };

  console.log(user);

  const name = user?.name?.split(' ')[0]?.charAt(0)?.toUpperCase() || 'G';

  return (
    <LinearGradient
      colors={lightTheme.colors.gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: lightTheme.spacing.md,
        // borderWidth: 1,
        boxShadow: 'none',
        elevation: 0,
      }}
    >
      <View
        style={{ borderRadius: lightTheme.borderRadius.lg, overflow: 'hidden' }}
      >
        <Image source={logo} style={{ width: 50, height: 50 }} />
      </View>

      <>
        <TouchableOpacity onPress={openMenu} activeOpacity={0.7}>
          <Avatar.Text
            size={44}
            label={name}
            style={{ backgroundColor: lightTheme.colors.background }}
          />
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
    </LinearGradient>
  );
}
