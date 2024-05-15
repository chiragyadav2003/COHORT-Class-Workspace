import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [latestServerMessages, setLatestServerMessages] = useState("");

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8080`);
    socket.onopen = () => {
      console.log("Connected");
      setSocket(socket);
    }
    socket.onmessage = (message) => {
      console.log('Received message : ', message.data);
      setLatestServerMessages(message.data)
    }
  }, [])

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
    </div>
  )
}

export default App
