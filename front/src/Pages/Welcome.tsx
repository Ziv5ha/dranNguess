import Peer, { DataConnection } from 'peerjs';

import React, { useRef } from 'react';
import { generateRoomCode, generateUsername } from '../Helpers/welcomeHelpers';

export default function Welcome({
  conn,
  setConn,
  setGameStage,
  setLobbyID,
  setPlayer1,
  setPlayer2,
}: {
  conn: null | DataConnection;
  setConn: React.Dispatch<React.SetStateAction<DataConnection | null>>;
  setGameStage: React.Dispatch<React.SetStateAction<GameStages>>;
  setLobbyID: React.Dispatch<React.SetStateAction<string | null>>;
  setPlayer1: React.Dispatch<React.SetStateAction<string>>;
  setPlayer2: React.Dispatch<React.SetStateAction<string>>;
}) {
  const usernameRef = useRef<HTMLInputElement>(null);
  const RoomCodeRef = useRef<HTMLInputElement>(null);

  const createRoom = () => {
    // To Add: create Peer Connection
    const username = usernameRef.current?.value || generateUsername();
    setPlayer1(username);
  };
  const joinRoom = () => {
    // To Add: join existing peer connection
    // To Add: Error messages (room id full and room does not exist)
    const roomCodeInput = RoomCodeRef.current?.value || '';
    const username = usernameRef.current?.value || generateUsername();
    console.log('connnecting...');

  };
  return (
    <div className='view'>
      <div className='header'>
        <h1>Welcome to Draw N Guess</h1>
      </div>
      <div className='username-div'>
        <label htmlFor='usename'>please enter your username:</label>
        <input
          id='usename'
          placeholder='Username'
          ref={usernameRef}
          className='welcome-input username-input'
        />
      </div>

      <div>
        <label htmlFor='room-code-input'>Enter room code</label>
        <input id='room-code-input' type='number' ref={RoomCodeRef} />
      <div className='create-join'>
        <div className='join'>
          <label htmlFor='room-code-input'>Enter room code:</label>
          <input
            id='room-code-input'
            type='number'
            className='welcome-input'
            ref={RoomCodeRef}
          />
        </div>
        <div className='devider'>
          <span className='devider-text'>or</span>
          <div className='devide-line'></div>
          <button onClick={createRoom}>Create Room</button>
          {/* <div className='devide-line'></div> */}
        </div>
      </div>
    </div>
  );
}
