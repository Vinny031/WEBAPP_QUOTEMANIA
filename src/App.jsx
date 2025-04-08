import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import QuoteCard from './components/QuoteCard/QuoteCard';
import CustomButton from './components/CustomButton/CustomButton';
import PlayerAvatars from './components/PlayerAvatars/PlayerAvatars';
import Podium from './components/Podium/Podium';
import Footer from './components/Footer/Footer'
import quotesData from '../public/data/quotes.json';
import './App.scss';

const difficultyLevels = [
  { value: 1, name: '🟢 Facile' },
  { value: 2, name: '🟡 Moyenne' },
  { value: 3, name: '🟠 Difficile' },
  { value: 4, name: '🔴 Maître' },
  { value: 5, name: '🎲 Aléatoire' }
];

function App() {
  const [randomQuote, setRandomQuote] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [players, setPlayers] = useState([]);
  const [difficulty, setDifficulty] = useState(null);

  const difficultyName = difficulty 
    ? difficultyLevels.find(level => level.value === difficulty)?.name 
    : 'Non définie';

  const getRandomQuote = (currentQuote) => {
    let newQuote;
    do {
      newQuote = quotesData[Math.floor(Math.random() * quotesData.length)];
    } while (newQuote.citation === currentQuote?.citation);
    return newQuote;
  };

  const changeQuote = () => {
    setFlipped(false);
    const newQuote = getRandomQuote(randomQuote);
    setTimeout(() => {
      setRandomQuote(newQuote);
    }, 400);
  };

  const handlePlayersConfigured = (configuredPlayers) => {
    const playersWithScore = configuredPlayers.map(player => ({
      ...player,
      score: 0
    }));
    setPlayers(playersWithScore);
  };

  const handleSelectDifficulty = (newDifficulty) => {
    setDifficulty(newDifficulty);
  };

  const handlePlayerClick = (index) => {
    setPlayers(prevPlayers => 
      prevPlayers.map((player, i) => 
        i === index 
          ? { ...player, score: player.score + 1 } 
          : player
      )
    );
  };
  
  useEffect(() => {
    setRandomQuote(quotesData[Math.floor(Math.random() * quotesData.length)]);
  }, []);

  if (!randomQuote) return <div>Loading...</div>;

  return (
    <div className="app">
      <Header
        onPlayersConfigured={handlePlayersConfigured}
        onSelectDifficulty={handleSelectDifficulty}
        players={players}
        difficulty={difficulty}
      />
      <h1>QUOTE MANIA 🎬</h1>
      <section className="main-content">
        {(players.length === 0 || !difficulty) ? (
          <main className="game-warning">
            <p>⚠️ Veuillez configurer les joueurs et sélectionner une difficulté pour commencer la partie.</p>
          </main>
        ) : (
          <>
            <main className="quote-card-container">
              <QuoteCard quote={randomQuote} flipped={flipped} setFlipped={setFlipped} />
              <CustomButton onClick={changeQuote} label="Nouvelle citation" />
              <Podium players={players} />
            </main>
            <aside className="game-info">
              <p>{difficultyName}</p>
              <PlayerAvatars players={players} onPlayerClick={handlePlayerClick} />
            </aside>
          </>
        )}
      </section>
      <Footer />
    </div>
  );
  
}

export default App;
