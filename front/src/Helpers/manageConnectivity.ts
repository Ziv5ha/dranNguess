import Peer, { DataConnection } from 'peerjs';

export const createGame = (
  conn: null | DataConnection,
  peerRef: React.MutableRefObject<Peer | null>,
  setConn: React.Dispatch<React.SetStateAction<DataConnection | null>>,
  setGameStage: React.Dispatch<React.SetStateAction<GameStages>>
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
  setLobbyID: React.Dispatch<React.SetStateAction<string | null>>
) => {
  if (prevConn) {
    prevConn.close();
  }

  if (peerRef.current) {
    const peer = peerRef.current;
    const conn = peer.connect(`draw-game-${id}`);

    conn.on('open', () => {
      console.log('Connected to: ' + conn.peer);
      const data = { type: 'username', username };
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

    peerRef.current = peer;
  }
};

export const manageDataFlow = (
  data: any,
  setPlayer2: React.Dispatch<React.SetStateAction<string>>,
  setScore: React.Dispatch<React.SetStateAction<number>>,
  setWord: React.Dispatch<React.SetStateAction<string>>,
  setDrawing: React.Dispatch<React.SetStateAction<string>>
) => {
  switch (data.type) {
    case 'username':
      setPlayer2(data.username);
      break;
    case 'drawing':
      setWord(data.word);
      setDrawing(data.drawing);
      break;
    case 'score':
      setScore((prev) => (prev += data.score));
      setDrawing('');
      setWord('');
      break;
    default:
      console.log(data);
      break;
  }
};
