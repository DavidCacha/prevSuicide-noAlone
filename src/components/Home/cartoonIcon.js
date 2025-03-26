import React from 'react';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

const CartoonTree = ({ size = 150 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Tronco del árbol */}
      <Rect 
        x="40" y="60" width="20" height="30" 
        fill="#8B4513" stroke="black" strokeWidth="3"
      />

      {/* Copa del árbol (hojas) */}
      <Circle cx="50" cy="40" r="22" fill="green" stroke="black" strokeWidth="3" />
      <Circle cx="35" cy="45" r="18" fill="green" stroke="black" strokeWidth="3" />
      <Circle cx="65" cy="45" r="18" fill="green" stroke="black" strokeWidth="3" />
    </Svg>
  );
};

export default CartoonTree;
