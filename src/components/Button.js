import React from 'react';

export default ({
  modifier,
  value,
  label = value,
  type,
  onClick,
}) => (
  <button
    onClick={type ? () => onClick({ type, value }) : null}
    className={modifier || ''}
  >{label}</button>
);
