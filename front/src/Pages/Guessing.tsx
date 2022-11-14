import { DataConnection } from 'peerjs';
import React, { useRef } from 'react';
import CanvasDraw from 'react-canvas-draw';
import LettersBank from '../Components/LettersBank';
import '../styles/guessing.css';

export default function Guessing({
  word,
  player2,
  drawing,
  score,
  conn,
  setGameStage,
  setWord,
  setDrawing,
  setScore,
}: {
  word: string;
  player2: string;
  drawing: string;
  score: number;
  conn: DataConnection | null;
  setGameStage: React.Dispatch<React.SetStateAction<GameStages>>;
  setWord: React.Dispatch<React.SetStateAction<string>>;
  setDrawing: React.Dispatch<React.SetStateAction<string>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div>
      <div className='header'>
        <div className='score-number-header'>{score}</div>
        <div className='description'>you are guessing {player2}'s drawing</div>
      </div>
      <div className='view'>
        <div className='canvas'>
          <CanvasDraw
            hideInterface={true}
            hideGrid={true}
            disabled={true}
            saveData={drawing}
            loadTimeOffset={7}
            canvasWidth={350}
            canvasHeight={400}
          />
        </div>
        <LettersBank
          word={word}
          setGameStage={setGameStage}
          conn={conn}
          setWord={setWord}
          setDrawing={setDrawing}
          setScore={setScore}
        />
      </div>
    </div>
  );
}
