import { DataConnection } from 'peerjs';
import React, { useState, useRef } from 'react';
import CanvasDraw from 'react-canvas-draw';
import BrushSizePicker from '../Components/BrushSizePicker';
import ColorPickers from '../Components/ColorPickers';

export default function Drawing({
  word,
  player2,
  conn,
  setGameStage,
}: {
  word: string;
  player2: string;
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
        <div className='score'>{0}</div>
        <div className='description'>
          you are drawing {word.toUpperCase()}
          <br />
          for {player2}
        </div>
      </div>
      <div className='tools'>
        <button className='tool-btn' onClick={undoFunc}>
          undo
        </button>
        <button className='tool-btn' onClick={eraserFunc}>
          eraser
        </button>
        <button className='tool-btn' onClick={submitFunc}>
          submit
        </button>
      </div>
      <CanvasDraw
        ref={canvasRef}
        hideInterface={true}
        hideGrid={true}
        brushColor={brushColor}
        brushRadius={brushSize}
      />
      <ColorPickers setBrushColor={setBrushColor} />
      <BrushSizePicker brushSize={brushSize} setBrushSize={setBrushSize} />
    </div>
  );
}
