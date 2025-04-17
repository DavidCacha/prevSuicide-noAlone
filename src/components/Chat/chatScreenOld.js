import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Pressable } from 'react-native';
import { sendMessageToGPT } from '../../services/openaiservice';
import ChatBubble from './chatBubble';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Dropdown } from 'react-native-element-dropdown';
import CustomModal from '../profile/CustomModal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateConversation } from '../../features/conversations/conversationsSlice';
import { createSelector } from 'reselect';
import { updateUserData } from '../../features/user/userSlice';


const ChatOldScreen = ({route}) => {
  const { chatId } = route.params; 
  const selectUserData = createSelector(
            state => state.user?.userData,
            user => user || []
          );
  const userData = useSelector(selectUserData);
  const selectUser = createSelector(
      state => state.user?.userData?.usuario?.usuario,
      user => user || []
    );
  const profileData = useSelector(selectUser);
  const conversations = profileData.conversations;
  const asistentData =  profileData.asistent;
  const usernameData =  profileData.username;
    const dataConversation = conversations;
    const conversation = dataConversation.filter(item => {
      return item.conversation_id === chatId;
    });
  const navigation = useNavigation();
  
  const [modalVisible, setModalVisible] = useState(false);
  const [messages, setMessages] = useState(conversation[0].messages);
  const [inputText, setInputText] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState(true);
  const [saveChat, setSaveChat] = useState(false);
  const [nameChat, setNameChat] = useState('');
  const [value, setValue] = useState('Pausada');
  const [message, setMessage] = useState('');
  const fecha = new Date();
  const formattedDate = fecha.toLocaleDateString('en-CA');
  const dispatch = useDispatch();
  const opciones = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };

  const data = [
    { label: 'Pausada', value: 'Pausada' },
    { label: 'Terminada', value: 'Terminada' },
  ];
  

  const participantes = {};
  const resultado = [];

  messages.forEach(item => {
    if (item.user && !participantes[item.user]) {
      participantes[item.user] = true;
      resultado.push(item);
    }
    if (item.bot && !participantes[item.bot]) {
      participantes[item.bot] = true;
      resultado.push(item);
    }
  });
  
  const topic  = conversation.map(conversation => {return conversation.topic});
  
  const horaFormateada = fecha.toLocaleTimeString('en-US', opciones);
  const showModal = async () => {
    const newConversation = {
      "conversation_id":conversation[0].conversation_id,
      "topic": topic[0],
      "date": formattedDate,
      "status":'Terminada', 
      "messages":messages
    };
    const updatedConversations = conversations.map(conv =>
      conv.conversation_id === newConversation.conversation_id
        ? { ...conv, ...newConversation } // reemplaza solo ese objeto
        : conv
    );
    const newConversations = {
      conversations: updatedConversations,
      metadata: {
      created_at: formattedDate,
      total_conversations: updatedConversations.length
    }
    };

    const newUserData = {
      ...userData, // mantiene mensaje y token
      usuario: {
        usuario: {
          ...userData.usuario.usuario, // conserva todo lo actual
          conversations: newConversations.conversations
        }
      }
    };
    try {
              const userId = profileData._id;
              const url = `http://192.168.100.5:3000/usuarios/${userId}/conversations`;
              const response = await fetch(url, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(newConversations),
              });
              const data = await response.json();
              
              if (response.ok) {
                dispatch(updateUserData(newUserData));
                setMessage(data.mensaje);
                setModalVisible(true);
                setTimeout(() => {
                  setModalVisible(false);
                  setMessages([]); setWelcomeMessage(true); setSaveChat(false);
                  navigation.navigate('HistorialChat')
                }, 2500); 
              } else {
                console.error('❌ Error al actualizar:', data);
              }
            } catch (error) {
              console.error('❗ Error en la petición:', error);
            }
    //dispatch(updateConversation(updatedConversations));
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      setMessages([]); setWelcomeMessage(true); setSaveChat(false);
      navigation.navigate('HistorialChat')
    }, 2500); // Se cerrará después de 2 segundos
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    // Agregar el mensaje del usuario al chat
    const newMessages = [...messages, {date: formattedDate, time: horaFormateada,  user: usernameData, message: inputText}];
    setMessages(newMessages);
    setInputText('');

    // Enviar a ChatGPT
    const botResponse = await sendMessageToGPT(newMessages);
    setMessages([...newMessages, {date: formattedDate, time: horaFormateada,  bot: asistentData, message: botResponse}]);
  };
  
  return (
    <ImageBackground 
      source={require('../../../assets/image/background.jpeg')} // Ruta de la imagen de fondo
      style={styles.background}
    >
      <ScrollView contentContainerStyle={{ paddingHorizontal: 5 }} style={styles.backgroundScroll}>
        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
          <Text style={{textAlign:'center', fontWeight:'800', fontSize:35}}>{topic}</Text>
        </View>
        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <ChatBubble user={item.user} bot={item.bot} time={item.time} message={item.message || item.assistant} isSender={item.user ? true : false} />
          )}
        />

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
              { value !== 'Terminada' && (
                <TouchableOpacity style={styles.button} onPress={handleSendMessage}>
                  <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>
              )}
              
              {nameChat && (
                <View style={{flexDirection:'column', justifyContent:'center'}}>
                <Text style={{color:'red'}}>Selecciona una opcion</Text>
                <Dropdown
                          style={styles.dropdown}
                          containerStyle={{ backgroundColor: 'rgba(190, 192, 83, 0.9)', 
                            borderColor: 'black',
                            borderWidth: 3,
                            borderRadius: 8, }} // Menú desplegable semitransparente
                          data={data}
                          labelField="label"
                          valueField="value"
                          placeholder="Selecciona una opción"
                          value={value}
                          onChange={(item) => {
                            setValue(item.value);
                          }}
                        />
              </View>
              )}
              {messages.length !== 0 ? (
                <TouchableOpacity style={[styles.button, { backgroundColor:'#ec407a' }]}
                onPress={() => showModal()}
                >
                  <Text style={styles.buttonText}>Finalizar chat</Text>
                </TouchableOpacity>
              ):
              <TouchableOpacity style={[styles.button, { backgroundColor:'#ec407a' }]}
                onPress={()=>{setMessages([]); setWelcomeMessage(true)}}>
                  <Text style={styles.buttonText}>Salir de Chat</Text>
                </TouchableOpacity>
              }
              
         </>        
        
        <CustomModal label={message} visible={modalVisible} onClose={() => setModalVisible(false)} />
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    width:'95%',
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical:15,
    backgroundColor: '#F5D97E',
  },
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

export default ChatOldScreen;
