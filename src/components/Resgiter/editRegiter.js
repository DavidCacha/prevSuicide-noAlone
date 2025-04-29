import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, ScrollView, Switch, StyleSheet, Pressable
} from 'react-native';
import { useSelector } from 'react-redux';
import CustomModal from '../profile/CustomModal';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { updateUserData } from '../../features/user/userSlice';

const EditRegisterDataComponent = () => {
  const selectUserData = createSelector(
    state => state.user?.userData,
    user => user || {}
  );
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [hasChanges, setHasChanges] = useState(false);
  const [changedFields, setChangedFields] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    const defaultData = {
      profilePicture: "https://randomuser.me/api/portraits/men/32.jpg",
      name: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      registrationDate: new Date().toISOString().split('T')[0], // Fecha actual
      username: '',
      gender: '',
      birthdate: '',
      occupation: '',
      company: '',
      bio: '',
      socialLinks: {
        twitter: '',
        linkedin: '',
      },
      accountStatus: 'Activo', // Establecido como "Activo"
      lastLogin: '',
      preferences: {
        language: '',
        theme: '',
        notifications: false,
      },
      lastLogin: "2025-04-09 14:30:00",
    };
  
    setFormData({ ...defaultData, ...userData });
  }, [userData]);

  useEffect(() => {
    const clean = obj => JSON.stringify(obj).replace(/\s+/g, '');
    const isEqual = clean(formData) === clean(userData);
    setHasChanges(!isEqual);
  }, [formData, userData]);

  useEffect(() => {
    const changes = {};
    Object.keys(formData).forEach(key => {
      if (formData[key] !== userData[key]) {
        changes[key] = formData[key]; // Guarda el valor si es diferente
      }
    });
  
    setChangedFields(changes);
  }, [formData, userData]);

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
    { label: 'Contraseña', key: 'password' },
    { label: 'Teléfono', key: 'phone' },
    { label: 'Dirección', key: 'address' },
    { label: 'Usuario', key: 'username' },
    { label: 'Género', key: 'gender' },
    { label: 'Nacimiento', key: 'birthdate' },
    { label: 'Ocupación', key: 'occupation' },
    { label: 'Empresa', key: 'company' },
    { label: 'Bio', key: 'bio' },
  ];

  const socialPlatforms = ['twitter', 'linkedin'];

  const handleSubmit = async () => {
    try {
      const url = `http://192.168.100.5:3000/usuarios/`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(changedFields),
      });

      const data = await response.json();
      if (response.ok) {
        const { mensaje } = data;

        
        setChangedFields({});
        setHasChanges(false);
        setMessage(mensaje);
        setModalVisible(true);

        setTimeout(() => {
          setModalVisible(false);
          navigation.replace('Login'); 
        }, 3000);
      } else {
        console.error('❌ Error al actualizar:', data);
      }
    } catch (error) {
      console.error('❗ Error en la petición:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 0 }}>
      <View style={{ paddingHorizontal: 15, paddingTop: 0, paddingBottom: 0 }}>
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
            value={formData?.socialLinks?.[platform] ?? ''}
            onChangeText={(text) => handleNestedChange('socialLinks', platform, text)}
          />
        ))}

        <Text style={styles.sectionTitle}>Preferencias</Text>
        <InputField
          label="Idioma"
          value={formData?.preferences?.language ?? ''}
          onChangeText={(text) => handleNestedChange('preferences', 'language', text)}
        />
        <InputField
          label="Tema"
          value={formData?.preferences?.theme ?? ''}
          onChangeText={(text) => handleNestedChange('preferences', 'theme', text)}
        />
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Notificaciones</Text>
          <Switch
            value={formData?.preferences?.notifications ?? false}
            onValueChange={(value) =>
              handleNestedChange('preferences', 'notifications', value)
            }
          />
        </View>

        <Pressable style={styles.presable} onPress={() => hasChanges ? handleSubmit() : navigation.navigate('Profile')}>
          <Text style={styles.textPresable}>{hasChanges ? 'Guardar Información' : 'Salir de edición'}</Text>
        </Pressable>

        <CustomModal
          label={message}
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

export default EditRegisterDataComponent;
