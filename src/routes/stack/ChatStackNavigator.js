import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HistorialChatScreen from '../../screens/HistorialChat';
import ChatScreen from '../../components/HistorialChat/chatScreen';

const Stack = createStackNavigator();

export const ChatStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="HistorialChat" screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="HistorialChat" 
        component={HistorialChatScreen} 
        
      />
      <Stack.Screen 
        name="ChatScreen" 
        component={ChatScreen} 
      />
    </Stack.Navigator>
  );
};
