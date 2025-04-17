import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { WebView } from "react-native-webview";
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';


const SpotifyPlayer = () => {

  const selectMusic = createSelector(
    state => state.user?.userData?.usuario?.usuario?.music,
    conversations => conversations || []
  );
  const music = useSelector(selectMusic);
  const spotifyEmbedUrl = music[0].song; 
  const spotifyEmbedUrlPlaylist = music[1].playlist; 

  return (
    <View style={styles.container}>
      <View style={styles.webviewContainer}>
        <WebView 
          source={{ uri: spotifyEmbedUrl }} 
          style={styles.webview} 
        />
        <Text style={styles.title}>Tu Playlist te acompaña siempre</Text>
        <WebView 
          source={{ uri: spotifyEmbedUrlPlaylist }} 
          style={styles.webviewPlaylist} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign:'center',
        padding: 10,
        color: '555555',
        marginTop:-35
      },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  webviewContainer: {
    width: "90%",
    height: '100%',
  },
  webview: {
    flex: 1,
    minHeight: 400, // Evita el colapso
    backgroundColor: 'transparent'
  },
  webviewPlaylist: {
    flex: 1,
    minHeight: 400, // Evita el colapso
    backgroundColor: 'transparent',
    marginTop:0
  }
});

export default SpotifyPlayer;
