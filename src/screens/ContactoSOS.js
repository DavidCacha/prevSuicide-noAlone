import React, {useState} from 'react';
import { View, Text, FlatList, ImageBackground, ScrollView, StyleSheet, Pressable } from 'react-native';
import Contact from '../components/ContactEmergency/contact';
import { useNavigation } from '@react-navigation/native';
import CustomModal from '../components/profile/CustomModal';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';



const ContactoSOSScreen = () => {

  const selectContacts = createSelector(
      state => state.user?.userData?.usuario?.usuario?.emergency_contacts,
      conversations => conversations || []
    );

  const label = "Se notifico por SMS a tus contactos principales para te puedan ayudar, Recuerda no estas solo...";
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const contacts = useSelector(selectContacts);
    const showModal = () => {
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
      }, 4000); // Se cerrará después de 2 segundos
    };

  const groupByContact = (data) => {
  const grouped = { 'friends': [], 'hotlines': [] };

    data.forEach(item => {
      if (item.type === 'friends') {
        grouped['friends'].push(item.friends);
      } else if (item.type === 'hotlines') {
        grouped['hotlines'].push(item.hotlines);
      }
    });
    return Object.entries(grouped).map(([date, items]) => ({
      title: date,
      data: items
    }));
  }

  const groupedContacts = groupByContact(contacts);
  const hasElements = groupedContacts.some(group => group.data.length > 0);
  return (
     <ImageBackground 
          source={require('../../assets/image/sky.jpg')} // Ruta de la imagen de fondo
          style={styles.background}
        >
          <ScrollView contentContainerStyle={{ paddingHorizontal: 5 }} style={styles.backgroundScroll}>
            {hasElements ? (
              <View style={styles.container}>
              <Text style={styles.title}>Contacto de emergencia</Text>
              <FlatList
                data={groupedContacts}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => (
                <View >
                  {item.data.length > 0 && (
                  <>
                    <View style={{flexDirection:'row', justifyContent:'space-between', paddingBottom:10}}>
                      <Text style={{ fontWeight: 'bold', fontSize: 20, marginVertical: 5 }}>
                        {item.title === 'friends' ? 'Amigos' : 'Numeros de emergancia'}
                      </Text>
                      {item.title === 'friends' && (
                      <Pressable style={styles.sendSMS} onPress={showModal}> 
                        <Text style={styles.sendtTextSMS}>Envio de SOS</Text>
                      </Pressable> 
                      )}
                    </View>
                     {item.data[0].map(typeContact => (
                        <Contact contact={typeContact} title={item.title}/>
                     ))}
                  </>
                  )}
                </View>
                )}
              />
              <Pressable style={styles.presable} onPress={() => navigation.openDrawer()}>
                <Text style={styles.textPresable}>Salir del Contactos</Text>
              </Pressable>
              <CustomModal label={label} visible={modalVisible} onClose={() => setModalVisible(false)} />
            </View>
            ):(
               <>
                <Text style={styles.noInfo}>Actualmente no tienes contactos</Text>  
                <Text style={styles.noInfo}>Completa tu perfil con la informacion necesaria</Text>  
                <Pressable style={styles.presable} onPress={() => navigation.openDrawer()}>
                <Text style={styles.textPresable}>Salir del Contactos</Text>
                </Pressable>
              </>
            )}
          </ScrollView>
        </ImageBackground>
  );
};

const styles = StyleSheet.create({
  noInfo:{
    fontFamily:'ligth', 
    fontWeight:'bolder', 
    fontSize:25, 
    textAlign:'center', 
    paddingBottom:25, 
    paddingTop:95
  },
  sendSMS:{
    backgroundColor:'pink',
    borderRadius: 25,
    borderColor:'black',
    borderWidth: 2,
  },
  sendtTextSMS:{
    fontSize:15,
    padding:8
  },
  presable:{
    width:'95%',
    backgroundColor:'pink',
    padding:15,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25, 
    borderColor:'black',
    borderWidth:2,
    marginLeft:10
  },
  textPresable:{
    fontSize:20,
    fontWeight:'800',
    color:'black'
  },
  backgroundScroll: {
    backgroundColor: 'rgba( 	191, 236, 207, 0.5)', // Negro semi-transparente
  },
  background: {
    flex: 1,
    resizeMode: 'cover', // Ajusta la imagen al tamaño de la pantalla
    paddingTop:0
  },
  container:{
    flexDirection:'column', 
    justifyContent:'center', 
    alignItems:'center', 
    paddingVertical:15, 
    paddingHorizontal:10
  },
  title: {
    fontSize:27,
    fontWeight: 800,
    fontFamily:' lucida grande',
  }
});

export default ContactoSOSScreen;
