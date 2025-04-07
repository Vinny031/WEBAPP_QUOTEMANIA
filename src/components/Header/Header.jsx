import React from 'react';
import PartySetupButton from '../PartySetupButton/PartySetupButton';
import './Header.scss';

const Header = ({ onPlayersConfigured, onSelectDifficulty }) => {
  return (
    <header className="header">
      <PartySetupButton
        onPlayersConfigured={onPlayersConfigured}
        onDifficultyChange={onSelectDifficulty}
      />
    </header>
  );
};

export default Header;
