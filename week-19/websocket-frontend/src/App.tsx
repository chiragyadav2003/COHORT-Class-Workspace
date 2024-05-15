import { useEffect, useState } from 'react'
import './App.css'

//creating custom hook for socket connection
function useSocket() {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8080`);
    socket.onopen = () => {
      console.log("Connected");
      setSocket(socket);
    }

    return () => {
      socket.close();
    }
  }, [])

  return socket;
}


function App() {

  const socket = useSocket();

  const [latestServerMessages, setLatestServerMessages] = useState("");
  const [clientMessage, setClientMessage] = useState("");

  useEffect(() => {
    socket?.addEventListener('message', (event) => {
      console.log('@@@@@Received message : ', event.data);
      setLatestServerMessages(event.data);
    });
  }, [socket])



  if (!socket) {
    return (
      <div>
        Connecting to socket server.....
      </div>
    )
  }

  return (
    <div>
      Hi, from WebSocket.
      <br />
      Latest message -{latestServerMessages}
      <br />
      <br />
      <br />
      For client message:
      <p >
        <input type="text" onChange={(e) => setClientMessage(e.target.value)} />
        <button
          type='submit'
          onClick={() => { socket.send(clientMessage) }}
        >
          Send
        </button>
      </p>
      CLient latest message sent - {clientMessage}
    </div>
  )
}

export default App
