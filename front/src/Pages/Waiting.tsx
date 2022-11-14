import React from 'react';

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
      <h1>Room Code: {lobbyID}</h1>
      <div className='score'>
        <h3>Session Score</h3>
        <p>{score}</p>
      </div>
      <div className='next'>
        <p>waiting for {player2 || 'another player'}</p>
      </div>
    </div>
  );
}
