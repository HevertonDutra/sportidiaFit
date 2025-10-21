import React from 'react';
import Svg, { Rect, Path, Circle } from 'react-native-svg';

const HomeIcon = ({ size = 24, color = '#007AFF' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 512 512">
      {/* House base */}
      <Rect x="120" y="240" width="272" height="220" fill={color} rx="15"/>
      
      {/* Roof */}
      <Path d="M80 250 L256 100 L432 250 L400 250 L256 140 L112 250 Z" fill={color}/>
      
      {/* Door */}
      <Rect x="220" y="360" width="72" height="100" fill="white" rx="8"/>
      <Circle cx="275" cy="405" r="5" fill={color}/>
      
      {/* Windows */}
      <Rect x="150" y="280" width="50" height="50" fill="white" rx="8"/>
      <Rect x="312" y="280" width="50" height="50" fill="white" rx="8"/>
      
      {/* Window crosses */}
      <Rect x="172" y="280" width="6" height="50" fill={color}/>
      <Rect x="150" y="302" width="50" height="6" fill={color}/>
      <Rect x="334" y="280" width="6" height="50" fill={color}/>
      <Rect x="312" y="302" width="50" height="6" fill={color}/>
    </Svg>
  );
};

export default HomeIcon;