import './QuestionCard.scss';
import { useEffect } from 'react';

const QuestionCard = ({ question, flipped, setFlipped }) => {
  const handleClick = () => {
    setFlipped(!flipped);
  };

  useEffect(() => {
    setFlipped(false);
  }, [question, setFlipped]);

  return (
<div className={`question-card ${flipped ? 'flipped' : ''}`} onClick={handleClick}>
  <div className="question-card-inner">
    {/* Partie avant de la carte - Question */}
    <div className="question-card-face question-card-front">
      <div
        className="question-card-theme-tag"
        style={{ backgroundColor: mapColor(question.couleur) }}
      >
        {question.theme}
      </div>
      <p>{question.question}</p>
    </div>

    {/* Partie arrière de la carte - Réponse */}
    <div
      className="question-card-face question-card-back"
      style={{
        backgroundImage: `url(${question.img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <p>{question.reponse}</p>
    </div>
  </div>
</div>

  );
};

// Fonction utilitaire pour convertir un nom de couleur en vrai code couleur CSS
const mapColor = (couleur) => {
  switch (couleur?.toLowerCase()) {
    case 'bleu':
      return '#4a90e2';
    case 'rose':
      return '#ff69b4';
    case 'vert':
      return '#2ecc71';
    case 'jaune':
      return '#f1c40f';
    case 'violet':
      return '#9b59b6';
    case 'orange':
      return '#e67e22';
    case 'rouge':
      return '#e74c3c';
    default:
      return '#f4f4f4';
  }
};

export default QuestionCard;