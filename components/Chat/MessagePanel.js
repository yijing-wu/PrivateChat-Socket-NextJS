import styles from "./chat.module.css";

export default function MessagePanel() {
  return (
    <div className={styles.right_panel}>
      <h1> Message</h1>
      <div>
        <p>User: </p>
      </div>
      <div className="message">
        <p>Message</p>
      </div>
      <div>
        <input type="text" onChange={(e) => {}} />
        <button onClick={() => {}}>Send</button>
      </div>
    </div>
  );
}
