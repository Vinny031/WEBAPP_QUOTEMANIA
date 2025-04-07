import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const DifficultySelector = () => {
  const [difficulty, setDifficulty] = useState('');

  const handleChange = (event) => {
    setDifficulty(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="difficulty-label">Difficulté</InputLabel>
      <Select
        labelId="difficulty-label"
        id="difficulty-select"
        value={difficulty}
        label="Difficulté"
        onChange={handleChange}
      >
        <MenuItem value={1}>Facile</MenuItem>
        <MenuItem value={2}>Moyenne</MenuItem>
        <MenuItem value={3}>Difficile</MenuItem>
        <MenuItem value={4}>Très Difficile</MenuItem>
        <MenuItem value={5}>Héroïque</MenuItem>
      </Select>
    </FormControl>
  );
};

export default DifficultySelector;
