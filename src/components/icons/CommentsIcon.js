import React from 'react';
import Svg, { Rect, Circle, Path } from 'react-native-svg';

const CommentsIcon = ({ size = 40, color = '#007AFF' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 512 512">
      {/* Notebook/clipboard background */}
      <Rect x="120" y="80" width="280" height="360" rx="20" ry="20" fill={color} stroke={color} strokeWidth="4"/>
      
      {/* Top binding holes */}
      <Circle cx="180" cy="120" r="8" fill="white"/>
      <Circle cx="230" cy="120" r="8" fill="white"/>
      <Circle cx="280" cy="120" r="8" fill="white"/>
      <Circle cx="330" cy="120" r="8" fill="white"/>
      
      {/* Horizontal line separator */}
      <Rect x="140" y="160" width="240" height="4" fill="white"/>
      
      {/* Text lines */}
      <Rect x="160" y="200" width="140" height="8" rx="4" fill="white"/>
      <Rect x="160" y="230" width="180" height="8" rx="4" fill="white"/>
      <Rect x="160" y="260" width="120" height="8" rx="4" fill="white"/>
      <Rect x="160" y="290" width="160" height="8" rx="4" fill="white"/>
      <Rect x="160" y="320" width="100" height="8" rx="4" fill="white"/>
      
      {/* Pencil */}
      <Rect x="320" y="280" width="80" height="12" rx="6" fill={color} transform="rotate(45 360 286)"/>
      <Circle cx="385" cy="250" r="15" fill={color}/>
      <Path d="M375 235 L395 235 L390 245 L380 245 Z" fill="white"/>
      <Rect x="315" y="275" width="50" height="8" rx="4" fill="white" transform="rotate(45 340 279)"/>
    </Svg>
  );
};

export default CommentsIcon;