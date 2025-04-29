import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';;
import AccountDetails from '../../components/profile/AcountDetails';
import LoginScreen from '../../components/Login/LoginScreen';

const Stack = createStackNavigator();

export const RegisterStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Register" screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="Register" 
        component={AccountDetails} 
        
      />
      <Stack.Screen
       name="Login"
       component={LoginScreen}
      />
      
    </Stack.Navigator>
  );
};