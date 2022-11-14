import { DataConnection } from 'peerjs';
import React, { useEffect, useState } from 'react';
import { shuffleArray } from '../Helpers/GuessingHelpers';

export default function LettersBank({
  word,
  conn,
  setGameStage,
  setWord,
  setDrawing,
  setScore,
}: {
  word: string;
  conn: DataConnection | null;
  setGameStage: React.Dispatch<React.SetStateAction<GameStages>>;
  setWord: React.Dispatch<React.SetStateAction<string>>;
  setDrawing: React.Dispatch<React.SetStateAction<string>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}) {
  const abc = 'abcdefghijklmnopqrstuvwxyz';
  const [lettersBank, setLettersBank] = useState<string[]>([]);
  const [answer, setAnswer] = useState('');

  // Create letters buttons
  useEffect(() => {
    const bank = [] as string[];
    word.split('').forEach((char) => bank.push(char));
    while (bank.length < 12) {
      bank.push(abc[Math.floor(Math.random() * 26)]);
    }
    shuffleArray(bank);
    setLettersBank(bank);
  }, []);

  // Test win
  useEffect(() => {
    console.log(answer);

    if (word === answer) {
      let wordScore = 1;
      if (word.length > 4) wordScore += 2;
      if (word.length > 5) wordScore += 2;
      conn?.send({ type: 'score', score: wordScore });
      setScore((prev) => (prev += wordScore));
      setWord('');
      setDrawing('');
      setGameStage('chooseWord');
    }
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
    <button className='letter-btn' key={letter + i + 'answer'}>
      {letter}
    </button>
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
