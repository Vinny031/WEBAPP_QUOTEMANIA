import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import QuoteCard from './components/QuoteCard/QuoteCard';
import CustomButton from './components/CustomButton/CustomButton';
import quotesData from '../public/data/quotes.json';
import './App.scss';

function App() {
  const [randomQuote, setRandomQuote] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [players, setPlayers] = useState([]);
  const [difficulty, setDifficulty] = useState("Facile");

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
    setPlayers(configuredPlayers);
  };

  const handleSelectDifficulty = () => {
    const selectedDifficulty = prompt("Choisissez la difficulté : Facile, Moyen, Difficile");
    if (selectedDifficulty && ["Facile", "Moyen", "Difficile"].includes(selectedDifficulty)) {
      setDifficulty(selectedDifficulty);
    } else {
      alert("Veuillez choisir une difficulté valide.");
    }
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
      />
      <h1>Citation Mystère 🎬</h1>
      <QuoteCard quote={randomQuote} flipped={flipped} setFlipped={setFlipped} />
      <CustomButton onClick={changeQuote} label="Nouvelle citation" />
      <div className="game-info">
        <p>Joueur·euse·s : {players.length}</p>
        <ul>
          {players.map((p, i) => (
            <li key={i} style={{ color: p.color }}>
              {p.name || `Joueur·euse ${i + 1}`}
            </li>
          ))}
        </ul>
        <p>Difficulté : {difficulty}</p>
      </div>
    </div>
  );
}

export default App;