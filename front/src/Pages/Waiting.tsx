import React from 'react';

export default function Waiting({ lobbyID }: { lobbyID: string }) {
  return (
    <div>
      <h1>Room Code: {lobbyID}</h1>
      <div className='score'>
        <h3>Session Score</h3>
        <p>0</p>
      </div>
      <div className='next'>
        <p>{} turn</p>
        <button>Next</button>
      </div>
    </div>
  );
}
