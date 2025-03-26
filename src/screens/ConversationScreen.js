import React from 'react';
import { View, Text, ImageBackground , StyleSheet} from 'react-native';
import ChatScreen from '../components/Chat/chatScreen';



const ConversationScreen = () => {
  return (
    <View style={{ flex: 1, margin:0, padding:0 }}>
    <ChatScreen/>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba( 	240, 98, 146, 0.5)', // Negro semi-transparente
  },
});
export default ConversationScreen;
