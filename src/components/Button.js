import React from 'react';
import './Button.css';

export default ({
  size,
  value,
  label = value,
  type,
  onClick,
}) => (
  <button
    onClick={() => onClick({ type, value })}
    className={`button button--${type}${size ? ` button--${size}` : ''}`}
  >{label}</button>
);
