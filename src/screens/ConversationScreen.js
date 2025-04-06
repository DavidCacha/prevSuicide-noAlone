import React from 'react';
import { View , StyleSheet} from 'react-native';
import ChatScreen from '../components/Chat/chatScreen';



const ConversationScreen = () => {
  return (
    <View style={{ flex: 1, margin:0, padding:0 }}>
    <ChatScreen/>
    </View>
  );
};


export default ConversationScreen;
