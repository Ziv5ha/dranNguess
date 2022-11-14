import React from 'react';
import '../styles/waiting.css';

export default function Waiting({
  lobbyID,
  score,
  player2,
}: {
  lobbyID: string;
  score: number;
  player2: string;
}) {
  return (
    <div>
      <div className='header'>
        <h1>Room Code: {lobbyID}</h1>
      </div>
      <div className='view'>
        <div className='score'>
          <div className='score-header'>
            <h3>Session Score</h3>
            <h3>:</h3>
          </div>
          <span className='score-number'>{score}</span>
        </div>
        <div className='next'>
          <p>waiting for {player2 || 'another player'}</p>
          <div className='lds-ellipsis'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
