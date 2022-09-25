class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents()
  }

  socketEvents() {
    this.io.on("connection", (socket) => {
      console.log("Client is connected, with id:" + socket.id);
      socket.emit("welcome-message", {
        message: "Welcome to the server",
        date: new Date(),
      });

      socket.on("client-message", (data) => {
        console.log("Message received: ", data);
      });
      socket.on("chat-message-fe", (data) => {
        console.log("Message received from chat: ", data);
        this.io.emit("chat-message-bk", data);
      });
    });
  }
}

module.exports = Sockets;
