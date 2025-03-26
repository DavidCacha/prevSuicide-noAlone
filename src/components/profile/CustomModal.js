import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';

const CustomModal = ({ label, visible, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{label}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(180, 168, 149, 0.5)',
  },
  modalContent: {
    width:'80%',
    backgroundColor: '#F5D97E',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth:2,
    borderColor:'black'
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    color:'black',
    fontWeight:'700'
  },
});

export default CustomModal;
