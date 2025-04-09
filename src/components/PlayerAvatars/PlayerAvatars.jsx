import React from 'react';
import { Avatar } from '@mui/material';
import './PlayerAvatars.scss';

const PlayerAvatars = ({ players, onPlayerClick, onPlayerPenalty }) => {
  return (
    <div className="player-avatars">
      {players.map((player, index) => (
        <div
          key={index}
          className="player-avatar"
        >
          <Avatar
            className="player-avatar-circle"
            style={{ backgroundColor: player.color }}
            onClick={() => onPlayerClick(index)}
          >
            {player.name?.[0].toUpperCase()}
          </Avatar>
          <span className="player-score">{player.score ?? 0}</span>
          <button
            className="penalty-button"
            onClick={() => onPlayerPenalty(index)}
          >
            -
          </button>
        </div>
      ))}
    </div>
  );
};

export default PlayerAvatars;