const express = require("express");
const cors = require("cors")
const http = require("http");
const socketio = require("socket.io");
const path = require('path');
const Sockets = require("./sockets");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = http.createServer(this.app);
    this.io = socketio(this.server);
  }

  execute() {
    this.middlewares()
    this.socketSetup()
    this.server.listen(this.port, () => {
      console.log("Server running in port: " + this.port);
    });
  }

  middlewares(){
    this.app.use(express.static(path.resolve(__dirname, '../public')))
    this.app.use(cors())
  }

  socketSetup(){
    new Sockets(this.io)
  }
}

module.exports = Server;
