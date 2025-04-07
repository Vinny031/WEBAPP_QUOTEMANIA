import React, { useState } from 'react';
import CustomButton from '../CustomButton/CustomButton';
import PartySetupModal from '../PartySetupModal/PartySetupModal';

const PartySetupButton = ({ onPlayersConfigured }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmitPlayers = (players) => {
    onPlayersConfigured(players);
    handleClose();
  };

  return (
    <>
      <CustomButton label="Configurer la partie" onClick={handleOpen} />
      <PartySetupModal
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmitPlayers}
      />
    </>
  );
};

export default PartySetupButton;
