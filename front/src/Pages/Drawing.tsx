import React, { useState } from 'react';
import CanvasDraw from 'react-canvas-draw';
import ColorPickers from '../Components/ColorPickers';

export default function Drawing({
  word,
  player2,
}: {
  word: string;
  player2: string;
}) {
  const [brushColor, setBrushColor] = useState('#000000');
  return (
    <div>
      <div className='header'>
        <div className='score'>{0}</div>
        <div className='description'>
          you are drawing {word.toUpperCase()}
          <br />
          for {player2}
        </div>
      </div>
      <CanvasDraw
        brushColor={brushColor}
        hideInterface={true}
        hideGrid={true}
      />
      <ColorPickers setBrushColor={setBrushColor} />
    </div>
  );
}
