import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, ScrollView, StyleSheet, Pressable
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomModal from './CustomModal';
import { useDispatch } from 'react-redux';
import { updateContact } from '../../features/contact/contactSlice';

const EditContactsComponent = () => {  
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const contactsFromRedux = useSelector(state => state.contacts.contacts || []);

  const [formData, setFormData] = useState(contactsFromRedux[0]?.friends || []);
  const [modalVisible, setModalVisible] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (index, key, value) => {
    const updated = formData.map((item, i) =>
      i === index ? { ...item, [key]: value } : item
    );
    setFormData(updated);
  };

  const handleAddContact = () => {
    setFormData(prev => [
      ...prev,
      { name: '', phone: '', relationship: '' }
    ]);
  };

  const handleRemoveContact = (index) => {
    const updated = formData.filter((_, i) => i !== index);
    setFormData(updated);
  };

  const showModal = () => {
    const updatedContacts = contactsFromRedux.map(item => {
      if (item.type === 'friends') {
        return {
          ...item,
          friends: formData
        };
      }
      return item;
    });
    dispatch(updateContact(updatedContacts));
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      navigation.navigate('Profile');
    }, 2000);
  };

  useEffect(() => {
    const clean = (obj) => JSON.stringify(obj).replace(/\s+/g, '');
    const isEqual = clean(formData) === clean(contactsFromRedux[0]?.friends || []);
    setHasChanges(!isEqual);
  }, [formData, contactsFromRedux]);
  const isFormValid = formData.length === 1 && formData.every(
    item => item.name.trim() !== '' && item.phone.trim() !== '' && item.relationship.trim() !== ''
  );
  
  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 0, width: '100%' }}>
      <View style={{ paddingVertical: 20 }}>
        <Text style={styles.sectionTitle}>Contactos personales de Emergencia</Text>
        {
          formData.length === 0 && (
            <Text style={{textAlign:'center',color:'red', fontWeight:'bold', fontSize:20}}> Es necesario tener al menos un contacto personal de emergencia</Text>
          )
        }
        {formData.map((contact, index) => (
          <View key={index} style={styles.contactContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.contactTitle}>Contacto #{index + 1}</Text>
              <Pressable onPress={() => handleRemoveContact(index)}>
                <Icon name="trash-outline" size={24} color="red" />
              </Pressable>
            </View>
            <InputField
              label="Nombre"
              value={contact.name}
              onChangeText={(text) => handleChange(index, 'name', text)}
            />
            <InputField
              label="Teléfono"
              value={contact.phone}
              onChangeText={(text) => handleChange(index, 'phone', text)}
            />
            <InputField
              label="Relación"
              value={contact.relationship}
              onChangeText={(text) => handleChange(index, 'relationship', text)}
            />
          </View>
        ))}

        <View style={styles.addButtonWrapper}>
          <Pressable onPress={handleAddContact} style={styles.addButton}>
            <Icon name="add-circle-outline" size={30} color="green" />
            <Text style={styles.addButtonText}>Agregar contacto</Text>
          </Pressable>
        </View>

        <Pressable
          style={styles.presable}
          onPress={() => (hasChanges && formData.length > 0 && isFormValid ? showModal() : navigation.navigate('Profile'))}
        >
          <Text style={styles.textPresable}>
            {hasChanges && formData.length > 0 && isFormValid ? 'Guardar Información' : 'Salir de edición'}
          </Text>
        </Pressable>
        <CustomModal
          label="Actualizando contactos"
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      </View>
    </ScrollView>
  );
};

const InputField = ({ label, value, onChangeText }) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput value={value} onChangeText={onChangeText} style={styles.input} />
  </View>
);

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  contactContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginHorizontal: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  fieldContainer: {
    marginBottom: 10,
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
    marginTop: 10,
  },
  textPresable: {
    fontSize: 20,
    fontWeight: '800',
    color: 'black',
  },
  addButtonWrapper: {
    alignItems: 'center',
    marginBottom: 15,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 10,
  },
  addButtonText: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default EditContactsComponent;
