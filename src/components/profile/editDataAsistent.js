import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet, Pressable, ScrollView
} from 'react-native';
import CustomModal from './CustomModal';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { updateAsistent } from '../../features/asistent/asistentSlice';
import { updateBotInAllConversations } from '../../features/conversations/conversationsSlice'

const EditAsistenComponent = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const asistent = useSelector(state => state.asistent.asistent);
  const [modalVisible, setModalVisible] = useState(false);
  const initialData = {
    asistent: asistent || '',
  };

  const [formData, setFormData] = useState(initialData);
  const [hasChanges, setHasChanges] = useState(false);

  const showModal = () => {
    dispatch(updateAsistent(formData.asistent));
    dispatch(updateBotInAllConversations(formData.asistent));
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
    <View style={{ paddingVertical: 20 }}>
        <InputField
          label="Ingresa el nombre de tu asistente"
          value={formData.asistent}
          onChangeText={(text) => handleChange('asistent', text)}
        />

        <Pressable style={styles.presable} onPress={() => hasChanges ? showModal() : navigation.navigate('Profile')}>
          <Text style={styles.textPresable}>{hasChanges ? 'Guardar nombre de asistente' : 'Salir de edición'}</Text>
        </Pressable>

        <CustomModal
          label="Guardando nombre se asistente virtual"
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      </View>
  );
};

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

export default EditAsistenComponent;
