import React from 'react';
import './Banner.scss';

const Banner = ({ title, subtitle }) => {
  return (
    <header className="banner">
      <div className="banner__content">
        <h1 className="banner__title">{title}</h1>
        {subtitle && <p className="banner__subtitle">{subtitle}</p>}
      </div>
    </header>
  );
};

export default Banner;