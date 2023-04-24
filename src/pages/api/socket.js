import { Server } from "socket.io";

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    console.log("Socket is already running");
    res.end();
    return;
  }
  console.log("Socket is initializing");
  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  // username
  io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    if (!username) {
      return next(new Error("invalid username"));
    }
    socket.username = username;
    next();
  });

  io.on("connection", (socket) => {
    // fetch existing users
    const users = getUsers();

    // notify the new user
    socket.emit("update-user-list", { users });

    // notify existing users
    socket.broadcast.emit("update-user-list", { users });

    // forward the private message to the right recipient
    socket.on("private-message", (to, content) => {
      socket.to(to).emit("private-message", socket.id, content);
    });

    // notify users upon disconnection
    socket.on("disconnect", () => {
      socket.broadcast.emit("user disconnected", socket.id);
    });
  });

  function getUsers() {
    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
      users.push({
        userId: id,
        username: socket.username,
      });
    }
    return users;
  }

  res.end();
}
