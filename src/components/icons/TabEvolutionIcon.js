import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

const TabEvolutionIcon = ({ size = 24, color = '#007AFF' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 512 512">
      <Circle cx="256" cy="256" r="220" fill={color}/>
      {/* Person silhouette lifting weight */}
      <Path d="M256 150c18 0 32 14 32 32s-14 32-32 32-32-14-32-32 14-32 32-32z" fill="white"/>
      <Path d="M220 220h72c15 0 26 10 30 23l18 65v85c0 7-6 13-13 13s-13-6-13-13v-75h-20v75c0 7-6 13-13 13s-13-6-13-13v-75h-20v75c0 7-6 13-13 13s-13-6-13-13v-85l18-65c4-13 15-23 30-23z" fill="white"/>
      {/* Simplified dumbbells */}
      <Rect x="180" y="235" width="152" height="12" fill="white"/>
      <Rect x="165" y="225" width="25" height="32" fill="white"/>
      <Rect x="322" y="225" width="25" height="32" fill="white"/>
      {/* Weight at bottom */}
      <Rect x="210" y="390" width="92" height="18" fill="white"/>
      <Rect x="195" y="380" width="25" height="38" fill="white"/>
      <Rect x="292" y="380" width="25" height="38" fill="white"/>
    </Svg>
  );
};

export default TabEvolutionIcon;