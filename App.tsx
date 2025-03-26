//import 'react-native-gesture-handler';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { Text } from "react-native"
import { SideMenuNavigator } from "./src/routes/drawer/SideMenuNavigator"
import LoginScreen from './src/components/Login/LoginScreen'; 
export const App = () => {

  
const Stack = createStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Drawer" component={SideMenuNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}