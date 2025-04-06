import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../../screens/Profile';
import LoginScreen from '../../components/Login/LoginScreen';
import EditCountComponent from '../../components/profile/editDataCount';
import editData from '../../components/editData/editData';
import EditCountDataComponent from '../../components/profile/editDataCount';
import EditMusicDataComponent from '../../components/profile/EditDataMusic';
import EditContactsComponent from '../../components/profile/editDataContact';
import EditDestinationsComponent from '../../components/profile/editDataLocation';
import EditLocationComponent from '../../components/profile/editDataLocation';

const Stack = createStackNavigator();

export const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen} 
      />
      <Stack.Screen 
        name="EditData" 
        component={editData} 
      />
      <Stack.Screen 
        name="EditDataCount" 
        component={EditCountDataComponent} 
      />
      <Stack.Screen 
        name="EditMusicCount" 
        component={EditMusicDataComponent} 
      />
      <Stack.Screen 
        name="EditContactCount" 
        component={EditContactsComponent} 
      />
      <Stack.Screen 
        name="EditMapCount" 
        component={EditLocationComponent} 
      />
    </Stack.Navigator>
  );
};
