import React from 'react';
import Logo from './Logo';
import './Header.css';

export default () => (
  <header className="header" role="banner">
    <Logo className="header__logo"/>
    <div className="header__panel"></div>
  </header>
);
