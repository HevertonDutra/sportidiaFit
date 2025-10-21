import React from 'react';
import Svg, { Rect, Circle, Path } from 'react-native-svg';

const TabCommentsIcon = ({ size = 24, color = '#007AFF' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 512 512">
      {/* Notebook/clipboard background - larger for better visibility */}
      <Rect x="100" y="60" width="320" height="380" rx="25" ry="25" fill={color} stroke={color} strokeWidth="6"/>
      
      {/* Top binding holes - larger */}
      <Circle cx="170" cy="110" r="12" fill="white"/>
      <Circle cx="230" cy="110" r="12" fill="white"/>
      <Circle cx="290" cy="110" r="12" fill="white"/>
      <Circle cx="350" cy="110" r="12" fill="white"/>
      
      {/* Horizontal line separator */}
      <Rect x="120" y="160" width="280" height="6" fill="white"/>
      
      {/* Text lines - thicker for better visibility */}
      <Rect x="140" y="200" width="160" height="12" rx="6" fill="white"/>
      <Rect x="140" y="230" width="200" height="12" rx="6" fill="white"/>
      <Rect x="140" y="260" width="140" height="12" rx="6" fill="white"/>
      <Rect x="140" y="290" width="180" height="12" rx="6" fill="white"/>
      <Rect x="140" y="320" width="120" height="12" rx="6" fill="white"/>
      
      {/* Pencil - simplified and enlarged */}
      <Rect x="320" y="270" width="90" height="16" rx="8" fill={color} transform="rotate(45 365 278)"/>
      <Circle cx="395" cy="240" r="18" fill={color}/>
      <Path d="M380 220 L410 220 L405 235 L385 235 Z" fill="white"/>
    </Svg>
  );
};

export default TabCommentsIcon;