import React from 'react';
import { View, Text, Button, ImageBackground, StyleSheet, FlatList, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

const HomeScreen = ({ navigation }) => {
  const conversations = useSelector(state => state.conversations.conversations);
  const conversation = conversations.filter((item)=> item.status === 'Pausada');
  return (
    <ImageBackground 
          source={require('../../assets/image/peace_mind.jpg')} // Ruta de la imagen de fondo
          style={styles.background}
        >
        <ScrollView contentContainerStyle={{ paddingHorizontal: 5 }} style={styles.backgroundScroll}>
      
        <View style={{flexDirection:'column', paddingHorizontal:15, justifyContent:'center', alignItems:'center'}}>
          {conversation.length !== 0 && (
            <>
             <Text style={styles.titleBanner}>Tienes Chats pausados deseas continuar con ellos.</Text>
           <FlatList
              key={conversation.conversation_id}
              data={conversation}
              keyExtractor={(item) => item.title}
              renderItem={({item} ) => (
                <Pressable style={styles.chatContainer} onPress={() => navigation.openDrawer()}>
                  <Text style={{ fontWeight: 'bold', fontSize: 20, marginVertical: 5 }}>
                    {item.topic}
                  </Text>
                  <Text>
                    {'Fecha de chat: ' + item.date}
                  </Text>
                  <Text>
                    {'Status: ' + item.status}
                  </Text>
                </Pressable>
            )}
          />  
            </>
          )}
          <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontFamily:'ligth', fontWeight:'bold', fontSize:25, textAlign:'center', paddingBottom:25}}>Para continuar con tu ayuda, ve nuetsras siguientes opciones.</Text>  
          <Pressable style={styles.presable} onPress={() => navigation.openDrawer()}>
            <Text style={styles.textPresable}>Ver opciones de ayuda</Text>  
          </Pressable>  
          </View> 
        </View>
        </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  textPresable:{
    fontSize:20,
    fontWeight:'800',
    textAlign:'center',
    color:'black',
    paddingRight:20
  },
  presable:{
    width:'100%',
    backgroundColor:'pink',
    padding:15,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25, 
    borderColor:'black',
    borderWidth:2,
    marginLeft:0
  },
  chatContainer: {
    activeOpacity: 1 ,
    marginBottom: 15,
    padding: 10,
    backgroundColor: 'rgba(222, 174, 231, 0.5)',
    borderRadius: 10,
    padding: 10, 
  },
  titleBanner:{
    fontSize:28,
    fontFamily:'cursive',
    fontWeight:'700',
    color:'black',
    textAlign:'center',
    padding:25
  },
  title:{
    fontSize:15
  },
  backgroundScroll: {
    backgroundColor: 'rgba( 	191, 236, 207, 0.5)', // Negro semi-transparente
  },
  background: {
    flex: 1,
    resizeMode: 'cover', // Ajusta la imagen al tamaño de la pantalla
    paddingTop:0
  },});

export default HomeScreen;
