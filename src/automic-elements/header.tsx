import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { lightTheme } from '../theme';
import { Image, View, TouchableOpacity } from 'react-native';
import logo from '../assets/logo.png';
import { Avatar, Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import ConfirmationModal from './confirmationModal';

export default function Header() {
  const navigation = useNavigation<any>();
  const { logout, user } = useAuth();
  const [visible, setVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

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

  const name = user?.name.split(" ")[0].charAt(0).toUpperCase() || "G"

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
      }}
    >
      <View
        style={{ borderRadius: lightTheme.borderRadius.lg, overflow: 'hidden' }}
      >
        <Image source={logo} style={{ width: 50, height: 50 }} />
      </View>

      <Menu
        visible={visible}
        onDismiss={() => closeMenu()}
        anchor={
          <TouchableOpacity onPress={openMenu}>
            <Avatar.Text
              size={44}
              label={name}
              style={{ backgroundColor: lightTheme.colors.background }}
            />
          </TouchableOpacity>
        }
        contentStyle={{ backgroundColor: lightTheme.colors.background }}
      >
        <Menu.Item onPress={showLogoutConfirmation} title="Logout" titleStyle={{ color: lightTheme.colors.text, }} />
      </Menu>

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
