export default function User(props) {
  return (
    <div>
      {props.usersList ? (
        props.usersList.map((user, index) => {
          {
            if (user.userId != props.selfSocketId) {
              return (
                <button
                  style={{
                    backgroundColor:
                      props.selectedUser &&
                      user.userId === props.selectedUser.userId
                        ? "white"
                        : "gray",
                    width: "100%",
                  }}
                  key={index}
                  onClick={() => {
                    props.onSelectUser(user);
                  }}
                >
                  {user.username}
                </button>
              );
            }
          }
          <div style={{ backgroundColor: "gray" }}>temp</div>;
        })
      ) : (
        <div>no user</div>
      )}
    </div>
  );
}
