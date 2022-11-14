import { DataConnection } from 'peerjs';
import React, { useState, useRef } from 'react';
import CanvasDraw from 'react-canvas-draw';
import BrushSizePicker from '../Components/BrushSizePicker';
import ColorPickers from '../Components/ColorPickers';
import '../styles/drawing.css';

export default function Drawing({
  word,
  player2,
  score,
  conn,
  setGameStage,
}: {
  word: string;
  player2: string;
  score: number;
  conn: DataConnection | null;
  setGameStage: React.Dispatch<React.SetStateAction<GameStages>>;
}) {
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(4);
  const canvasRef = useRef<CanvasDraw>(null);
  const undoFunc = () => {
    canvasRef.current?.undo();
  };
  const eraserFunc = () => {
    canvasRef.current?.clear();
  };
  const submitFunc = () => {
    const drawing = canvasRef.current?.getSaveData();
    conn?.send({ type: 'drawing', word, drawing });
    setGameStage('waiting');
  };
  return (
    <div className='view'>
      <div className='header'>
        <div className='score-number-header'>{score}</div>
        <div className='description'>
          you are drawing {word.toUpperCase()}
          <br />
          for {player2}
        </div>
      </div>
      <div className='game-tools'>
        <button className='tool-btn' onClick={undoFunc}>
          ↩
        </button>
        <button className='tool-btn' onClick={eraserFunc}>
          🗑
        </button>
        <button className='tool-btn' onClick={submitFunc}>
          ▶
        </button>
      </div>
      <div className='canvas'>
        <CanvasDraw
          ref={canvasRef}
          hideInterface={true}
          hideGrid={true}
          brushColor={brushColor}
          brushRadius={brushSize}
          canvasWidth={350}
          canvasHeight={400}
        />
      </div>
      <div className='tools'>
        <ColorPickers setBrushColor={setBrushColor} />
        <BrushSizePicker brushSize={brushSize} setBrushSize={setBrushSize} />
      </div>
    </div>
  );
}
