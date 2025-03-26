import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../../screens/Profile';
import LoginScreen from '../../components/Login/LoginScreen';
import EditCountComponent from '../../components/profile/editCount';

const Stack = createStackNavigator();

export const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen} 
      />
      <Stack.Screen 
        name="EditCount" 
        component={EditCountComponent} 
      />
    </Stack.Navigator>
  );
};
