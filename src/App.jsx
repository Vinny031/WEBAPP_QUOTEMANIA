import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header/Header';
import Banner from './components/Banner/Banner';
import QuestionCard from './components/QuestionCard/QuestionCard';
import CustomButton from './components/CustomButton/CustomButton';
import PlayerAvatars from './components/PlayerAvatars/PlayerAvatars';
import Podium from './components/Podium/Podium';
import Footer from './components/Footer/Footer';
import questionsData from '../public/data/questions.json';
import './App.scss';

const difficultyLevels = [
  { value: 1, name: '🟢 Facile' },
  { value: 2, name: '🟡 Moyenne' },
  { value: 3, name: '🟠 Difficile' },
  { value: 4, name: '🔴 Maître' },
  { value: 5, name: '🎲 Aléatoire' }
];

function App() {
  const [randomQuestion, setRandomQuestion] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [players, setPlayers] = useState([]);
  const [difficulty, setDifficulty] = useState(null);
  const [lastTheme, setLastTheme] = useState(null);

  useEffect(() => {
    const savedPlayers = JSON.parse(localStorage.getItem('players'));
    const savedDifficulty = localStorage.getItem('difficulty');
    const savedQuestion = JSON.parse(localStorage.getItem('randomQuestion'));

    if (savedPlayers) setPlayers(savedPlayers);
    if (savedDifficulty) setDifficulty(savedDifficulty);
    if (savedQuestion) setRandomQuestion(savedQuestion);
    else {
      setRandomQuestion(getRandomQuestion());
    }
  }, []);

  useEffect(() => {
    if (players.length > 0) {
      localStorage.setItem('players', JSON.stringify(players));
    }
    if (difficulty) {
      localStorage.setItem('difficulty', difficulty);
    }
    if (randomQuestion) {
      localStorage.setItem('randomQuestion', JSON.stringify(randomQuestion));
    }
  }, [players, difficulty, randomQuestion]);

  const difficultyName = difficulty 
    ? difficultyLevels.find(level => level.value === difficulty)?.name 
    : 'Non définie';

  const getRandomTheme = useCallback(() => {
    const availableThemes = questionsData.filter(theme => theme.theme !== lastTheme);
    const randomTheme = availableThemes[Math.floor(Math.random() * availableThemes.length)];
    setLastTheme(randomTheme.theme);
    return randomTheme;
  }, [lastTheme]);

  const getRandomQuestion = useCallback(() => {
    const randomTheme = getRandomTheme();
    const randomQuestion = randomTheme.questions[Math.floor(Math.random() * randomTheme.questions.length)];

    return {
      ...randomQuestion,
      theme: randomTheme.theme,
      couleur: randomTheme.couleur,
      img: randomTheme.img
    };
  }, [getRandomTheme]);

  const changeQuestion = () => {
    setFlipped(false);
    setTimeout(() => {
      const newQuestion = getRandomQuestion();
      setRandomQuestion(newQuestion);
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

  const handlePlayerPenalty = (index) => {
    setPlayers(prevPlayers =>
      prevPlayers.map((player, i) =>
        i === index
          ? { ...player, score: Math.max(0, player.score - 1) }
          : player
      )
    );
  };

  const resetGame = () => {
    setPlayers([]);
    setDifficulty(null);
    setLastTheme(null);
    localStorage.removeItem('players');
    localStorage.removeItem('difficulty');
    localStorage.removeItem('randomQuestion');
  };

  if (!randomQuestion) return <div>Chargement ...</div>;

  return (
    <div className="app">
      <Header
        onPlayersConfigured={handlePlayersConfigured}
        onSelectDifficulty={handleSelectDifficulty}
        players={players}
        difficulty={difficulty}
        resetGame={resetGame}
      />
      <Banner title="REMUE MÉNINGES" subtitle="Faites chauffer vos méninges !" />
      <section className="main-content">
        {(players.length === 0 || !difficulty) ? (
          <main className="game-warning">
            <p>⚠️ Veuillez configurer les joueurs et sélectionner une difficulté pour commencer la partie.</p>
          </main>
        ) : (
          <>
            <main className="question-card-container">
              <QuestionCard
                question={randomQuestion}
                flipped={flipped}
                setFlipped={setFlipped}
              />
              <CustomButton onClick={changeQuestion} label="Nouvelle question" />
              <Podium players={players} />
            </main>
            <aside className="game-info">
              <p>{difficultyName}</p>
              <PlayerAvatars
                players={players}
                onPlayerClick={handlePlayerClick}
                onPlayerPenalty={handlePlayerPenalty}
              />
            </aside>
          </>
        )}
      </section>
      <Footer />
    </div>
  );
}

export default App;