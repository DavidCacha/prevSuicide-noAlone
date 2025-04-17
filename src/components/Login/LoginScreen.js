import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, ImageBackground } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateUserData } from '../../features/user/userSlice';
import { useSelector } from 'react-redux';


const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation(); // Usa navigation para navegar
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.100.5:3000/auth/login', { // cambia esto si estás en Android o usa tu IP
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });
      const data = await response.json();

      dispatch(updateUserData(data));  
      if (response.ok) {
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
          navigation.replace('Drawer');
        }, 2000);
      } else {
        console.error('❌ Error de autenticación:', data);
        setErrorModalVisible(true);
        setTimeout(() => {
          setErrorModalVisible(false);
        }, 2000);
      }
    } catch (error) {
      console.error('❌ Error de red o servidor:', error.message);
      setErrorModalVisible(true);
      setTimeout(() => {
        setErrorModalVisible(false);
      }, 2000);
    }
  };

  const { userData } = useSelector(state => state.user);
  const message = userData.mensaje;
  return (
    <ImageBackground 
          source={require('../../../assets/image/background.jpeg')} // Ruta de la imagen de fondo
          style={styles.background}
        >
        <View style={styles.container}>
        <Text style={styles.titleApp}>NoAloneApp</Text>
        <Text style={{fontSize:20, textAlign:'center', fontWeight:'900', color:'black'}}>Siempre contigo, incluso en lo más difícil</Text>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <TextInput
            style={styles.input}
            placeholder="Correo Electrónico"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
        />
        <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>{}}>
            <Text style={styles.buttonText}>Crear cuenta</Text>
        </TouchableOpacity>
        <Text style={{padding:15, fontSize:15, color:'white', fontWeight:'600'}}>¿Olvidaste tu contraseña?</Text>
        <Text style={styles.footer}>App creada por Luis David Casanova Chavez</Text>
        {/* Modal de éxito */}
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={styles.modalText}>{userData.mensaje}</Text>
            </View>
            </View>
        </Modal>

        {/* Modal de error */}
        <Modal
            animationType="fade"
            transparent={true}
            visible={errorModalVisible}
        >
            <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={styles.modalText}>{message}</Text>
            </View>
            </View>
        </Modal>
        </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  footer:{
    textAlign:'center',
    position:'absolute',
    bottom:50,
    fontSize:20,
    color:'white'
  },
  titleApp:{
    fontFamily:'cursive'
    , fontSize:75,
    fontWeight:'light',
    marginTop:-200,marginBottom:15,
    textDecorationLine: 'line-through',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  background: {
    flex: 1,
    resizeMode: 'cover', // Ajusta la imagen al tamaño de la pantalla
    paddingTop:0
  },
  container: {
    
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'rgba(245, 217, 126,0.3)'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'white'
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    flexDirection:'row',
    justifyContent:'center',
    width:'80%',
    backgroundColor: 'Transparent',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    borderColor:'white',
    borderWidth:2
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(180, 168, 149, 0.5)',
  },
  modalContent: {
    width:'80%',
    backgroundColor: '#F5D97E',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth:2,
    borderColor:'black'
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    color:'black',
    fontWeight:'700'
  },
});

export default LoginScreen;
