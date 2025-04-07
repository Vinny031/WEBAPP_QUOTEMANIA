import React, { useState } from 'react';
import CustomButton from '../CustomButton/CustomButton';
import PlayerSetupModal from '../PlayerSetupModal/PlayerSetupModal';

const PlayerSetupButton = ({ onPlayersConfigured }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmitPlayers = (players) => {
    onPlayersConfigured(players);
    handleClose();
  };

  return (
    <>
      <CustomButton label="Participant·e·s" onClick={handleOpen} />
      <PlayerSetupModal
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmitPlayers}
      />
    </>
  );
};

export default PlayerSetupButton;
