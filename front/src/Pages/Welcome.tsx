import Peer, { DataConnection } from 'peerjs';

import React, { useRef } from 'react';
import { createGame, joinGame } from '../Helpers/manageConnectivity';
import { generateRoomCode, generateUsername } from '../Helpers/welcomeHelpers';

export default function Welcome({
  lobbyID,
  player1,
  conn,
  peerRef,
  setConn,
  setGameStage,
  setLobbyID,
  setPlayer1,
}: {
  lobbyID: string;
  player1: string;
  conn: null | DataConnection;
  peerRef: React.MutableRefObject<Peer | null>;
  setConn: React.Dispatch<React.SetStateAction<DataConnection | null>>;
  setGameStage: React.Dispatch<React.SetStateAction<GameStages>>;
  setLobbyID: React.Dispatch<React.SetStateAction<string | null>>;
  setPlayer1: React.Dispatch<React.SetStateAction<string>>;
}) {
  const usernameRef = useRef<HTMLInputElement>(null);
  const RoomCodeRef = useRef<HTMLInputElement>(null);

  const createRoom = () => {
    const username = usernameRef.current?.value || player1;
    createGame(conn, peerRef, setConn, setGameStage);
    setPlayer1(username);
  };
  const joinRoom = () => {
    // To Add: Error messages (room id full and room does not exist)
    const roomCodeInput = RoomCodeRef.current?.value || '';
    const username = usernameRef.current?.value || player1;
    setPlayer1(username);
    joinGame(
      roomCodeInput,
      username,
      conn,
      peerRef,
      setConn,
      setGameStage,
      setLobbyID
    );
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
          placeholder={player1}
          ref={usernameRef}
          className='welcome-input username-input'
        />
      </div>

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
        <button onClick={joinRoom} className='create-join-btn'>
          Join
        </button>
        <div className='devider'>
          <span className='devider-text'>or</span>
          <div className='devide-line'></div>
        </div>
        {/* <span>create room: {lobbyID}</span> */}
        <button
          onClick={createRoom}
          className='create-join-btn'
          disabled={!lobbyID}
        >
          Create Room
        </button>
      </div>
    </div>
  );
}
