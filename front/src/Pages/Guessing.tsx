import React, { useRef } from 'react';
import CanvasDraw from 'react-canvas-draw';

export default function Guessing({
  word,
  player2,
  drawing,
}: {
  word: string;
  player2: string;
  drawing: string;
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
    </div>
  );
}
