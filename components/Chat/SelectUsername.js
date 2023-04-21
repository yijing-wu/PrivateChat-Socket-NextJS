import { useState } from "react";

import styles from "./chat.module.css";

export default function SelectUserName(props) {
  const [currentInput, setCurrentInput] = useState("");
  return (
    <div className={styles.select_username}>
      <div>
        <label>Username: </label>
        <input
          type="text"
          onChange={(e) => {
            setCurrentInput(e.target.value);
          }}
        />
        <button
          onClick={() => {
            console.log(currentInput);
            props.onSelectUsername(currentInput);
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
