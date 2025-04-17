import React, {useState, useEffect} from "react";
import { View, Text, Image, StyleSheet, Linking, ImageBackground, ScrollView, Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import CustomModal from "./CustomModal";
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';



const AccountDetails = () => {
  const user = useSelector(state => state.user?.userData?.usuario?.usuario || {});
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const isFocused = useIsFocused();


  const showModal = () => {
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      navigation.navigate('Login');
    }, 2000); // Se cerrará después de 2 segundos
  };
   
  
  return (
    <ImageBackground
    source={require('../../../assets/image/profile.jpg')} // Ruta de la imagen de fondo
      style={styles.background}
    >
    <ScrollView style={styles.backgroundScroll}>
    <View style={styles.container}>
      <Image source={require('../../../assets/image/devCasanova2.jpeg')} style={styles.profileImage} />
      <Text style={styles.name}>{user.name} (@{user.username})</Text>
      <Text style={styles.email}>{user.email}</Text>
    </View>
      <View style={{flexDirection:' column', padding:15, alignItems:'flex-start'}}>
      <Text style={styles.info}>📅 Nacimiento: {user.birthdate}</Text>
      <Text style={styles.info}>🏢 {user.occupation} en {user.company}</Text>
      <Text style={styles.info}>📌 {user.address}</Text>
      <Text style={styles.info}>🔵 Estado: {user.accountStatus}</Text>
      <Text style={styles.info}>🕒 Última conexión: {user.lastLogin}</Text>
      
      {/* Redes sociales */}
      {user.socialLinks && (
        <View>
          <Text style={styles.sectionTitle}>Redes Sociales</Text>
          {user.socialLinks.linkedin && (
            <Text style={styles.link} onPress={() => Linking.openURL(user.socialLinks.linkedin)}>LinkedIn</Text>
          )}
          {user.socialLinks.github && (
            <Text style={styles.link} onPress={() => Linking.openURL(user.socialLinks.github)}>GitHub</Text>
          )}
          {user.socialLinks.facebook && (
            <Text style={styles.link} onPress={() => Linking.openURL(user.socialLinks.facebook)}>facebook</Text>
          )}
        </View>
      )}
    </View>
    <View style={{paddingBottom:20}}>
      <View style={{flexDirection: 'row', justifyContent:'space-between', padding:10}}>
        <Pressable style={styles.presableOptions} onPress={() => navigation.openDrawer()}>
          <Text style={styles.textPresableOption}>Salir de perfil</Text>
        </Pressable>
        <Pressable style={styles.presableOptions} onPress={() => navigation.navigate('EditData')}>
          <Text style={styles.textPresableOption}>Edita tu cuenta</Text>
        </Pressable>
      </View>
      <Pressable style={styles.presable} onPress={showModal}>
        <Text style={styles.textPresable}>Cerrar sesion</Text>
       </Pressable>
       <CustomModal label="Cerrando sesion" visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
    </ScrollView>
    </ImageBackground>
  );
};

export default AccountDetails;

const styles = StyleSheet.create({
  textPresableOption:{
    fontWeight:'500',
    fontSize:15
  },
  presableOptions:{
    width:'45%',
    height: 80,
    backgroundColor:'rgba(97,255,202, 0.5)',
    borderRadius:25,
    justifyContent:'center',
    alignItems:'center',
    borderWidth:1,
    borderColor:'black'
  },
  textPresable:{
    fontSize:20,
    fontWeight:'800',
    color:'black'
  },
  contentPressable: {
    flexDirection:'row', 
    justifyContent:'center',
    width:'100%',
    paddingVertical: 13
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
  backgroundScroll: {
    backgroundColor: 'rgba(248, 250, 249, 0.5)', // Negro semi-transparente
    paddingBottom:35
  },
  background: {
    flex: 1,
    resizeMode: 'cover', // Ajusta la imagen al tamaño de la pantalla
    paddingTop:0
  },
  container: {
    padding: 20,
    backgroundColor: "transparent",
    borderRadius: 25,
    elevation: 5,
    alignItems: "center",
    margin: 10,
    marginTop: 20
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  detailsContainer: {
    flexDirection: "column",
    backgroundColor: "pink",
    alignItems: "flex-start", // Alinea todo el contenido a la derecha
    padding: 10,
    marginHorizontal: 20, // Margen lateral para que no quede pegado a la derecha
  },
  info: {
    fontSize: 18,
    color: "#333",
    fontWeight:'700',
    marginBottom: 5,
    textAlign: "left", // Alinea el texto dentro del Text a la derecha
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "left",
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
    marginTop: 5,
    textAlign: "left",
  },
  socialContainer: {
    width: "100%",
    alignItems: "flex-start", // Alinea todos los elementos a la derecha
  },
});

