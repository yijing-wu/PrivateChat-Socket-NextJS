import { useState, useEffect } from "react";

import io from "socket.io-client";

import styles from "./chat.module.css";
import MessagePanel from "./MessagePanel";
import User from "./User";

export default function Chat(props) {
  const [currentMsg, setCurrentMsg] = useState("");

  const [messages, setMessages] = useState([]);

  useEffect(() => {});

  return (
    <div>
      <div>
        {/* left panel: user List*/}
        <div className={styles.left_panel}>
          {props.username}
          <p>User List</p>
          <User />
        </div>
        {/* right panel: chat interface */}
        <MessagePanel />
      </div>
    </div>
  );
}
