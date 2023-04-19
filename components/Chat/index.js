import { useState, useEffect } from "react";

import io from "socket.io-client";

import styles from "./chat.module.css";
import MessagePanel from "./MessagePanel";
import User from "./User";

export default function Chat(props) {
  const [username, setUsername] = useState("");
  const [currentMsg, setCurrentMsg] = useState("");

  const [messages, setMessages] = useState([]);

  const [user, setUsers] = useState([]);

  useEffect(() => {});

  return (
    <div>
      <h1>Chat</h1>
      <div>
        {/* left panel: user List*/}
        <div className={styles.left_panel}>
          <p>User List</p>
          <User />
        </div>
        {/* right panel: chat interface */}
        <MessagePanel />
      </div>
    </div>
  );
}
