import React from 'react';
import MapScreen from '../components/maps/mapsScreen';
import { createSelector } from 'reselect';
import { Text, StyleSheet, View, Pressable } from "react-native";
import { useSelector } from 'react-redux';

const LocationScreen = ({ navigation }) => {
  const selectLocation = createSelector(
        state => state.user?.userData?.usuario?.usuario?.location,
        conversations => conversations || []
      );
  const locationFromRedux = useSelector(selectLocation || "Bellas Artes, CDMX");
  return (
    <>
    {locationFromRedux.length > 0 ? (<MapScreen/>) : (
      <View style={styles.container}>
        <Text style={styles.noInfo}>Actualmente no tienes musica agregada</Text>  
        <Text style={styles.noInfo}>Completa tu perfil con la informacion necesaria</Text>  
        <Pressable style={styles.presable} onPress={() => navigation.openDrawer()}>
        <Text style={styles.textPresable}>Salir del ubicacion segura</Text>
         </Pressable>
     </View>
    )}
      
    </>
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
  noInfo:{
    fontFamily:'ligth', 
    fontWeight:'bold', 
    fontSize:25, 
    textAlign:'center', 
    paddingBottom:25, 
    paddingTop:95
  }, 
  container:{
    flexDirection:'column', 
    justifyContent:'center', 
    alignItems:'center', 
    paddingVertical:15, 
    paddingHorizontal:10
  },
});

export default LocationScreen;