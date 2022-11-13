import React, { useState } from 'react';
import Drawing from './Pages/Drawing';
import Welcome from './Pages/Welcome';
import Peer, { DataConnection } from 'peerjs';
import Guessing from './Pages/Guessing';
import Waiting from './Pages/Waiting';
import ChooseWord from './Pages/ChooseWord';
import Tests from './Pages/tests';

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

  // return <Tests />;

  switch (gameStage) {
    case 'chooseWord':
      return <ChooseWord setWord={setWord} />;
    case 'draw':
      return <Drawing word={word} player2={player2} />;

    case 'guess':
      return <Guessing word={word} player2={player2} drawing={drawing} />;

    case 'waiting':
      return <Waiting lobbyID={lobbyID || ''} />;

    default:
      return (
        <Welcome
          conn={conn}
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
