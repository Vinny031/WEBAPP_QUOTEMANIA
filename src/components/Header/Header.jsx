import React from 'react';
import PlayerSetupButton from '../PlayerSetupButton/PlayerSetupButton';
import CustomButton from '../CustomButton/CustomButton';
import './Header.scss';

const Header = ({ onPlayersConfigured, onSelectDifficulty }) => {
  return (
    <header className="header">
      <PlayerSetupButton onPlayersConfigured={onPlayersConfigured} />
      <CustomButton label="Choisir la difficulté" onClick={onSelectDifficulty} />
    </header>
  );
};

export default Header;
