import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, ScrollView, Image,
  Switch, StyleSheet, Pressable
} from 'react-native';
import { useSelector } from 'react-redux';
import CustomModal from './CustomModal';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../features/profile/profileSlice';
import { updateUserInAllConversations } from '../../features/conversations/conversationsSlice'

const EditCountDataComponent = () => {
  
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const profileData = useSelector(state => state.profile.profile);
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState(profileData);
  const [hasChanges, setHasChanges] = useState(false);
  const [changedFields, setChangedFields] = useState({});


  const showModal = () => {
    const username = changedFields.username.now;
    dispatch(updateProfile(formData));
    dispatch(updateUserInAllConversations(username));
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      navigation.navigate('Profile');
    }, 3000);
  };

  // Detecta changes en los datos del formulario
  useEffect(() => {
    const clean = obj => JSON.stringify(obj).replace(/\s+/g, '');
    const isEqual = clean(formData) === clean(profileData);
    setHasChanges(!isEqual);
  }, [formData, profileData]);


  useEffect(() => {
    const changes = {};

    Object.keys(formData).forEach(key => {
      if (formData[key] !== profileData[key]) {
        changes[key] = {
          now: formData[key]
        };
      }
    });

    setChangedFields(changes);
  }, [formData, profileData]);

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
  
  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 0 }}>
      <View style={{ paddingHorizontal: 15, paddingTop: 0, paddingBottom: 0 }}>
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
            onValueChange={(value) =>
              handleNestedChange('preferences', 'notifications', value)
            }
          />
        </View>

        <Pressable style={styles.presable} onPress={() => hasChanges ? showModal(): navigation.navigate('Profile') }>
            <Text style={styles.textPresable}>{hasChanges ? 'Guardar Información':'Salir de edicion'}</Text>
          </Pressable>

        <CustomModal
          label="Actualizando información"
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      </View>
    </ScrollView>
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
    marginBottom: 5,
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
  presable: {
    width: '95%',
    backgroundColor: 'pink',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    borderColor: 'black',
    borderWidth: 2,
    marginLeft: 10,
  },
  textPresable: {
    fontSize: 20,
    fontWeight: '800',
    color: 'black',
  },
});

export default EditCountDataComponent;
