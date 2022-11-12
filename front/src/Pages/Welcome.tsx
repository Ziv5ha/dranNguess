import React, { useRef } from 'react';
import { generateRoomCode } from '../Helpers/welcomeHelpers';

export default function Welcome() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const RoomCodeRef = useRef<HTMLInputElement>(null);

  const createRoom = () => {
    // To Add: create Peer Connection
    const roomCode = generateRoomCode();
  };
  const joinRoom = () => {
    // To Add: join existing peer connection
    // To Add: Error messages (room id full and room does not exist)
    const roomCodeInput = RoomCodeRef.current?.value;
  };
  return (
    <div>
      <h1>Welcome to Draw N Guess</h1>

      <label htmlFor='usename'>please enter your username</label>
      <input id='usename' placeholder='Username' ref={usernameRef} />

      <div>
        <label htmlFor='room-code-input'>Enter room code</label>
        <input id='room-code-input' type='number' ref={RoomCodeRef} />
        <button onClick={joinRoom}>Join</button>
        <div className='devider'>
          <div className='devide-line'></div>
          or
          <div className='devide-line'></div>
          <button onClick={createRoom}>Create Room</button>
        </div>
      </div>
    </div>
  );
}
