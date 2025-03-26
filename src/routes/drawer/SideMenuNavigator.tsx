import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../../screens/Home';
import ConversationScreen from '../../screens/ConversationScreen';
import Icon from 'react-native-vector-icons/Ionicons'; 
import ContactoSOSScreen from '../../screens/ContactoSOS';
import MusicaScreen from '../../screens/Music';
import LocationScreen from '../../screens/Location';
import ProfileScreen from '../../screens/Profile';
import { ChatStackNavigator } from '../stack/ChatStackNavigator';
import { ProfileStackNavigator } from '../stack/stackProfile';


const Drawer = createDrawerNavigator();

export const SideMenuNavigator = () => {
  return (
    <Drawer.Navigator
    screenOptions={{
      headerStyle: {
      backgroundColor: '#CDC1FF', // Color del header
      },
      headerTintColor: 'white', // Color del texto del título
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
      },
      drawerActiveTintColor: 'white', // Color del texto cuando está seleccionado
      drawerActiveBackgroundColor: '#CDC1FF', // Fondo del item seleccionado
      drawerInactiveTintColor: 'black', // Color del texto cuando NO está seleccionado
      drawerInactiveBackgroundColor: 'white',
      drawerLabelStyle: {
        fontSize: 16, // Opcional, para mejorar la visibilidad
      },
    }}
  >
  
      <Drawer.Screen name="Home" component={HomeScreen} options={{
            drawerIcon: ({ color, size }) => (
              <Icon name="home" size={size} color={color} />
            ),
          }}/>
      <Drawer.Screen name="Chat" component={ConversationScreen} options={{
            drawerIcon: ({ color, size }) => (
              <Icon name="chatbubble-outline" size={size} color={color} />
            ),
          }}/>
      <Drawer.Screen name="Historial de Chats" component={ChatStackNavigator} options={{
            drawerIcon: ({ color, size }) => (
              <Icon name="chatbubbles-outline" size={size} color={color} />
            ),
          }}/>
      <Drawer.Screen name="Contacto SOS" component={ContactoSOSScreen} options={{
            drawerIcon: ({ color, size }) => (
              <Icon name="heart-dislike-outline" size={size} color={color} />
            ),
          }}/>
      <Drawer.Screen name="Musica" component={MusicaScreen} options={{
            drawerIcon: ({ color, size }) => (
              <Icon name="musical-notes-sharp" size={size} color={color} />
            ),
          }}/>
      <Drawer.Screen name="Ubicacion segura" component={LocationScreen} options={{
            drawerIcon: ({ color, size }) => (
              <Icon name="earth-outline" size={size} color={color} />
            ),
          }}/>
      <Drawer.Screen name="Mi cuenta" component={ProfileStackNavigator} options={{
            drawerIcon: ({ color, size }) => (
              <Icon name="person-circle-outline" size={size} color={color} />
            ),
          }}/>

    </Drawer.Navigator>
  );
}