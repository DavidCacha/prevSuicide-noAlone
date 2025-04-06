//import 'react-native-gesture-handler';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux'
import { store } from './src/app/store'
import { SideMenuNavigator } from "./src/routes/drawer/SideMenuNavigator"
import LoginScreen from './src/components/Login/LoginScreen'; 
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested',
  'Each child in a list should have a unique "key" prop',
]);
export const App = () => {

  
const Stack = createStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Drawer" component={SideMenuNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}