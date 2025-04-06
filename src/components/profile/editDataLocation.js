import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet, Pressable, ScrollView
} from 'react-native';
import CustomModal from './CustomModal';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { updateLocation } from '../../features/location/locationSlice';

const EditLocationComponent = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const location = useSelector(state => state.location.location);

  const [modalVisible, setModalVisible] = useState(false);

  const initialData = {
    location: location || '',
  };

  const [formData, setFormData] = useState(initialData);
  const [hasChanges, setHasChanges] = useState(false);

  const showModal = () => {
    dispatch(updateLocation(formData));
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
          label="Dirección de destino"
          value={formData.location}
          onChangeText={(text) => handleChange('location', text)}
        />

        <Pressable style={styles.presable} onPress={() => hasChanges ? showModal() : navigation.navigate('Profile')}>
          <Text style={styles.textPresable}>{hasChanges ? 'Guardar Ubicación' : 'Salir de edición'}</Text>
        </Pressable>

        <CustomModal
          label="Guardando ubicación"
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

export default EditLocationComponent;
