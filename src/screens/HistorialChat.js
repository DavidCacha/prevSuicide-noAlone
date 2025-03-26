import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet, ImageBackground, ScrollView, Pressable } from 'react-native';
import moment from 'moment';

// Importamos el JSON
import conversationsData from '../../assets/data/conversations.json';

const HistorialChatScreen = () => {
  const [conversations, setConversations] = useState([]);
  const navigation = useNavigation(); // Usa navigation para navegar

  useEffect(() => {
    setConversations(conversationsData.conversations);
  }, []);

  const formatDate = (date) => moment(date).format('YYYY-MM-DD');

  const groupByDate = (data) => {
    const today = formatDate(moment());
    const yesterday = formatDate(moment().subtract(1, 'day'));

    const grouped = { 'Hoy': [], 'Ayer': [] };

    data.forEach(item => {
      const itemDate = formatDate(item.date);
      if (itemDate === today) {
        grouped['Hoy'].push(item);
      } else if (itemDate === yesterday) {
        grouped['Ayer'].push(item);
      } else {
        if (!grouped[itemDate]) {
          grouped[itemDate] = [];
        }
        grouped[itemDate].push(item);
      }
    });

    return Object.entries(grouped).map(([date, items]) => ({
      title: date,
      data: items
    }));
  };

  const groupedConversations = groupByDate(conversations);
  console.log(groupedConversations)
  return (
    <ImageBackground source={require('../../assets/image/happy.jpg')} style={styles.background}>
      <ScrollView style={styles.backgroundScroll}>
        <View style={styles.container}>
          <Text style={styles.title}>Conversaciones</Text>
          <FlatList
            data={groupedConversations}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => (
              <View>
                {item.data.length > 0 && (
                  <>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, marginVertical: 5 }}>
                      {item.title}
                    </Text>
                    {item.data.map(chat => (
                      <Pressable 
                        key={chat.conversation_id} // Agrega una key única
                        style={({ pressed }) => [
                          styles.chatContainer,
                          { backgroundColor: chat.status === 'Pausada' ? 'rgb(166, 241, 224)' : 'rgba(247, 207, 216, 0.5)' },
                          pressed && { opacity: 1 }
                        ]}
                        onPress={() => navigation.navigate('ChatScreen', { chatId: chat.conversation_id })}
                      >
                        <Text style={styles.topic}>{chat.topic}</Text>
                        <Text style={styles.message}>{chat.date}</Text>
                        <Text style={styles.message}>{chat.status}</Text>
                      </Pressable>
                    ))}
                  </>
                )}
              </View>
            )}
          />
          <Pressable style={styles.presable} onPress={() => navigation.openDrawer()}>
            <Text style={styles.textPresable}>Salir de historial</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  presable:{
    width:'95%',
    backgroundColor:'pink',
    padding:15,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25, 
    borderColor:'black',
    borderWidth:2,
    marginLeft:10
  },
  textPresable:{
    fontSize:20,
    fontWeight:'800',
    color:'black'
  },
  backgroundScroll: {
    backgroundColor: 'rgba( 	191, 236, 207, 0.5)', // Negro semi-transparente
  },
  background: {
    flex: 1,
    resizeMode: 'cover', // Ajusta la imagen al tamaño de la pantalla
    paddingTop:0
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chatContainer: {
    activeOpacity: 1 ,
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10, 
  },
  topic: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  message: {
    fontSize: 16,
    marginVertical: 2,
  },
  user: {
    fontWeight: 'bold',
  },
});

export default HistorialChatScreen;

