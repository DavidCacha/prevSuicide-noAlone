import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet, ImageBackground, ScrollView, Pressable } from 'react-native';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';


const HistorialChatScreen = () => {

  const selectConversations = createSelector(
    state => state.user?.userData?.usuario?.usuario?.conversations,
    conversations => conversations || []
  );

  const conversationsData = useSelector(selectConversations); 
  const navigation = useNavigation(); // Usa navigation para navegar
 

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
  
    return Object.entries(grouped)
  .sort(([a], [b]) => {
    if (a === 'Hoy') return -1;
    if (b === 'Hoy') return 1;
    if (a === 'Ayer') return -1;
    if (b === 'Ayer') return 1;

    // Ordenar fechas en formato YYYY-MM-DD descendente
    return moment(b).diff(moment(a));
  })
  .map(([date, items]) => {
    const ordenado = items.sort((a, b) => {
      if (a.status === 'Pausada' && b.status === 'Terminada') return -1;
      if (a.status === 'Terminada' && b.status === 'Pausada') return 1;
      return 0;
    });

    return {
      title: date,
      data: ordenado
    };
  });

  };
  
  const groupedConversations = groupByDate(conversationsData);
  const hasElements = groupedConversations.some(group => group.data.length > 0);
  return (
    <ImageBackground source={require('../../assets/image/happy.jpg')} style={styles.background}>
      <ScrollView style={styles.backgroundScroll}>
        {hasElements  ? (
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
                          { backgroundColor: chat.status === 'Pausada' ? 'rgba(166, 241, 224, 0.5)' : 'rgba(247, 207, 216, 0.5)' },
                          pressed && { opacity: 1 }
                        ]}
                        onPress={() => chat.status === 'Pausada' ? 
                          navigation.navigate('ChatOldScreen', { chatId: chat.conversation_id }) :
                            navigation.navigate('ChatScreenHistory', { chatId: chat.conversation_id })}
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
        ) : (
          <>
           <Text style={styles.noInfo}>Actualmente no tienes conversaciones incicia una en seccion de Chat</Text>  
           <Text style={styles.noInfo}>Adicionalmente completa tu perfil con la informacion necesaria</Text> 
           <Pressable style={styles.presable} onPress={() => navigation.openDrawer()}>
            <Text style={styles.textPresable}>Salir de historial</Text>
          </Pressable> 
         </>
        )}   
      </ScrollView>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  noInfo:{
    fontFamily:'ligth', 
    fontWeight:'bolder', 
    fontSize:25, 
    textAlign:'center', 
    paddingBottom:25, 
    paddingTop:95
  },
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

