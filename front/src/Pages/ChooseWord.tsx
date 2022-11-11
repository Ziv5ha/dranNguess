import React from 'react';

export default function ChooseWord() {
  return (
    <div>
      <h1>Choose Word:</h1>
      <a href={`/draw/$`} className='easy-word-btn'>
        Easy
      </a>
      <a href={`/draw/$`} className='medium-word-btn'>
        Medium
      </a>
      <a href={`/draw/$`} className='hard-word-btn'>
        Hard
      </a>
    </div>
  );
}
