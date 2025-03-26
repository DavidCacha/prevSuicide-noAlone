import React from 'react';
import { View, Text,  StyleSheet, Pressable, Linking, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; //


const Contact = ({ contact, title }) => {

  const normalizePhoneNumber = (rawPhone) => {
    const digitsOnly = rawPhone.replace(/\D/g, ''); // elimina todo lo que no es número
  
    if (digitsOnly.startsWith('521')) return digitsOnly;
  
    if (digitsOnly.startsWith('52') && !digitsOnly.startsWith('521')) {
      return '521' + digitsOnly.slice(2);
    }
  
    if (digitsOnly.startsWith('55')) {
      return '521' + digitsOnly;
    }
  
    // Si no sabemos, regresamos lo que hay
    return digitsOnly;
  };
  
  const makeCall = () => {
    if (!contact.phone) {
      Alert.alert("Error", "Número no válido");
      return;
    }

    const url = `tel:${contact.phone}`;
    Linking.openURL(url).catch(err => Alert.alert("Error", "No se pudo abrir la app de llamadas"));
  };

       
  const sendWhatsApp = () => {
    const phoneNumber = normalizePhoneNumber(contact.phone);
    const message = 'Hola, te escribo desde mi app.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  
    Linking.openURL(url)
      .catch(err => {
        console.log('Error al abrir WhatsApp:', err);
        Alert.alert('Error', 'No se pudo abrir WhatsApp. Asegúrate de tenerlo instalado.');
      });
  };
  
  return (
    <View style={{   flexDirection:'row', justifyContent:'center'}}>
     <View 
     key={contact.name}
     style={[
        styles.chatContainer,
        { backgroundColor: title === 'friends' ? 'rgba(166, 241, 224, 0.5)' : 'rgba(247, 207, 216, 0.5)' }
      ]}
     >
        <Text style={styles.topic}>{contact.name}</Text>
        <Text style={styles.message}>{contact.relationship}</Text>
        <Text style={styles.message}>{contact.phone}</Text>
     </View>
     <View style={{flexDirection:'row', justifyContent:'space-between'}}>
      {title === 'friends' && ( 
        <Pressable style={styles.presableIconM} onPress={sendWhatsApp}>
        <Image
        source={require('../../../assets/icons/icon-whatsapp.png')} // Cambia por tu ruta de imagen
        style={{ width: 25, height: 25 }}
        />        
      </Pressable>
      )}
        <Pressable style={styles.presableIcon}
        onPress={makeCall}
        >    
           <Icon name="call" size={25} color='black' />
        </Pressable>
     </View>
    </View>
  );
};

const styles = StyleSheet.create({
  presableIconM: {
    position: 'absolute',
    right:100,
    top:35,
    padding:10,
    width:48,
    borderWidth: 1, 
    borderRadius:25,
    borderColor:'black' 
    },
    presableIcon: {
        position: 'absolute',
        right:20,
        top:35,
        padding:10,
        width:48,
        borderWidth: 1, 
        borderRadius:25,
        borderColor:'black' 
    },
    chatContainer: {
        borderWidth: 1, 
        borderRadius:25,
     width: '100%',
      activeOpacity: 1 ,
      marginBottom: 15,
      padding: 10,
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 10, 
    },
    topic: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    message: {
      fontSize: 16,
      marginVertical: 2,
    },
  });

export default Contact;
