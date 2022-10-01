const BandList = require("./band-list");

class Sockets {
  constructor(io) {
    this.io = io;
    this.bandList = new BandList();
    this.socketEvents();
  }

  socketEvents() {
    this.io.on("connection", (socket) => {
      console.log("Client connected");
      socket.emit("current-bands", this.bandList.getBands());

      socket.on("new-vote", (data) => {
        this.bandList.increaseVotes(data.id);
        this.io.emit("current-bands", this.bandList.getBands());
      });

      socket.on("delete-band", ({ id }) => {
        this.bandList.removeBand(id);
        this.io.emit("current-bands", this.bandList.getBands());
      });

      socket.on("change-name", ({ id, name }) => {
        this.bandList.changeName(id, name);
        this.io.emit("current-bands", this.bandList.getBands());
      });

      socket.on("new-band", ({ name }) => {
        this.bandList.addBand(name);
        this.io.emit("current-bands", this.bandList.getBands());
      });
    });
  }
}

module.exports = Sockets;
