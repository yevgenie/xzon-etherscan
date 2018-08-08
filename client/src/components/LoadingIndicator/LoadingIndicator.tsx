import * as React from 'react';
import './LoadingIndicator.css';

export const LoadingIndicator = () => {
  return (
    <div className='spinner'>
      <div className='double-bounce1' />
      <div className='double-bounce2' />
    </div>
  );
};
