import React from 'react';
import { 
  TouchableOpacity, 
  TouchableOpacityProps, 
  Insets 
} from 'react-native';

interface AppTouchableOpacityProps extends TouchableOpacityProps {
  children: React.ReactNode;
  // Allows overriding the default if a specific button needs a bigger/smaller area
  customHitSlop?: Insets; 
}

// Defining a standard hitSlop (10px padding for the touch area)
const DEFAULT_HIT_SLOP: Insets = { top: 10, bottom: 10, left: 10, right: 10 };

export const AppTouchableOpacity: React.FC<AppTouchableOpacityProps> = React.memo(({ 
  children, 
  customHitSlop, 
  activeOpacity = 0.7, // Professional default for subtle feedback
  ...rest 
}) => {
  return (
    <TouchableOpacity
      hitSlop={customHitSlop || DEFAULT_HIT_SLOP}
      activeOpacity={activeOpacity}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
});
