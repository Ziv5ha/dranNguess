import React, { useState, useRef, useEffect } from 'react';
import Drawing from './Pages/Drawing';
import Welcome from './Pages/Welcome';
import Peer, { DataConnection } from 'peerjs';
import Guessing from './Pages/Guessing';
import Waiting from './Pages/Waiting';
import ChooseWord from './Pages/ChooseWord';
import './styles/global.css';
import { manageDataFlow } from './Helpers/manageConnectivity';

function App() {
  const [gameStage, setGameStage] = useState<GameStages>('welcome');
  const [lobbyID, setLobbyID] = useState<null | string>(null);
  const [conn, setConn] = useState<null | DataConnection>(null);
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [score, setScore] = useState(0);
  const [turn, setTurn] = useState(player1);
  const [word, setWord] = useState('');
  const [drawing, setDrawing] = useState('');
  const peerRef = useRef<null | Peer>(null);

  useEffect(() => {
    const lobbyID = `${Math.floor(Math.random() * 1000000000)}`;
    const myPeer = new Peer(`draw-game-${lobbyID}`, {
      debug: 3,
    });
    myPeer.on('open', (id) => {
      setLobbyID(lobbyID);
    });
    myPeer.on('connection', (conn) => {
      alert('aha');
      setConn(conn);
    });
    peerRef.current = myPeer;
    return () => {
      myPeer.destroy();
      peerRef.current = null;
    };
  }, []);
  useEffect(() => {
    if (conn) {
      console.log('registered for data');
      conn.on('data', (data) => {
        manageDataFlow(data, setPlayer2, setScore, setWord, setDrawing);
      });
    }
  }, [conn]);
  useEffect(() => {
    if (player2) {
      const data = { type: 'username', username: player1 };
      conn?.send(data);
    }
  }, [player2]);

  useEffect(() => {
    if (drawing) {
      setGameStage('guess');
    }
    if (word && !drawing) {
      setGameStage('draw');
    }
  }, [word, drawing]);

  switch (gameStage) {
    case 'chooseWord':
      return <ChooseWord setWord={setWord} />;
    case 'draw':
      return (
        <Drawing
          word={word}
          player2={player2}
          score={score}
          conn={conn}
          setGameStage={setGameStage}
        />
      );

    case 'guess':
      return (
        <Guessing
          word={word}
          player2={player2}
          drawing={drawing}
          conn={conn}
          setGameStage={setGameStage}
          setWord={setWord}
          setDrawing={setDrawing}
          setScore={setScore}
        />
      );

    case 'waiting':
      return (
        <Waiting lobbyID={lobbyID || ''} score={score} player2={player2} />
      );

    default:
      return (
        <Welcome
          lobbyID={lobbyID || ''}
          conn={conn}
          peerRef={peerRef}
          setConn={setConn}
          setGameStage={setGameStage}
          setLobbyID={setLobbyID}
          setPlayer1={setPlayer1}
          setPlayer2={setPlayer2}
        />
      );
  }
}

export default App;
