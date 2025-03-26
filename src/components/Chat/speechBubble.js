import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const SpeechBubble = ({ message }) => {
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 10, // Subir la burbuja
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(floatAnim, {
          toValue: 0, // Bajar la burbuja
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { bottom: floatAnim.interpolate({
      inputRange: [0, 10],
      outputRange: [-100, -90], // Modifica estos valores para ajustar la flotación
    }) }]}>
      <Svg height="220" width="250" viewBox="0 0 150 100">
        <Path
          d="M20,20 h100 a20,20 0 0,1 20,20 v20 a20,20 0 0,1 -20,20 h-50 l-15,15 -5,-15 h-10 a20,20 0 0,1 -20,-20 v-20 a20,20 0 0,1 20,-20 z"
          fill="white"
          stroke="black"
          strokeWidth="3"
        />
      </Svg>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Platicame qué es lo que tienes</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
  },
  textContainer: {
    position: 'absolute',
    top: 70,
    left: 60,
    width: 150,
  },
  text: {
    fontSize: 27,
    fontFamily: 'cursive',
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
});

export default SpeechBubble;
