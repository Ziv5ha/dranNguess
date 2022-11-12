import React, { useEffect, useState } from 'react';
import { shuffleArray } from '../Helpers/GuessingHelpers';

export default function LettersBank({ word }: { word: string }) {
  const abc = 'abcdefghijklmnopqrstuvwxyz';
  const [lettersBank, setLettersBank] = useState<string[]>([]);
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    const bank = [] as string[];
    word.split('').forEach((char) => bank.push(char));
    while (bank.length < 12) {
      bank.push(abc[Math.floor(Math.random()) * 26]);
    }
    shuffleArray(bank);
    setLettersBank(bank);
  }, []);
  useEffect(() => {
    if (word === answer) console.log('Win!');
  }, [answer]);

  const addLetterToAnswer = (letter: string, i: number) => {
    setLettersBank((prev) => {
      const copy = [...prev];
      copy[i] = '_';
      return copy;
    });
    setAnswer((prev) => (prev += letter));
  };
  const RemoveLetterFromAnswer = () => {
    if (answer) {
      setLettersBank((prev) => {
        const copy = [...prev];
        copy[copy.indexOf('_')] = answer.slice(-1);
        return copy;
      });
      setAnswer((prev) => prev.slice(0, -1));
    }
  };

  const lettersBankElems = lettersBank.map((letter, i) =>
    letter === '_' ? (
      <span className='invisble'></span>
    ) : (
      <button
        className='letter-btn'
        key={letter + i}
        onClick={() => {
          addLetterToAnswer(letter, i);
        }}
      >
        {letter}
      </button>
    )
  );
  const answerLettersElems = answer.split('').map((letter, i) => (
    <span className='letter-btn' key={letter + i + 'answer'}>
      {letter}
    </span>
  ));

  return (
    <div className='lettes-btns'>
      <div className='answer' onClick={RemoveLetterFromAnswer}>
        {answerLettersElems}
      </div>
      <div className='bank'>{lettersBankElems}</div>
    </div>
  );
}
