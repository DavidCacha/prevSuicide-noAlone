import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const ChatsBubble = ({ message }) => {
  return (
    <View style={[
      styles.container,
      message.user ? styles.senderContainer : styles.receiverContainer // Aplica alineación según el usuario
    ]}>
      <Text style={[styles.textUser,  message.user ? styles.senderText : styles.receiverText]}>{message.user || message.bot}</Text>
      <View style={[styles.bubbleContainer, message.user ? styles.sender : styles.receiver]}>
        <Text style={styles.bubbleText}>{message.message || message.assistant}</Text>
      </View>
      <Text style={[styles.textTime,  message.user ? styles.senderText : styles.receiverText]}>{message.time}</Text>
    </View>
  );
  
};

const styles = StyleSheet.create({
    title:{

    },
    textUser:{
        fontSize:20,
        fontWeight:'800',
        color:'black'
    },
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical: 5,
      },
      senderContainer: {
        justifyContent: 'flex-end', // Mensajes del usuario a la derecha
        alignSelf: 'flex-end',
      },
      receiverContainer: {
        justifyContent: 'flex-start', // Mensajes del bot a la izquierda
        alignSelf: 'flex-start',
      },
  bubbleContainer: {
    padding:15,
    margin: 5,
    borderRadius: 15,
  },
  sender: {
    alignSelf: 'flex-end',
    backgroundColor: '#FFCCEA',
    borderBottomRightRadius: 2, // Punta en la burbuja
    
    borderColor:'black',
    borderWidth:3,
  },
  receiver: {
    
    borderColor:'black',
    borderWidth:3,
    alignSelf: 'flex-start',
    backgroundColor:'#FFF6E3',
    borderBottomLeftRadius: 2, // Punta en la burbuja
  },
  senderText: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 2, // Punta en la burbuja
  },
  receiverText: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 2, // Punta en la burbuja
  },
  bubbleText: {
    color: ' #9575cd ',
    fontSize: 16,
  },
});

export default ChatsBubble;
