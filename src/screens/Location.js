import React from 'react';
import { View, Text, Button, Pressable, StyleSheet } from 'react-native';
import MapScreen from '../components/maps/mapsScreen';

const LocationScreen = ({ navigation }) => {
  return (
    <>
      <MapScreen/>
    </>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  pressableExp:{
    position:'absolute',
    padding:15,
    backgroundColor:'#F6F1E7',
    borderRadius:25,
    borderWidth:1,
  }
});