import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, ImageBackground } from 'react-native';

const LoginScreen = () => {
  const navigation = useNavigation(); // Usa navigation para navegar
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const handleLogin = () => {
    if (email === 'david-test@gmail.com' && password === '0987654321') {
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        navigation.replace('Drawer'); // Reemplaza el Login con el Drawer para que no se pueda volver atrás
      }, 2000);
    } else {
      setErrorModalVisible(true);
      setTimeout(() => {
        setErrorModalVisible(false);
      }, 2000);
    }
  };

  return (
    <ImageBackground 
          source={require('../../../assets/image/background.jpeg')} // Ruta de la imagen de fondo
          style={styles.background}
        >
        <View style={styles.container}>
        <Text style={styles.titleApp}>NoAlone</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Crear cuenta</Text>
        </TouchableOpacity>
        <Text style={styles.footer}>App creada por Luis David Casanova Chavez</Text>
        {/* Modal de éxito */}
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={styles.modalText}>Inicio de sesión exitoso</Text>
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
                <Text style={styles.modalText}>Credenciales incorrectas, intenta de nuevo</Text>
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
    , fontSize:95,
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
