import React from 'react';
import PartySetupButton from '../PartySetupButton/PartySetupButton';
import CustomButton from '../CustomButton/CustomButton';
import './Header.scss';

const Header = ({ onPlayersConfigured, onSelectDifficulty }) => {
  return (
    <header className="header">
      <PartySetupButton onPlayersConfigured={onPlayersConfigured} />
      <CustomButton label="Choisir la difficulté" onClick={onSelectDifficulty} />
    </header>
  );
};

export default Header;
