import './QuoteCard.scss';
import {useEffect } from 'react';

const QuoteCard = ({ quote, flipped, setFlipped }) => {

  const handleClick = () => {
    setFlipped(!flipped);  // Change l'état du flip lorsqu'on clique
  };

  useEffect(() => {
    setFlipped(false);  // Réinitialise le flip au chargement de la citation
  }, [quote, setFlipped]);  // Réinitialise le flip chaque fois que la citation change

  return (
    <div className={`quote-card ${flipped ? 'flipped' : ''}`} onClick={handleClick}>
      <div className="quote-card-inner">
        {/* Partie avant de la carte */}
        <div className="quote-card-face quote-card-front">
          <p>“{quote.citation}”</p>
        </div>

        {/* Partie arrière de la carte */}
        <div className="quote-card-face quote-card-back">
          <h3>{quote.film}</h3>
          <p>{quote.personnage}</p>
          <span>{quote.annee}</span>
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
