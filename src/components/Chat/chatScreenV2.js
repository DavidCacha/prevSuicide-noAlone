import React from 'react';
import { View, ScrollView } from 'react-native';
import ChatBubble from './chatBubble';

const ChatScreen = () => {
  return (
    <ScrollView contentContainerStyle={{ padding: 10 }}>
      <ChatBubble message="¡Hola! ¿Cómo estás?" isSender={false} />
      <ChatBubble message="¡Hola! Estoy bien, gracias. ¿Y tú?" isSender={true} />
      <ChatBubble message="También bien. ¿Qué haces?" isSender={false} />
    </ScrollView>
  );
};

export default ChatScreen;
