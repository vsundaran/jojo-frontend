import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';
import WallOfJoyScreen from '../screens/wallOfJoy';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { lightTheme } from '../theme';
import Givejoy from '../screens/giveJoy';
import CreateMomentStack from '../navigation/createMoment';

import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function FooterNavigation({ initialTab, timestamp, footerSlectedIndex = 0, onLoginRequest }: any) {
  const [index, setIndex] = useState(0);
  const { user } = useAuth();
  const navigation = useNavigation<any>();

  const [routes] = useState([
    { key: 'home', title: 'Wall of Joy', icon: 'home-outline' },
    {
      key: 'create-moment',
      title: 'Create Moment',
      icon: 'plus-circle-outline',
    },
    { key: 'Give-Joy', title: 'Give Joy', icon: 'heart-outline' },
  ]);

  //when create moments happens, selection the wall of joy tab
  useEffect(() => {
    if (initialTab === '2') {
      setIndex(0);
    }
  }, [initialTab, timestamp]);

  useEffect(() => {
    console.log(footerSlectedIndex, "footerSlectedIndex");
    if (footerSlectedIndex) {
      setIndex(footerSlectedIndex);
    }
  }, [footerSlectedIndex]);

  const handleNavigateToCreateMoment = () => {
    const createMomentIndex = routes.findIndex(r => r.key === 'create-moment');
    if (createMomentIndex !== -1) {
      setIndex(createMomentIndex);
    }
  };

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 'home':
        return (
          <View style={{ flex: 1 }}>
            <WallOfJoyScreen
              initialTab={initialTab}
              timestamp={timestamp}
              onNavigateToCreateMoment={handleNavigateToCreateMoment}
              onLoginRequest={onLoginRequest}
            />
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
            <CreateMomentStack />
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
          if (newIndex !== -1) {
            if (!user && (route.key === 'create-moment' || route.key === 'Give-Joy')) {
              if (onLoginRequest) onLoginRequest();
              return;
            }
            setIndex(newIndex);
          }
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
        style={{
          backgroundColor: lightTheme.colors.background,
          boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.1)',
        }}
        getLabelText={({ route }) => route.title}
        renderLabel={({ route }) => {
          const isActive = routes[index].key === route.key;
          return (
            <Text
              style={{
                fontSize: 12,
                textAlign: 'center',
                // fontWeight: isActive ? "bold" : '500',
                fontFamily: isActive ? 'Poppins-Bold' : 'Poppins-Medium',
                color: isActive
                  ? lightTheme.colors.darkText
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
