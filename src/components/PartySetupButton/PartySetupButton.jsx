import React, { useState } from 'react';
import CustomButton from '../CustomButton/CustomButton';
import PartySetupModal from '../PartySetupModal/PartySetupModal';

const PartySetupButton = ({ onPlayersConfigured, onDifficultyChange }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmitPlayers = (players, difficulty) => {
    onPlayersConfigured(players);
    onDifficultyChange(difficulty);
    handleClose();
  };

  return (
    <>
      <CustomButton label="Configurer la partie" onClick={handleOpen} />
      <PartySetupModal
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmitPlayers}
        onDifficultyChange={onDifficultyChange}
      />
    </>
  );
};

export default PartySetupButton;
