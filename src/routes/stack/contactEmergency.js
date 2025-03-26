import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from '../../components/HistorialChat/chatScreen';
import ContactoSOSScreen from '../../screens/ContactoSOS';

const Stack = createStackNavigator();

export const ChatStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ContactoSOS" screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="ContactoSOS" 
        component={ContactoSOSScreen} 
        
      />
      
    </Stack.Navigator>
  );
};
