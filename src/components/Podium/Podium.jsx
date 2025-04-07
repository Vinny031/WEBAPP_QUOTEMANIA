import React from 'react';
import './Podium.scss';

const Podium = ({ players }) => {
  // Trier les joueurs par score (décroissant) et prendre les 3 premiers
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score).slice(0, 3);

  return (
    <div className="podium">
      <h2>Podium 🏆</h2>
      {sortedPlayers.length > 0 ? (
        <ol className="podium-list">
          {sortedPlayers.map((player, index) => (
            <li key={index} className={`podium-item podium-item-${index + 1}`}>
              <span className="podium-rank">{index + 1}</span>
              <span className="podium-player">{player.name}</span>
              <span className="podium-score">{player.score} points</span>
            </li>
          ))}
        </ol>
      ) : (
        <p>Aucun joueur dans le podium.</p>
      )}
    </div>
  );
};

export default Podium;
