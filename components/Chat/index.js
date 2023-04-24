import styles from "./chat.module.css";
import MessagePanel from "./MessagePanel";
import User from "./User";

export default function Chat(props) {
  return (
    <div>
      <div>
        {/* left panel: user List*/}
        <div className={styles.left_panel}>
          {props.selfUsername}
          <p>User List</p>
          <User
            selfUsername={props.selfUsername}
            selfSocketId={props.selfSocketId}
            selectedUser={props.selectedUser}
            usersList={props.usersList}
            onSelectUser={props.onSelectUser}
          />
        </div>
        {/* right panel: chat interface */}
        <MessagePanel
          selectedUser={props.selectedUser}
          usersList={props.usersList}
          sendMessage={props.sendMessage}
          messagesMap={props.messagesMap}
        />
      </div>
    </div>
  );
}
