import React, { useEffect, useState } from "react";
import { View, PermissionsAndroid, Platform, Pressable, Text, Linking, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Geolocation from "@react-native-community/geolocation";
import Icon from 'react-native-vector-icons/Ionicons'; //
import { useNavigation } from '@react-navigation/native';



const GOOGLE_MAPS_APIKEY = "AIzaSyDLOzRiynIcz4Ff1VMgWk5Cr0ootdhKzVw";

const MapScreen = () => {
    const navigation = useNavigation();
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState({
    latitude: 19.432608, // Ejemplo: CDMX
    longitude: -99.133209,
  });

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        }
      } else {
        getCurrentLocation();
      }
    };

    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        (position) => {
          setOrigin({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => console.log(error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    };

    requestLocationPermission();
  }, []);

  // Función para abrir Google Maps con la ruta
  const startNavigation = () => {
    if (!origin) return;

    const url = Platform.select({
      ios: `maps://app?saddr=${origin.latitude},${origin.longitude}&daddr=${destination.latitude},${destination.longitude}&directionsmode=driving`,
      android: `google.navigation:q=${destination.latitude},${destination.longitude}&mode=d`
    });

    Linking.openURL(url);
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 19.432608, // CDMX de referencia
          longitude: -99.133209,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation
      >
        {origin && (
          <Marker coordinate={origin} title="Ubicación Actual" pinColor="blue" />
        )}

        <Marker coordinate={destination} title="Destino" />

        {origin && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            strokeColor="blue"
          />
        )}
      </MapView>

      {/* Botón para iniciar la ruta en Google Maps */}
      <Pressable
        onPress={startNavigation}
        style={{
          position: "absolute",
          bottom: 50,
          left: "40%",
          marginLeft: -75,
          padding:15,
            backgroundColor:'#F6F1E7',
            borderRadius:25,
            borderWidth:1,
        }}
      >
        <Text style={{ color: "black", fontSize: 16 }}>Iniciar Ruta en Google Maps</Text>
      </Pressable>
        <Pressable style={styles.exit} onPress={() => navigation.openDrawer()}>
            <Icon name="exit" size={35} color='black' />
        </Pressable>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
    exit: {
        position:"absolute",
        padding:7,
        backgroundColor:'#F6F1E7',
        borderRadius:25,
        borderWidth:1,
        flexDirection:'row',
        justifyContent:'center',
        top: 20,
        left: 25
    }
});
