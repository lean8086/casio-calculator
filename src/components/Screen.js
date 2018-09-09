import React from 'react';
import './Screen.css';

export default ({ value, disabled }) => (
  <section className="screen">
    <p className="screen__lcd">{disabled || value}</p>
  </section>
);
