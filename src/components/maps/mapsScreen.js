import React, { useEffect, useState } from "react";
import { View, PermissionsAndroid, Platform, Pressable, Text, Linking, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Geolocation from "@react-native-community/geolocation";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from 'react-redux';


const GOOGLE_MAPS_APIKEY = "AIzaSyDLOzRiynIcz4Ff1VMgWk5Cr0ootdhKzVw";

const MapScreen = () => {
  const locationFromRedux = useSelector(state => state.location.location || "Bellas Artes, CDMX");
  const navigation = useNavigation();
  // Recibimos la dirección del destino desde route.params, si no se pasa se usa un valor por defecto

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState({
    latitude: 19.432608,
    longitude: -99.133209,
  });

  // Función que convierte una dirección en coordenadas usando Geocoding de Google
  const getCoordinatesFromAddress = async (address) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_APIKEY}`
      );
      const data = await response.json();
      if (data.status === "OK") {
        const location = data.results[0].geometry.location;
        return {
          latitude: location.lat,
          longitude: location.lng,
        };
      } else {
        console.error("No se pudo geocodificar la dirección", data.status);
        return null;
      }
    } catch (error) {
      console.error("Error al obtener coordenadas:", error);
      return null;
    }
  };

  useEffect(() => {
    // Solicitar permiso y obtener la ubicación actual
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

      // Convertir la dirección del destino en coordenadas
      const getDestinationCoords = async () => {
        const coords = await getCoordinatesFromAddress(locationFromRedux);
        if (coords) {
          setDestination(coords);
        }
      };
      getDestinationCoords();
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
  }, [locationFromRedux]);

  // Función para abrir Google Maps con la ruta
  const startNavigation = () => {
    if (!origin) return;
    const url = Platform.select({
      ios: `maps://app?saddr=${origin.latitude},${origin.longitude}&daddr=${destination.latitude},${destination.longitude}&directionsmode=driving`,
      android: `google.navigation:q=${destination.latitude},${destination.longitude}&mode=d`,
    });
    Linking.openURL(url);
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 19.432608,
          longitude: -99.133209,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation
      >
        {origin && (
          <Marker
            coordinate={origin}
            title="Ubicación Actual"
            pinColor="blue"
          />
        )}

        <Marker
          coordinate={destination}
          title="Destino"
        />

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
        style={styles.navigationButton}
      >
        <Text style={styles.navigationButtonText}>Iniciar Ruta en Google Maps</Text>
      </Pressable>

      <Pressable style={styles.exit} onPress={() => navigation.openDrawer()}>
        <Icon name="exit" size={35} color="black" />
      </Pressable>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  exit: {
    position: "absolute",
    padding: 7,
    backgroundColor: "#F6F1E7",
    borderRadius: 25,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    top: 20,
    left: 25,
  },
  navigationButton: {
    position: "absolute",
    bottom: 50,
    left: "40%",
    marginLeft: -75,
    padding: 15,
    backgroundColor: "#F6F1E7",
    borderRadius: 25,
    borderWidth: 1,
  },
  navigationButtonText: {
    color: "black",
    fontSize: 16,
  },
});
