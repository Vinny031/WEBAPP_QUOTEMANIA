import React from 'react';
import { GitHub, InfoOutlined } from '@mui/icons-material';
import './Footer.scss';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <p>© {year} Quote Mania — Tous droits réservés</p>
      <div className="footer-icons">
        <a href="https://github.com/Vinny031/WEBAPP_QUOTEMANIA" target="_blank" rel="noopener noreferrer" aria-label="Lien vers GitHub">
          <GitHub className="footer-icon" />
        </a>
        <a href="#about" aria-label="À propos">
          <InfoOutlined className="footer-icon" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
