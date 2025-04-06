import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HistorialChatScreen from '../../screens/HistorialChat';
import ChatScreenHistory from '../../components/HistorialChat/chatScreen';
import ChatOldScreen from '../../components/Chat/chatScreenOld';

const Stack = createStackNavigator();

export const ChatStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="HistorialChat" screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="HistorialChat" 
        component={HistorialChatScreen} 
        
      />
      <Stack.Screen 
        name="ChatScreenHistory" 
        component={ChatScreenHistory} 
      />
      <Stack.Screen 
        name="ChatOldScreen" 
        component={ChatOldScreen} 
      />
    </Stack.Navigator>
  );
};
