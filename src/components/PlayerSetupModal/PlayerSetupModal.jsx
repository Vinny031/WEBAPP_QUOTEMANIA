import React, { useState } from 'react';
import { Modal, Box, TextField, MenuItem, IconButton } from '@mui/material';
import CustomButton from '../CustomButton/CustomButton';
import DeleteIcon from '@mui/icons-material/Delete'; // Icône pour supprimer
import './PlayerSetupModal.scss';

const colors = [
  '#ffeb3b', '#ff9800', '#ffb74d', '#e57373', '#f44336', '#d32f2f',
  '#1de9b6', '#4db6ac', '#00796b', '#81c784', '#4caf50', '#64b5f6',
  '#2196f3', '#1976d2', '#ba68c8', '#9c27b0', '#bdbdbd', '#616161', '#000000'
];

const PlayerSetupModal = ({ open, onClose, onSubmit }) => {
  const [players, setPlayers] = useState([
    { name: '', color: colors[0] },
    { name: '', color: colors[1] },
  ]);

  const handleChange = (index, field, value) => {
    const updatedPlayers = [...players];
    updatedPlayers[index][field] = value;
    setPlayers(updatedPlayers);
  };

  const handleAddPlayer = () => {
    if (players.length < colors.length) {
      setPlayers([...players, { name: '', color: colors[players.length] }]);
    }
  };

  const handleRemovePlayer = (index) => {
    const updatedPlayers = players.filter((_, i) => i !== index);
    setPlayers(updatedPlayers);
  };

  const handleSubmit = () => {
    if (players.some(player => player.name.trim() === '')) {
      alert("Tous les pseudos doivent être remplis.");
      return;
    }
    onSubmit(players);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-box">
        <h2>Configuration des participant·e·s</h2>
        {players.map((player, index) => (
          <div key={index} className="player-row">
            <TextField
              label={`Pseudo ${index + 1}`}
              value={player.name}
              onChange={(e) => handleChange(index, 'name', e.target.value)}
              fullWidth
              size="small"
            />
            <TextField
              select
              label="Couleur"
              value={player.color}
              onChange={(e) => handleChange(index, 'color', e.target.value)}
              size="small"
            >
              {colors.map((color) => (
                <MenuItem key={color} value={color}>
                  <div className="color-preview" style={{ backgroundColor: color }} />
                </MenuItem>
              ))}
            </TextField>
            <IconButton
              onClick={() => handleRemovePlayer(index)}
              color="error"
              disabled={players.length <= 2}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
        <CustomButton
          label="Ajouter un·e participant·e"
          onClick={handleAddPlayer}
          disabled={players.length >= colors.length}
        />
        <CustomButton
          label="Valider"
          onClick={handleSubmit}
        />
      </Box>
    </Modal>
  );
};

export default PlayerSetupModal;
