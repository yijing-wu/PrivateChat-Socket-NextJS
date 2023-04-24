import { useEffect, useState } from "react";

import styles from "./chat.module.css";

export default function MessagePanel(props) {
  const [input, setInput] = useState("");
  const [currentMsg, setCurrentMsg] = useState([]);

  useEffect(() => {
    if (props.selectedUser) {
      setCurrentMsg(props.messagesMap.get(props.selectedUser.userId));
    }
  }, [props.selectedUser, props.messagesMap, currentMsg]);

  return (
    <div className={styles.right_panel}>
      <h1> Message</h1>
      <div>
        <p>User: {props.selectedUser ? props.selectedUser.username : null}</p>
      </div>
      <div className="message">
        <p>Message</p>
        {currentMsg
          ? currentMsg.map((msg, index) => {
              return (
                <div key={index}>
                  <p>
                    {msg.fromSelf ? "You" : props.selectedUser.username}:
                    {msg.content}
                  </p>
                </div>
              );
            })
          : null}
      </div>
      {props.selectedUser ? (
        <>
          <div>
            <input
              type="text"
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <button
              onClick={() => {
                props.sendMessage(input);
              }}
            >
              Send
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}
