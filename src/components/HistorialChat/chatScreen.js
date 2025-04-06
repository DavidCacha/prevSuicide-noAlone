import React, { useState } from 'react';
import { Text, View,  FlatList, StyleSheet, ImageBackground, ScrollView, Pressable,TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ChatsBubble from './chatsBubble';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';


const ChatScreen = ({ route }) => {
   const [inputText, setInputText] = useState('');
  const navigation = useNavigation();
  const { chatId } = route.params; 
  const conversationsData = useSelector(state => state.conversations.conversations);
  const data = conversationsData;
  const conversation = data.filter(item => {
    return item.conversation_id === chatId;
  });
  
  const topic  = conversation.map(conversation => {return conversation.topic});
  
  const messages = conversation.map(conversation => {return conversation.messages});
  const status1 = conversation.map(conversation => {return conversation.status});
  const status = status1[0];
  return (
    <ImageBackground 
      source={require('../../../assets/image/background.jpeg')} // Ruta de la imagen de fondo
      style={styles.background}
    >
      <ScrollView contentContainerStyle={{ paddingHorizontal: 5 }} style={styles.backgroundScroll}>
      <View style= {styles.viewTitle}>
        <Text style={styles.title}>{topic}</Text>  
      </View>                
      <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            item.map(message => {
              return (  
                <ChatsBubble message={message}/>
              );
            })
          )}
        />
        { status === 'Pausada' && (
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', backgroundColor:'red', paddingHorizontal:15, paddingVertical:5 }}>
                        <TextInput
                          style={styles.input}
                          value={inputText}
                          onChangeText={setInputText}
                          placeholder="Escribe tu mensaje...                           "
                        />
                        <Pressable style={styles.presableIcon}
                        >    
                          <Icon name="mic-circle-outline" size={45} color='black' />
                        </Pressable>
                      </View>
          <View style={{padding:15}}>
          <TouchableOpacity style={styles.presable}>
                          <Text style={styles.textPresable}>Enviar</Text>
                        </TouchableOpacity>
          </View>
                        
        </>
        )}            
        <View style={{paddingHorizontal:15, paddingBottom:15}}>
        <Pressable style={styles.presable} onPress={() => navigation.goBack()}>
          <Text style={styles.textPresable}>{inputText !== '' ? 'Guardar chat' : 'Salir del Chat'}</Text>
        </Pressable>
        </View>
      </ScrollView>
      
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
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
    flex:1,
    width:'85%',
    marginRight:25,
    borderWidth: 1, 
    borderColor: 'black',
    marginVertical: 10, 
    borderRadius: 5, 
    backgroundColor: 'white', // Hace que el input sea legible sobre la imagen
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
  presable:{
    borderColor:'black',
    borderWidth:3,
    backgroundColor:'pink',
    padding:15, 
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25
  },
  textPresable:{
    fontSize:20,
    fontWeight:'800',
    color:'black'
  },
  viewTitle:{
    flexDirection:'row', 
    justifyContent:'center', 
    alignItems:'center', 
    paddingTop:15, 
    paddingHorizontal:15}
  ,
  title:{
    fontSize: 35,
    textAlign:'center',
    fontWeight: 'bold',
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
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1, 
    borderColor: '#CDC1FF', 
    padding: 15, 
    marginVertical: 10, 
    borderRadius: 5, 
    backgroundColor: 'white', // Hace que el input sea legible sobre la imagen
  }
});

export default ChatScreen;
