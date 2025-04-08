import React from 'react';
import PartySetupButton from '../PartySetupButton/PartySetupButton';
import ResetButton from '../ResetButton/ResetButton'
import './Header.scss';

const Header = ({ onPlayersConfigured, onSelectDifficulty,resetGame }) => {
  return (
    <header className="header">
      <PartySetupButton
        onPlayersConfigured={onPlayersConfigured}
        onDifficultyChange={onSelectDifficulty}
        label="Configurer la partie"
      />
      <ResetButton onClick={resetGame} label="↻" />
    </header>
  );
};

export default Header;
