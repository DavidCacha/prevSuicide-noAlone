import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Pressable } from 'react-native';
import { sendMessageToGPT } from '../../services/openaiservice';
import ChatBubble from './chatBubble';
import CloudBubble from './clouds/cloud';
import CapibaraAddChat from './capibara';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import CustomModal from '../profile/CustomModal';


const ChatScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState(true);
  const [saveChat, setSaveChat] = useState(false);
  const [nameChat, setNameChat] = useState('');

  const fecha = new Date();

  const opciones = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };

  const horaFormateada = fecha.toLocaleTimeString('en-US', opciones);
  const showModal = () => {
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      setMessages([]); setWelcomeMessage(true); setSaveChat(false);
    }, 2500); // Se cerrará después de 2 segundos
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    // Agregar el mensaje del usuario al chat
    const newMessages = [...messages, { role: "user", content: inputText, date: horaFormateada }];
    setMessages(newMessages);
    setInputText('');

    // Enviar a ChatGPT
    const botResponse = await sendMessageToGPT(newMessages);
    setMessages([...newMessages, { role: "assistant", content: botResponse,  date: horaFormateada }]);
  };
  
  const changeWelcome = (param) => {
    console.log('parM', param)
    setMessages([...[]]);    
    setWelcomeMessage(param);
  }
  console.log('message', messages, welcomeMessage)

  const finishChat = () => {
    
  }

  return (
    <ImageBackground 
      source={require('../../../assets/image/background.jpeg')} // Ruta de la imagen de fondo
      style={styles.background}
    >
      <ScrollView contentContainerStyle={{ paddingHorizontal: 5 }} style={styles.backgroundScroll}>
        
        {
          welcomeMessage && (
            <CloudBubble/>

          )
        }
        {
          saveChat && (
            <>
            <Text style={{color:'red'}}>Para guardar chat debes agregar un titulo</Text>
            <TextInput
                  style={[styles.input, { width:'100%' }]}
                  value={nameChat}
                  onChangeText={setNameChat}
                  placeholder="Ingresa el nombre del Chat"
                />
            </>
          )
        }
        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <ChatBubble time={item.date} message={item.content} isSender={index % 2 === 0} />
          )}
        />

        {welcomeMessage && (
          <CapibaraAddChat setWelcomeMessage={changeWelcome}/>
        )}


        {!welcomeMessage && (
          <>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <TextInput
                  style={styles.input}
                  value={inputText}
                  onChangeText={setInputText}
                  placeholder="Escribe tu mensaje..."
                />
                <Pressable style={styles.presableIcon}
                >    
                  <Icon name="mic-circle-outline" size={45} color='black' />
                </Pressable>
              </View>
              <TouchableOpacity style={styles.button} onPress={handleSendMessage}>
                <Text style={styles.buttonText}>Enviar</Text>
              </TouchableOpacity>
              
              {messages.length !== 0 ? (
                <TouchableOpacity style={[styles.button, { backgroundColor:'#ec407a' }]}
                onPress={() => nameChat === ''? setSaveChat(true) : showModal()}
                >
                  <Text style={styles.buttonText}>{nameChat === ''? 'Guardar y finalizar chat': 'Finalizar chat'}</Text>
                </TouchableOpacity>
              ):
              <TouchableOpacity style={[styles.button, { backgroundColor:'#ec407a' }]}
                onPress={()=>{setMessages([]); setWelcomeMessage(true)}}>
                  <Text style={styles.buttonText}>Salir de Chat</Text>
                </TouchableOpacity>
              }
              
         </>        
        )}  
        <CustomModal label="Guardando Chat... Podras ver tu chat en el Historial" visible={modalVisible} onClose={() => setModalVisible(false)} />
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  presableIcon: {
    backgroundColor:'white',
    height:50,
    borderWidth: 1, 
    borderRadius:25,
    borderColor:'black',
    justifyContent:'center',
    alignItems:'center',
    marginTop:'10'
},
  backgroundScroll: {
    backgroundColor: 'rgba( 	191, 236, 207, 0.5)', // Negro semi-transparente
  },
  background: {
    flex: 1,
    resizeMode: 'cover', // Ajusta la imagen al tamaño de la pantalla
    paddingTop:0
  },
  button: {
    backgroundColor: '#FFCCEA',  
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 10,
    borderColor:'black',
    borderWidth:2
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    width: '85%',
    borderWidth: 1, 
    borderColor: 'black', 
    padding: 15, 
    marginVertical: 10, 
    borderRadius: 5, 
    backgroundColor: 'white', // Hace que el input sea legible sobre la imagen
  }
});

export default ChatScreen;
