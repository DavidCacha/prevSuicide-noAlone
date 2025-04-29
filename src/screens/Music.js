import React from 'react';
import { View, Text, Pressable, ImageBackground,ScrollView, StyleSheet } from 'react-native';
import SpotifyPlayer from '../components/music/musicForMe';

import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

const MusicaScreen = ({ navigation }) => {
   const selectMusic = createSelector(
      state => state.user?.userData?.usuario?.usuario?.music,
      conversations => conversations || []
    );
    const music = useSelector(selectMusic);
    const spotifyEmbedUrl = music[0]?.song; 
    const spotifyEmbedUrlPlaylist = music[1]?.playlist; 
  return (
      <ImageBackground 
        source={require('../../assets/image/music.jpg')} // Ruta de la imagen de fondo
        style={styles.background}
      >
        <ScrollView contentContainerStyle={{ paddingHorizontal: 5 }} style={styles.backgroundScroll}>
        <View style={styles.content}>
          {spotifyEmbedUrl && spotifyEmbedUrlPlaylist ? (
            <>
            <Text style={styles.title}>Musica que me hace sentir mejor</Text>
            <SpotifyPlayer/>
            </>
          ): (
            <>
                            <Text style={styles.noInfo}>Actualmente no tienes musica agregada</Text>  
                            <Text style={styles.noInfo}>Completa tu perfil con la informacion necesaria</Text>  
                          </>
          )}
          <View style={styles.contentPressable}>
            <Pressable style={styles.presable} onPress={() => navigation.openDrawer()}>
              <Text style={styles.textPresable}>Salir del Musica</Text>
            </Pressable>
          </View>
        </View>
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
  contentPressable: {
    flexDirection:'row', 
    justifyContent:'center',
    width:'100%',
    padding: 15
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
    borderWidth:2
  },
  textPresable:{
    fontSize:20,
    fontWeight:'800',
    color:'black'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign:'center',
    padding: 10,
    color: '555555'
  },
  backgroundScroll: {
    backgroundColor: 'rgba( 	191, 236, 207, 0.5)', // Negro semi-transparente
  },
  content:{
    flexDirection:'column',
    justifyContent:'center',
  },
  background: {
    flex: 1,
    resizeMode: 'cover', // Ajusta la imagen al tamaño de la pantalla
    paddingTop:0
  },
});

export default MusicaScreen;
