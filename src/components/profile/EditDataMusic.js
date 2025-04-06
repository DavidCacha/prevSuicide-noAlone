import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet, Pressable, ScrollView
} from 'react-native';
import CustomModal from './CustomModal';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { updateMusic } from '../../features/music/musicSlice';

const EditMusicDataComponent = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const music = useSelector(state => state.music.music);
  const [modalVisible, setModalVisible] = useState(false);

  const initialData = {
    song:  music[0].song,
    playlist: music[1].playlist,
  };

  const [formData, setFormData] = useState(initialData);
  const [hasChanges, setHasChanges] = useState(false);

  const showModal = () => {
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
    dispatch(updateMusic(formattedData.music));
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
            navigation.navigate('Profile');
    }, 2000);
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

         <Pressable style={styles.presable} onPress={() => hasChanges ? showModal(): navigation.navigate('Profile') }>
          <Text style={styles.textPresable}>{hasChanges ? 'Guardar Información':'Salir de edicion'}</Text>
         </Pressable>

        <CustomModal
          label="Guardando información de tu musica"
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
