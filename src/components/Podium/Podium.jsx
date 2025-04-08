import React from 'react';
import './Podium.scss';

const Podium = ({ players }) => {
  const topPlayers = [...players]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  // Regroupement des joueurs ayant le même score
  const groupedPlayers = [];
  topPlayers.forEach((player) => {
    const sameScoreGroup = topPlayers.filter(p => p.score === player.score);
    if (!groupedPlayers.some(group => group.score === player.score)) {
      groupedPlayers.push({
        score: player.score,
        players: sameScoreGroup.map(p => p.name).join('/'),
      });
    }
  });

  return (
    <div className="podium">
      <h2>Podium 🏆</h2>
      {groupedPlayers.length > 0 ? (
        <div className="podium-table">
          <div className="podium-row podium-header">
            <div className="podium-cell">🏅</div>
            <div className="podium-cell">Pseudo</div>
            <div className="podium-cell">Score</div>
          </div>
          {groupedPlayers.map((group, index) => (
            <div key={index} className="podium-row">
              <div className={`podium-cell rank rank-${index + 1}`}>{index + 1}</div>
              <div className="podium-cell">{group.players}</div>
              <div className="podium-cell">{group.score}</div>
            </div>
          ))}
        </div>
      ) : (
        <p>Aucun joueur dans le podium.</p>
      )}
    </div>
  );
};

export default Podium;
