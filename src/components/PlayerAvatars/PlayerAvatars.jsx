import React from 'react';
import { Avatar } from '@mui/material';
import './PlayerAvatars.scss';

const PlayerAvatars = ({ players, onPlayerClick }) => {
  return (
    <div className="player-avatars">
      {players.map((player, index) => (
        <div
          key={index}
          className="player-avatar"
          onClick={() => onPlayerClick(index)}
        >
          <Avatar
            sx={{
              bgcolor: player.color,
              fontSize: '1.2rem',
              width: 50,
              height: 50,
              cursor: 'pointer',
            }}
          >
            {player.name?.[0].toUpperCase()}
          </Avatar>
          <span className="player-score">Score : {player.score ?? 0}</span>
        </div>
      ))}
    </div>
  );
};

export default PlayerAvatars;
