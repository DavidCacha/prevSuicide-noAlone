import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatBubble = ({ message, isSender, time }) => {
  
  return (
    <>
    <Text 
        style={[styles.textUser,  isSender ? styles.senderText : styles.receiverText]}>{!isSender ? 'Bot' : 'David'}</Text>
    <View style={[styles.bubbleContainer, isSender ? styles.sender : styles.receiver]}>
      <Text style={styles.bubbleText}>{message}</Text>
    </View>
    <Text style={[styles.textTime,  isSender ? styles.senderText : styles.receiverText]}>{time}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  senderText: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 2, // Punta en la burbuja
  },
  receiverText: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 2, // Punta en la burbuja
  },
  senderContainer: {
    justifyContent: 'flex-end', // Mensajes del usuario a la derecha
    alignSelf: 'flex-end',
  },
  receiverContainer: {
    justifyContent: 'flex-start', // Mensajes del bot a la izquierda
    alignSelf: 'flex-start',
  },
  textUser:{
    fontSize:20,
    fontWeight:'800',
    color:'black'
},
  bubbleContainer: {
    borderColor:'black',
    borderWidth:3,
    padding: 10,
    margin: 5,
    borderRadius: 15,
  },
  sender: {
    alignSelf: 'flex-end',
    backgroundColor: '#FFCCEA',
    borderBottomRightRadius: 2, // Punta en la burbuja
  },
  receiver: {
    alignSelf: 'flex-start',
    backgroundColor:'#FFF6E3',
    borderBottomLeftRadius: 2, // Punta en la burbuja
  },
  bubbleText: {
    color: ' #9575cd ',
    fontSize: 16,
  },
});

export default ChatBubble;
