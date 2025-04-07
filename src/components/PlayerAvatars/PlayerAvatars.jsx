import React from 'react';
import { Avatar } from '@mui/material';
import './PlayerAvatars.scss'; // Importer ton fichier de style

// Composant réutilisable pour afficher les avatars
const PlayerAvatars = ({ players }) => {
  return (
    <div className="player-avatars">
      {players.map((player, index) => (
        <Avatar
          key={index}
          sx={{
            bgcolor: player.color,
            fontSize: '1.2rem',
            width: 40,
            height: 40,
            marginRight: '8px',
          }}
        >
          {player.name?.[0].toUpperCase()}
        </Avatar>
      ))}
    </div>
  );
};

export default PlayerAvatars;
