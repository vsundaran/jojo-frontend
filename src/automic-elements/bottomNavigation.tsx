import React from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import { BottomNavigation, Text, Provider } from 'react-native-paper';
import WallOfJoyScreen from '../screens/wallOfJoy';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { lightTheme } from '../theme';
import Givejoy from '../screens/giveJoy';
import CreateMomentScreen from '../screens/createMoment';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

export default function FooterNavigation() {
  const [index, setIndex] = useState(0);

  const routes = [
    { key: 'home', title: 'Wall of Joy', icon: 'home-outline' },
    {
      key: 'create-moment',
      title: 'Create Moment',
      icon: 'plus-circle-outline',
    },
    // { key: 'Give-Joy', title: 'Give Joy', icon: 'creation' },
    { key: 'Give-Joy', title: 'Give Joy', icon: 'heart-outline' },
  ];

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 'home':
        return (
          <View style={{ flex: 1 }}>
            <WallOfJoyScreen />
          </View>
        );
      case 'Give-Joy':
        return (
          <View style={{ flex: 1 }}>
            <Givejoy />
          </View>
        );
      case 'create-moment':
        return (
          <View style={{ flex: 1 }}>
            <CreateMomentScreen />
          </View>
        );
      default:
        return (
          <View style={{ flex: 1 }}>
            <WallOfJoyScreen />
          </View>
        );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {renderScene({ route: routes[index] })}
      <BottomNavigation.Bar
        navigationState={{ index, routes }}
        onTabPress={({ route }) => {
          const newIndex = routes.findIndex(r => r.key === route.key);
          if (newIndex !== -1) setIndex(newIndex);
        }}
        renderIcon={({ route }) => {
          const isActive = routes[index].key === route.key;
          return (
            <View style={{ alignItems: 'center' }}>
              {isActive && (
                <View
                  style={{
                    position: 'absolute',
                    top: -16,
                    width: 80,
                    height: 3,
                    borderRadius: 3,
                    backgroundColor: lightTheme.colors.text,
                  }}
                />
              )}
              <Icon
                name={route.icon}
                size={26}
                color={
                  isActive
                    ? lightTheme.colors.jojoLogoColor
                    : lightTheme.colors.iconDefaultColor
                }
              />
            </View>
          );
        }}
        getLabelText={({ route }) => route.title}
        renderLabel={({ route }) => {
          const isActive = routes[index].key === route.key;
          return (
            <Text
              style={{
                fontSize: 12,
                textAlign: 'center',
                fontWeight: isActive ? 'bold' : 500,
                color: isActive
                  ? lightTheme.colors.text
                  : lightTheme.colors.iconDefaultColor,
              }}
            >
              {route.title}
            </Text>
          );
        }}
        activeIndicatorStyle={{ backgroundColor: 'transparent' }}
      />
    </View>
  );
}
