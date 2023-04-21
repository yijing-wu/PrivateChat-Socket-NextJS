import { useEffect, useState } from "react";
import io from "socket.io-client";

export default function Home() {
  const [socket_state, setSocket_state] = useState("try connecting...");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    fetch("api/socket");
    setSocket(io());
  }, []);

  if (socket) {
    socket.on("connect", () => {
      console.log("connected successfully", socket.id);
      setSocket_state("connected successfully 👍");
    });
  }
  return (
    <>
      <div>
        <h1>socket state: {socket_state}</h1>
      </div>
    </>
  );
}
