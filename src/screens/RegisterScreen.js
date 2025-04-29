import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import EditCountDataComponent from '../components/profile/editDataCount';
import EditRegisterDataComponent from '../components/Resgiter/editRegiter';

const RegisterScreen = ({ title = "Completa el registro de tu cuenta" }) => {

    const renderForm = () => {
        return <EditRegisterDataComponent />;
      };
  return (
    <ImageBackground
          source={require('../../assets/image/profile.jpg')}
          style={styles.background}
          resizeMode="cover"
    >
    <ScrollView style={styles.backgroundScroll}> 
        <View style={{paddingTop:30}}>
                    <Text style={{fontSize:20, fontWeight:'bold', textAlign:'center', paddingTop:30}}>{title}</Text>
        </View>
        <View style={styles.formContainer}>{renderForm()}</View>
    </ScrollView>
    </ImageBackground>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
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

    formContainer: {
        marginTop: 10,
    },
});
