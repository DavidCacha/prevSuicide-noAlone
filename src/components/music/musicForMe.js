import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { WebView } from "react-native-webview";

const SpotifyPlayer = () => {
  const spotifyEmbedUrl = "https://open.spotify.com/embed/track/2fuYa3Lx06QQJAm0MjztKr"; // Enlace embebido
  const spotifyEmbedUrlPlaylist = "https://open.spotify.com/embed/playlist/37i9dQZF1EIeODNDegVpao?theme=0"; // Playlist de ejemplo

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
