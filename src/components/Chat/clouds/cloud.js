import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import Svg, { Path } from "react-native-svg";

const CloudBubble = ({ text }) => {
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const floatAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 10, // Baja la nube
          duration: 2000,
          easing: Easing.inOut(Easing.ease), // Hace que la transición sea suave
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: -10, // Sube la nube
          duration: 2000,
          easing: Easing.inOut(Easing.ease), // Mantiene la suavidad
          useNativeDriver: true,
        }),
      ])
    );

    floatAnimation.start();

    return () => floatAnimation.stop(); // Detener la animación al desmontar
  }, []);

  return (
    <Animated.View style={[styles.cloudContainer, { transform: [{ translateY: floatAnim }] }]}>
       <Svg width="350" height="170" viewBox="0 0 250 170" fill="none">
      <Path
        d="M50 80C30 80 20 60 20 50C20 30 40 10 70 20C80 0 110 0 120 20C150 10 170 30 170 50C170 70 160 80 150 80H50Z"
        fill="#FFF6E3"
        stroke="black"
        strokeWidth="3"
        transform="scale(1.7)"  // Hace la nube el doble de grande
       
      />
    </Svg>

      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Bienvenido, dime cómo te puedo ayudar a sentirte mejor
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cloudContainer: {
    top: 5,
    left:-40,
    position: 'relative',
    width: 380,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    position: 'absolute',
    backgroundColor: '#FFF6E3',
    borderRadius: 50,
  },
  circle1: { width: 90, height: 90, top: 20, left: 20 },
  circle2: { width: 110, height: 110, top: -10, left: 100 },
  circle3: { width: 90, height: 90, top: 20, left: 180 },
  circle4: { width: 140, height: 70, top: 60, left: 80 },
  textContainer: {
    position: 'absolute',
    top: 50,
    right: 40,
    width: 220,
    backgroundColor: 'rgba(255, 246, 227, 0.8)',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center', 
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 20,
    fontFamily:'sans-serif-condensed',
    color: '#333',
    textAlign: 'center',
    flexWrap: 'wrap',
    fontWeight: 'bold',
  },
});

export default CloudBubble;
