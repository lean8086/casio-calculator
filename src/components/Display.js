import React from 'react';

export default ({ value, disabled }) => (
  <section>
    <p>{disabled || value}</p>
  </section>
);
