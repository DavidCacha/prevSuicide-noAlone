import React from 'react';
import { Text, View,  FlatList, StyleSheet, ImageBackground, ScrollView, Pressable } from 'react-native';
import conversationsData from '../../../assets/data/conversations.json';
import { useNavigation } from '@react-navigation/native';
import ChatsBubble from './chatsBubble';


const ChatScreen = ({ route }) => {
  const navigation = useNavigation();
  const { chatId } = route.params; 
  const data = conversationsData.conversations;
  const conversation = data.filter(item => {
    return item.conversation_id === chatId;
  });
  const topic  = conversation.map(conversation => {return conversation.topic});
  
  const messages = conversation.map(conversation => {return conversation.messages});
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
        <View style={{padding:15}}>
        <Pressable style={styles.presable} onPress={() => navigation.goBack()}>
          <Text style={styles.textPresable}>Salir del Chat</Text>
        </Pressable>
        </View>
      </ScrollView>
      
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
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
    fontFamily:'cursive'
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
