import Peer, { DataConnection } from 'peerjs';

export const createGame = (
  username: string,
  conn: null | DataConnection,
  peerRef: React.MutableRefObject<Peer | null>,
  setConn: React.Dispatch<React.SetStateAction<DataConnection | null>>,
  setGameStage: React.Dispatch<React.SetStateAction<GameStages>>,
  setLobbyID: React.Dispatch<React.SetStateAction<string | null>>,
  setPlayer2: React.Dispatch<React.SetStateAction<string>>
) => {
  if (peerRef.current) {
    const peer = peerRef.current;

    setGameStage('waiting');
    peer.on('connection', (c) => {
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
      console.error('Oh no');
      console.log(err);
    });

    peerRef.current = peer;
  }
};

export const joinGame = (
  id: string,
  username: string,
  prevConn: null | DataConnection,
  peerRef: React.MutableRefObject<Peer | null>,
  setConn: React.Dispatch<React.SetStateAction<DataConnection | null>>,
  setGameStage: React.Dispatch<React.SetStateAction<GameStages>>,
  setLobbyID: React.Dispatch<React.SetStateAction<string | null>>,
  setPlayer2: React.Dispatch<React.SetStateAction<string>>
) => {
  if (prevConn) {
    prevConn.close();
  }

  if (peerRef.current) {
    const peer = peerRef.current;
    const conn = peer.connect(`draw-game-${id}`);

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
      console.log(data);
      switch (data.type) {
        case 'username':
          setPlayer2(data.data);
          break;

        default:
          break;
      }
    });
    peerRef.current = peer;
  }
};

};
