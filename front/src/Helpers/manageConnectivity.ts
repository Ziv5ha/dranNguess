import Peer, { DataConnection } from 'peerjs';

export const createGame = (
  username: string,
  conn: null | DataConnection,
  setConn: React.Dispatch<React.SetStateAction<DataConnection | null>>,
  setGameStage: React.Dispatch<React.SetStateAction<GameStages>>,
  setLobbyID: React.Dispatch<React.SetStateAction<string | null>>,
  setPlayer2: React.Dispatch<React.SetStateAction<string>>
) => {
  // Create own peer object with connection to shared PeerJS server

  const lobbyID = `${Math.floor(Math.random() * 1000000000)}`;

  // const peer = new Peer(`draw-game-${lobbyID}`, {
  //   debug: 3,
  // });
  const peer = new Peer(`12112`, {
    debug: 3,
  });

  peer.on('open', (id) => {
    console.log('ID: ' + peer.id);
    setLobbyID(lobbyID);
    // setGameStage('waiting');
  });
  peer.on('connection', (c) => {
    alert('somebody loves you!');
    // Allow only a single connection
    if (conn && conn.open) {
      c.on('open', () => {
        c.send('Already connected to another client');
        setTimeout(() => {
          c.close();
        }, 500);
      });
      return;
    }

    const data = { type: 'username', data: username };
    c.send(data);
    console.log('Connected to: ' + c.peer);
    setConn(c);
    setGameStage('chooseWord');
    // Change Connectivity status
  });
  peer.on('disconnected', () => {
    // Change Connectivity status
    console.log('Connection lost. Please reconnect');
    peer.reconnect();
  });
  peer.on('close', () => {
    setConn(null);
    setGameStage('welcome');
    alert('Connection closed');
    // Change Connectivity status
    console.log('Connection destroyed');
  });
  peer.on('error', (err) => {
    console.log(err);
    alert('' + err);
  });
};

export const joinGame = (
  id: string,
  username: string,
  prevConn: null | DataConnection,
  setConn: React.Dispatch<React.SetStateAction<DataConnection | null>>,
  setGameStage: React.Dispatch<React.SetStateAction<GameStages>>,
  setLobbyID: React.Dispatch<React.SetStateAction<string | null>>,
  setPlayer2: React.Dispatch<React.SetStateAction<string>>
) => {
  if (prevConn) {
    prevConn.close();
  }

  const peer = new Peer('456215', { debug: 3 });

  // const conn = peer.connect(`draw-game-${id}`);
  const conn = peer.connect(`12112`);
  console.log(conn);
  conn.on('open', () => {
    console.log('Connected to: ' + conn.peer);
    const data = { type: 'username', data: username };
    conn.send(data);
    setLobbyID(id);
    setGameStage('waiting');
    setConn(conn);
  });

  conn.on('close', function () {
    setConn(null);
    alert('Connection closed');
    setGameStage('welcome');
  });

  conn.on('data', (data: any) => {
    switch (data.type) {
      case 'username':
        setPlayer2(data.data);
        break;

      default:
        console.log(data);

        break;
    }
  });
};
