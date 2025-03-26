import React, { useEffect, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Asegúrate de instalarlo
import SpeechBubble from './speechBubble';
import { useNavigation } from '@react-navigation/native';

const CapibaraAddChat = ({ setWelcomeMessage }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current; // Valor inicial de escala
    const navigation = useNavigation();
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.1, // Hace crecer la imagen un 10%
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1, // Vuelve a su tamaño original
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <View style={styles.container}>
            <SpeechBubble />
            <Animated.Image
                source={require('../../../assets/image/capibara.png')}
                style={[styles.image, { transform: [{ scale: scaleAnim }] }]} // Se aplica la animación
            />
            <TouchableOpacity onPress={() => setWelcomeMessage(false)} style={styles.buttonAdd}>
                <Icon name="add" size={70} color="white" style={styles.icon} />
            </TouchableOpacity>
            <View style={styles.contentPressable}>
                <Pressable style={styles.presable} onPress={() => navigation.openDrawer()}>
                <Text style={styles.textPresable}>Salir del Chat</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    contentPressable: {
        position: 'absolute',
        top:425,
        flexDirection:'row', 
        justifyContent:'center',
        width:'100%',
        paddingVertical: 13
      },
      presable:{
        width:'100%',
        backgroundColor:'pink',
        padding:10, 
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25, 
        borderColor:'black',
        borderWidth:2
      },
      textPresable:{
        fontSize:20,
        fontWeight:'800',
        color:'black'
      },
    buttonAdd: {
        height: 70,
        width: 70,
        backgroundColor: '#FFCCEA',
        borderRadius: 15,
        position: 'absolute',
        right: 20,
        top: 120,
        borderWidth: 5,
        borderColor:'black',
        alignItems:'center',
        justifyContent:'center'
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        flexDirection: 'row',
    },
    image: {
        width: 240,
        height: 300,
        marginBottom: 10,
        position: 'absolute',
        top: 120,
        left: 15
    },
    icon: {
        marginTop: -5,
        marginLeft:-5
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default CapibaraAddChat;
