import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

const EvolutionIcon = ({ size = 40, color = '#007AFF' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 512 512">
      <Circle cx="256" cy="256" r="200" fill={color}/>
      {/* Person silhouette lifting weight */}
      <Path d="M256 160c15 0 27 12 27 27s-12 27-27 27-27-12-27-27 12-27 27-27z" fill="white"/>
      <Path d="M230 220h52c12 0 22 8 25 19l15 55v80c0 6-5 11-11 11s-11-5-11-11v-70h-16v70c0 6-5 11-11 11s-11-5-11-11v-70h-16v70c0 6-5 11-11 11s-11-5-11-11v-80l15-55c3-11 13-19 25-19z" fill="white"/>
      {/* Dumbbells */}
      <Rect x="200" y="240" width="112" height="8" fill="white"/>
      <Rect x="190" y="230" width="20" height="28" fill="white"/>
      <Rect x="302" y="230" width="20" height="28" fill="white"/>
      <Rect x="180" y="225" width="15" height="38" fill="white"/>
      <Rect x="317" y="225" width="15" height="38" fill="white"/>
      {/* Weight at bottom */}
      <Rect x="220" y="380" width="72" height="15" fill="white"/>
      <Rect x="210" y="370" width="20" height="35" fill="white"/>
      <Rect x="282" y="370" width="20" height="35" fill="white"/>
    </Svg>
  );
};

export default EvolutionIcon;