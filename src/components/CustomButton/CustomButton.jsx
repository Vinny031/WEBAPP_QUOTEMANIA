import React from 'react';
import Button from '@mui/material/Button';
import './CustomButton.scss';

const CustomButton = ({ onClick, label, className }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      className={`custom-button ${className}`}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
