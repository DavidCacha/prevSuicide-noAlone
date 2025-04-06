import React, { useState } from 'react';
import { View, StyleSheet, Text, ImageBackground, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import EditCountDataComponent from '../profile/editDataCount';
import EditMusicDataComponent from '../profile/EditDataMusic';
import EditContactsComponent from '../profile/editDataContact';
import EditLocationComponent from '../profile/editDataLocation';
import EditAsistenComponent from '../profile/editDataAsistent';

const data = [
  { label: 'Perfil', value: 'profile' },
  { label: 'Musica', value: 'music' },
  { label: 'Contactos', value: 'contact' },
  { label: 'Ubicacion segura', value: 'location' },
  { label: 'Chat', value: 'chat' },
];

const EditData = () => {
  const [value, setValue] = useState('profile');

  const renderForm = () => {
    switch (value) {
      case 'profile':
        return <EditCountDataComponent/>;
      case 'music':
        return <EditMusicDataComponent/>;
      case 'contact':
        return <EditContactsComponent/>;
      case 'location':
        return <EditLocationComponent/>;
      case 'chat':
        return <EditAsistenComponent/>;
      default:
        return null;
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/image/profile.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
    <ScrollView style={styles.backgroundScroll}>
      <View style={styles.container}>
        <View style={{paddingTop:30}}>
            <Text style={{fontSize:20, fontWeight:'bold', textAlign:'center', paddingTop:30}}>Realiza el cambio requerido en tu cuenta</Text>
        </View>
        <Dropdown
          style={styles.dropdown}
          containerStyle={{ backgroundColor: 'rgba(190, 192, 83, 0.9)', 
            borderColor: 'black',
            borderWidth: 3,
            borderRadius: 8, }} // Menú desplegable semitransparente
          data={data}
          labelField="label"
          valueField="value"
          placeholder="Selecciona una opción"
          value={value}
          onChange={(item) => {
            setValue(item.value);
          }}
        />
        <View style={styles.formContainer}>{renderForm()}</View>
      </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
    backgroundScroll: {
        backgroundColor: 'rgba(248, 250, 249, 0.5)', // Negro semi-transparente
        paddingBottom:0
      },
  background: {
    flex: 1,
  },
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection:'column', 
    justifyContent:'center',
    alignItems:'center'
  },
  dropdown: {
    height: 50,
    width:'95%',
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical:15,
    backgroundColor: '#F5D97E',
  },
  formContainer: {
    marginTop: 20,
  },
});

export default EditData;
