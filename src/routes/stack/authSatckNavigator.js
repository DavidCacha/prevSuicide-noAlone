import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../components/Login/LoginScreen';
import AccountDetails from '../../components/profile/AcountDetails';

const Auth = createStackNavigator();

export const AuthStack = () => (
  <Auth.Navigator screenOptions={{ headerShown: false }}>
    <Auth.Screen name="Register" component={AccountDetails} />
  </Auth.Navigator>
);