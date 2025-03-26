import React, { useState } from 'react';
import {
  ImageBackground, View, Text, TextInput, ScrollView, Image,
  Switch, StyleSheet, TouchableOpacity,
  Pressable,
} from 'react-native';
import user from "../../../assets/data/user.json";
import CustomModal from './CustomModal';

const EditCountComponent = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState(user);

  const showModal = () => {
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      navigation.navigate('Profile')
    }, 3000); 
  };

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleNestedChange = (section, key, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const fields = [
    { label: 'Nombre', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Teléfono', key: 'phone' },
    { label: 'Dirección', key: 'address' },
    { label: 'Usuario', key: 'username' },
    { label: 'Género', key: 'gender' },
    { label: 'Nacimiento', key: 'birthdate' },
    { label: 'Ocupación', key: 'occupation' },
    { label: 'Empresa', key: 'company' },
    { label: 'Bio', key: 'bio' },
  ];

  const socialPlatforms = ['linkedin', 'github', 'facebook'];

  const onSubmit = (data) => {
    console.log('Datos guardados:', data);
    // lógica de guardado...
  };

  return (
    <ImageBackground
      source={require('../../../assets/image/editCount.jpg')}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={{ paddingHorizontal: 5 }} style={styles.backgroundScroll}>
        <View style={{ paddingHorizontal: 15, paddingTop: 15, paddingBottom:15 }}>
          <View style={styles.centeredView}>
            <Image
              source={require('../../../assets/image/devCasanova2.jpeg')}
              style={styles.profileImage}
            />
          </View>

          {fields.map(({ label, key }) => (
            <InputField
              key={key}
              label={label}
              value={formData[key]}
              onChangeText={(text) => handleChange(key, text)}
            />
          ))}

          <Text style={styles.sectionTitle}>Redes Sociales</Text>
          {socialPlatforms.map((platform) => (
            <InputField
              key={platform}
              label={platform}
              value={formData.socialLinks[platform]}
              onChangeText={(text) => handleNestedChange('socialLinks', platform, text)}
            />
          ))}

          <Text style={styles.sectionTitle}>Preferencias</Text>
          <InputField
            label="Idioma"
            value={formData.preferences.language}
            onChangeText={(text) => handleNestedChange('preferences', 'language', text)}
          />
          <InputField
            label="Tema"
            value={formData.preferences.theme}
            onChangeText={(text) => handleNestedChange('preferences', 'theme', text)}
          />
          <View style={styles.switchContainer}>
            <Text style={styles.label}>Notificaciones</Text>
            <Switch
              value={formData.preferences.notifications}
              onValueChange={(value) => handleNestedChange('preferences', 'notifications', value)}
            />
          </View>
           <Pressable style={styles.presable} onPress={showModal}>
               <Text style={styles.textPresable}>Guardar Informacion</Text>
            </Pressable>
            <CustomModal label="Actualizando informacion" visible={modalVisible} onClose={() => setModalVisible(false)} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

// 🔹 Componente reutilizable para campos de texto
const InputField = ({ label, value, onChangeText }) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput value={value} onChangeText={onChangeText} style={styles.input} />
  </View>
);

const styles = StyleSheet.create({
  centeredView: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 8,
  },
  fieldContainer: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 4,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 4,
    padding: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  backgroundScroll: {
    backgroundColor: 'rgba(191, 236, 207, 0.5)',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default EditCountComponent;
