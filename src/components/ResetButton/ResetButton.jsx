import React from 'react';
import CustomButton from '../CustomButton/CustomButton';

const ResetButton = ({ onClick, label = "Reset", className }) => {
  return (
    <CustomButton
      onClick={onClick}
      label={label}
      className={`reset-button ${className}`} 
      aria-label={label}
    />
  );
};

export default ResetButton;
