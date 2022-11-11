import React from 'react';

export default function Welcome() {
  return (
    <div>
      <h1>Welcome to Draw N Guess</h1>

      <label htmlFor='usename'>please enter your username</label>
      <input id='usename' placeholder='Username' />

      <div>
        <label htmlFor='room-code-input'>Enter room code</label>
        <input id='room-code-input' type='number' />
        <button>Join</button>
        <div className='devider'>
          <div className='devide-line'></div>
          or
          <div className='devide-line'></div>
        </div>
        <button>Create Room</button>
      </div>
    </div>
  );
}
