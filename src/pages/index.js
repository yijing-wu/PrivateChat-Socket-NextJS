import { useContext, useEffect, useState } from "react";

import Head from "next/head";

import Chat from "../../components/Chat";
import SelectUserName from "../../components/Chat/SelectUsername";

import { SocketContext } from "@/utilis/SocketContext";

export default function Home() {
  const [selfUsername, setSelfUsername] = useState("");
  const [selfSocketId, setSelfSocketId] = useState();

  const [usersList, setUsersList] = useState();

  const [selectedUser, setSelectedUser] = useState();

  const [messagesMap, setMessagesMap] = useState(new Map());

  const socket = useContext(SocketContext);

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket");

    socket.on("connect", () => {
      console.log("connected successfully", socket.id);
      setSelfSocketId(socket.id);
    });

    socket.on("update-user-list", (users) => {
      if (users.users) {
        setUsersList(users.users);
      }
    });

    socket.on("private-message", (from, content) => {
      if (!messagesMap.has(from)) {
        setMessagesMap(messagesMap.set(from, []));
      }
      const newMessages = messagesMap.get(from);
      newMessages.push({
        content,
        fromSelf: false,
      });
      setMessagesMap(messagesMap.set(from, newMessages));
    });
  };

  function handleSelectUsername(username) {
    setSelfUsername(username);

    if (socket) {
      socket.auth = { username };
      socket.connect();
    }
  }

  function sendMessage(content) {
    if (socket) {
      socket.emit("private-message", selectedUser.userId, content);
    }
    if (!messagesMap.has(selectedUser.userId)) {
      setMessagesMap(messagesMap.set(selectedUser.userId, []));
    }
    const newMessages = messagesMap.get(selectedUser.userId);
    newMessages.push({
      content,
      fromSelf: true,
    });
    setMessagesMap(messagesMap.set(selectedUser.userId, newMessages));
  }

  return (
    <>
      <Head>
        <title>Chat App</title>
      </Head>
      <main>
        {selfUsername ? (
          <Chat
            selfUsername={selfUsername}
            selfSocketId={selfSocketId}
            usersList={usersList}
            selectedUser={selectedUser}
            onSelectUser={(user) => {
              console.log("select user: " + user);
              setSelectedUser(user);
            }}
            sendMessage={sendMessage}
            messagesMap={messagesMap}
          />
        ) : (
          <SelectUserName onSelectUsername={handleSelectUsername} />
        )}
      </main>
    </>
  );
}
