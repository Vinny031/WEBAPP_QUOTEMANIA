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
            className="player-avatar-circle"
            style={{ backgroundColor: player.color }}
          >
            {player.name?.[0].toUpperCase()}
          </Avatar>
          <span className="player-score"> {player.score ?? 0}</span>
        </div>
      ))}
    </div>
  );
};

export default PlayerAvatars;