import React, { useState } from 'react';
import { Modal, Box, TextField, MenuItem, IconButton, FormControl, InputLabel, Select } from '@mui/material';
import CustomButton from '../CustomButton/CustomButton';
import DeleteIcon from '@mui/icons-material/Delete';
import './PartySetupModal.scss';

const colors = [
  '#ffeb3b', '#ff9800', '#ffb74d', '#e57373', '#f44336', '#d32f2f',
  '#1de9b6', '#4db6ac', '#00796b', '#81c784', '#4caf50', '#64b5f6',
  '#2196f3', '#1976d2', '#ba68c8', '#9c27b0', '#bdbdbd', '#616161', '#000000'
];

const themes = [
  {
    value: 'culture',
    label: 'Culture Générale',
    image: '/assets/banner_theme/banner_culture.webp',
  },
  {
    value: 'disney',
    label: 'Disney',
    image: '/assets/banner_theme/banner_disney.webp',
  },
  {
    value: 'quote',
    label: 'Citations de films',
    image: '/assets/banner_theme/banner_quote.webp',
  }
];


const PartySetupModal = ({ open, onClose, onSubmit, onDifficultyChange }) => {
  const [players, setPlayers] = useState([
    { name: '', color: colors[0] },
    { name: '', color: colors[1] },
  ]);
  const [difficulty, setDifficulty] = useState('');
  const [theme, setTheme] = useState('');

  const handleChange = (index, field, value) => {
    const updatedPlayers = [...players];
    if (field === 'name') {
      // Capitaliser la première lettre du nom
      updatedPlayers[index][field] = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    } else {
      updatedPlayers[index][field] = value;
    }
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

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
    if (onDifficultyChange) {
      onDifficultyChange(event.target.value);
    }
  };

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };  

  const handleSubmit = () => {
    // Vérification si tous les joueurs ont un pseudo
    if (players.some(player => player.name.trim() === '')) {
      alert("Tous les pseudos doivent être remplis.");
      return;
    }

    // Vérification si un thème a été sélectionné
    if (!theme) {
      alert("Veuillez sélectionner un thème.");
      return;
    }

    // Vérification si une difficulté a été sélectionnée
    if (!difficulty) {
      alert("Veuillez sélectionner une difficulté.");
      return;
    }

    // Soumettre les données
    onSubmit(players, difficulty, theme);
    onDifficultyChange(difficulty);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-box">
        <div className="modal-header">
          <h2 className='modal-title'>Mode de jeux</h2>
          <FormControl fullWidth className="theme-select-wrapper">
            <InputLabel id="theme-label">Thème</InputLabel>
            <Select
              labelId="theme-label"
              id="theme-select"
              value={theme}
              label="Thème"
              onChange={handleThemeChange}
              sx={{
                backgroundImage: theme
                  ? `url(${themes.find(t => t.value === theme)?.image})`
                  : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: theme ? '#fff' : 'inherit',
                fontWeight: 'bold',
                '& .MuiSelect-select': {
                  backgroundColor: 'rgba(0,0,0,0.4)',
                }
              }}
            >
              {themes.map((themeOption) => (
                <MenuItem key={themeOption.value} value={themeOption.value}>
                  {themeOption.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="difficulty-label">Difficulté</InputLabel>
            <Select
              labelId="difficulty-label"
              id="difficulty-select"
              value={difficulty}
              label="Difficulté"
              onChange={handleDifficultyChange}
            >
              <MenuItem value={1}>🟢 Facile</MenuItem>
              <MenuItem value={2}>🟡 Moyenne</MenuItem>
              <MenuItem value={3}>🟠 Difficile</MenuItem>
              <MenuItem value={4}>🔴 Maître</MenuItem>
              <MenuItem value={5}>🎲 Aléatoire</MenuItem>
            </Select>
          </FormControl>
        </div>

        <h2 className='modal-title'>Qui c'est qui joue ?</h2>
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
          label="Ajouter quelqu'un"
          onClick={handleAddPlayer}
          disabled={players.length >= colors.length}
        />
        <CustomButton
          label="Let's go !"
          onClick={handleSubmit}
        />
      </Box>
    </Modal>
  );
};

export default PartySetupModal;
