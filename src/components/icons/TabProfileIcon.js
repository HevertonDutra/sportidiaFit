import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

const TabProfileIcon = ({ size = 24, color = '#007AFF' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 512 512">
      {/* Outer circle */}
      <Circle cx="256" cy="256" r="230" fill={color}/>
      
      {/* Head circle - larger for better visibility */}
      <Circle cx="256" cy="190" r="70" fill="white"/>
      
      {/* Body shape (shoulders/torso) - simplified */}
      <Path 
        d="M130 420 C130 350, 180 310, 256 310 C332 310, 382 350, 382 420 L382 460 C382 470, 372 480, 362 480 L150 480 C140 480, 130 470, 130 460 Z" 
        fill="white"
      />
    </Svg>
  );
};

export default TabProfileIcon;