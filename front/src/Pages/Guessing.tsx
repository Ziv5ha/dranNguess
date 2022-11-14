import { DataConnection } from 'peerjs';
import React, { useRef } from 'react';
import CanvasDraw from 'react-canvas-draw';
import LettersBank from '../Components/LettersBank';

export default function Guessing({
  word,
  player2,
  drawing,
  conn,
  setGameStage,
  setWord,
  setDrawing,
  setScore,
}: {
  word: string;
  player2: string;
  drawing: string;
  conn: DataConnection | null;
  setGameStage: React.Dispatch<React.SetStateAction<GameStages>>;
  setWord: React.Dispatch<React.SetStateAction<string>>;
  setDrawing: React.Dispatch<React.SetStateAction<string>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div>
      <div className='header'>
        <div className='score'>{0}</div>
        <div className='description'>you are guessing {player2}'s drawing</div>
      </div>
      <CanvasDraw
        hideInterface={true}
        hideGrid={true}
        disabled={true}
        saveData={drawing}
        loadTimeOffset={10}
      />
      <LettersBank
        word={word}
        setGameStage={setGameStage}
        conn={conn}
        setWord={setWord}
        setDrawing={setDrawing}
        setScore={setScore}
      />
      ;
    </div>
  );
}
