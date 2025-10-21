import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

const WorkoutIcon = ({ size = 40, color = '#007AFF' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 512 512">
      <Circle cx="256" cy="256" r="256" fill="none" stroke={color} strokeWidth="20"/>
      <Circle cx="256" cy="256" r="200" fill="none" stroke={color} strokeWidth="10"/>
      {/* Person silhouette */}
      <Path d="M256 120c20 0 36 16 36 36s-16 36-36 36-36-16-36-36 16-36 36-36z" fill={color}/>
      <Path d="M220 200h72c15 0 28 10 32 24l20 70c2 8-3 16-11 18s-16-3-18-11l-15-52h-26v100c0 8-7 15-15 15s-15-7-15-15V249h-26l-15 52c-2 8-10 13-18 11s-13-10-11-18l20-70c4-14 17-24 32-24z" fill={color}/>
      {/* Barbell */}
      <Path d="M120 240h40v32h-40v-32z" fill={color}/>
      <Path d="M352 240h40v32h-40v-32z" fill={color}/>
      <Path d="M160 248h192v16H160v-16z" fill={color}/>
      {/* Weight plates */}
      <Rect x="80" y="220" width="20" height="72" fill={color}/>
      <Rect x="100" y="230" width="20" height="52" fill={color}/>
      <Rect x="392" y="230" width="20" height="52" fill={color}/>
      <Rect x="412" y="220" width="20" height="72" fill={color}/>
    </Svg>
  );
};

export default WorkoutIcon;