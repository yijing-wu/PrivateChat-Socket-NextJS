import { useEffect, useState } from "react";

import Head from "next/head";

import styles from "@/styles/Home.module.css";
import Chat from "../../components/Chat";
import SelectUserName from "../../components/Chat/SelectUsername";

import io from "socket.io-client";

export default function Home() {
  const [socket_state, setSocket_state] = useState("try connecting...");

  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);

  const [input, setInput] = useState("");

  let socket = io();

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket");

    socket.on("connect", () => {
      console.log("connected successfully", socket.id);
      setSocket_state("connected successfully 👍");
    });

    socket.on("update-input", (msg) => {
      setInput(msg);
    });
  };

  const onChangeHandler = (e) => {
    setInput(e.target.value);
    console.log("input-change: " + e.target.value);
    socket.emit("input-change", e.target.value);
  };

  return (
    <>
      <Head>
        <title>Chat App</title>
      </Head>
      <main>
        <div>
          <h1>socket state: {socket_state}</h1>
        </div>
        <input
          placeholder="Type something"
          value={input}
          onChange={onChangeHandler}
        />
        <p>{input}</p>
        {/* <Chat />
        {username ? (
          <Chat username={username} />
        ) : (
          <SelectUserName onSelectUsername={handleSelectUsername} />
        )} */}
      </main>
    </>
  );
}
