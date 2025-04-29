import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet, Pressable, ScrollView
} from 'react-native';
import CustomModal from './CustomModal';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { updateUserData } from '../../features/user/userSlice';
import { createSelector } from 'reselect';


const EditMusicDataComponent = () => {
  const selectUser = createSelector(
        state => state.user?.userData?.usuario?.usuario,
        user => user || []
      );
    const selectToken = createSelector(
      state => state.user?.userData.token,
      user => user || []
    );
    
    const selectUserData = createSelector(
      state => state.user?.userData,
      user => user || []
    );
    const userData = useSelector(selectUserData);
    const token =  useSelector(selectToken);
    const profileData = useSelector(selectUser);
  const selectMusic = createSelector(
      state => state.user?.userData?.usuario?.usuario?.music,
      conversations => conversations || []
    );
  const music = useSelector(selectMusic);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');

  const initialData = {
    song:  music[0]?.song,
    playlist: music[1]?.playlist,
  };

  const validatedMusic = music[0]?.song && music[1].playlist;
  const [formData, setFormData] = useState(initialData);
  const [hasChanges, setHasChanges] = useState(false);

  const formattedData = {
    music: [
      {
        type: 'song',
        song: formData.song?.replace('/track/', '/embed/track/'),
      },
      {
        type: 'playlist',
        playlist: formData.playlist?.includes('embed')
          ? formData.playlist
          : formData.playlist?.replace('/playlist/', '/embed/playlist/'),
      },
    ],
  };


 const handleSubmit = async () => {
    try {
      const userId = profileData._id;
      const url = `http://192.168.100.5:3000/usuarios/${userId}/music`;
  
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formattedData),
      });
  
      const data = await response.json();
      if (response.ok) {
        const newUserData = {
          ...userData, // mantiene mensaje y token
          usuario: {
            usuario: {
              ...userData.usuario.usuario, // conserva todo lo actual
              music: data.music // sobrescribe solo `music`
            }
          }
        };
        dispatch(updateUserData(newUserData));
        setHasChanges(false);
        setMessage(data.mensaje);
        setModalVisible(true);
  
        setTimeout(() => {
          setModalVisible(false);
          navigation.replace('Profile'); // fuerza recarga del perfil
        }, 3000);
      } else {
        console.error('❌ Error al actualizar:', data);
      }
    } catch (error) {
      console.error('❗ Error en la petición:', error);
    }
  };

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const clean = obj => JSON.stringify(obj).replace(/\s+/g, '');
    const isEqual = clean(formData) === clean(initialData);
    setHasChanges(!isEqual);
  }, [formData]);

  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 15 }}>
      <View style={{ paddingVertical: 20 }}>
        <InputField
          label="Canción"
          value={formData.song}
          onChangeText={(text) => handleChange('song', text)}
        />
        <InputField
          label="Playlist"
          value={formData.playlist}
          onChangeText={(text) => handleChange('playlist', text)}
        />

         <Pressable style={styles.presable} onPress={() => hasChanges ? handleSubmit(): navigation.navigate('Profile') }>
          <Text style={styles.textPresable}>{hasChanges ? 'Guardar Información':'Salir de edicion'}</Text>
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

// Componente reutilizable de input
const InputField = ({ label, value, onChangeText }) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput value={value} onChangeText={onChangeText} style={styles.input} />
  </View>
);

const styles = StyleSheet.create({
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
    marginTop: 20,
  },
  textPresable: {
    fontSize: 20,
    fontWeight: '800',
    color: 'black',
  },
});

export default EditMusicDataComponent;
