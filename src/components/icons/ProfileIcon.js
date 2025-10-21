import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

const ProfileIcon = ({ size = 40, color = '#007AFF' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 512 512">
      {/* Outer circle */}
      <Circle cx="256" cy="256" r="240" fill={color}/>
      
      {/* Head circle */}
      <Circle cx="256" cy="180" r="60" fill="white"/>
      
      {/* Body shape (shoulders/torso) */}
      <Path 
        d="M146 400 C146 340, 190 300, 256 300 C322 300, 366 340, 366 400 L366 450 C366 460, 356 470, 346 470 L166 470 C156 470, 146 460, 146 450 Z" 
        fill="white"
      />
    </Svg>
  );
};

export default ProfileIcon;