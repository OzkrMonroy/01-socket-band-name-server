const Band = require("./band");

class BandList {
  constructor() {
    this.bandList = [
      new Band("Maneskin"),
      new Band("Ultimo"),
      new Band("Sonata Artica"),
      new Band("Pinguino Nucleari"),
    ];
  }

  addBand(name) {
    const newBand = new Band(name);
    this.bandList.push(newBand);
    return this.bandList;
  }

  removeBand(bandId) {
    this.bandList = this.bandList.filter((band) => band.id !== bandId);
  }

  increaseVotes(bandId) {
    this.bandList = this.bandList.map((band) => {
      if (band === bandId) {
        band.votes += 1;
      }
      return band;
    });
  }
  changeName(bandId, newName) {
    this.bandList = this.bandList.map((band) => {
      if (band === bandId) {
        band.name = newName;
      }
      return band;
    });
  }

  getBands() {
    return this.bandList;
  }
}

module.exports = BandList;
