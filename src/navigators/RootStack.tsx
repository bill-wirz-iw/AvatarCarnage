import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React from 'react';
import CastleScreen from '../screens/CastleScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import store from '../store/index';
import BattleArena from '../screens/BattleArenaScreen';

export type OnboardingParamList = {
  Login: undefined;
  Register: undefined;
};

export type AuthenticatedParamList = {
  Castle: undefined;
  BattleArena: undefined;
};

const OnboardingTabNavigator =
  createMaterialBottomTabNavigator<OnboardingParamList>();
const AuthenticatedTabNavigator =
  createMaterialBottomTabNavigator<AuthenticatedParamList>();

const RootStack = () => {
  const isSignedIn = store.useState(s => s.auth.isSignedIn);

  return isSignedIn ? (
    <AuthenticatedTabNavigator.Navigator
      activeColor="#f0edf6"
      inactiveColor="#3e2465">
      <AuthenticatedTabNavigator.Screen
        name="Castle"
        component={CastleScreen}
      />
      <AuthenticatedTabNavigator.Screen
        name="BattleArena"
        component={BattleArena}
      />
    </AuthenticatedTabNavigator.Navigator>
  ) : (
    <OnboardingTabNavigator.Navigator
      activeColor="#f0edf6"
      inactiveColor="#3e2465">
      <OnboardingTabNavigator.Screen name="Login" component={LoginScreen} />
      <OnboardingTabNavigator.Screen
        name="Register"
        component={RegisterScreen}
      />
    </OnboardingTabNavigator.Navigator>
  );
};

export default RootStack;
