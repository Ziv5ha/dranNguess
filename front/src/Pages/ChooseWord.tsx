import React, { useState, useEffect } from 'react';
import { chooseWords } from '../Helpers/chooseWordHelprs';

export default function ChooseWord({
  setWord,
}: {
  setWord: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [wordsOptions, setWordsOptions] = useState({
    easy: '',
    medium: '',
    hard: '',
  });

  useEffect(() => {
    setWordsOptions(chooseWords());
  }, []);

  const chooseWordFunc = (word: string) => {
    setWord(word);
  };

  return (
    <div>
      <h1>Choose Word:</h1>
      <button
        className='easy-word-btn'
        onClick={() => chooseWordFunc(wordsOptions.easy)}
      >
        {wordsOptions.easy}
      </button>
      <button
        className='medium-word-btn'
        onClick={() => chooseWordFunc(wordsOptions.medium)}
      >
        {wordsOptions.medium}
      </button>
      <button
        className='hard-word-btn'
        onClick={() => chooseWordFunc(wordsOptions.hard)}
      >
        {wordsOptions.hard}
      </button>
    </div>
  );
}
