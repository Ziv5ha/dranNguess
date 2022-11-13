import React, { useState, useEffect } from 'react';
import randomWord from 'random-words';

export default function ChooseWord({
  setWord,
}: {
  setWord: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [wordOptions, setWordOptions] = useState({
    easy: '',
    medium: '',
    hard: '',
  });
  useEffect(() => {
    let easy = '';
    let medium = '';
    let hard = '';
    while (
      !(easy.length === 3 || easy.length === 4) &&
      medium.length !== 5 &&
      hard.length < 6
    ) {
      const [word] = randomWord(1);
      if ((word.length === 3 || word.length === 4) && !easy) easy = word;
      if (word.length === 5 && !medium) medium = word;
      if (word.length >= 6 && !hard) hard = word;
    }
    setWordOptions({ easy, medium, hard });
  }, []);

  const chooseWordFunc = (word: string) => {
    setWord(word);
  };

  return (
    <div>
      <h1>Choose Word:</h1>
      <button
        className='easy-word-btn'
        onClick={() => chooseWordFunc(wordOptions.easy)}
      >
        {wordOptions.easy}
      </button>
      <button
        className='medium-word-btn'
        onClick={() => chooseWordFunc(wordOptions.medium)}
      >
        {wordOptions.medium}
      </button>
      <button
        className='hard-word-btn'
        onClick={() => chooseWordFunc(wordOptions.hard)}
      >
        {wordOptions.hard}
      </button>
    </div>
  );
}
