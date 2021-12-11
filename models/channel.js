class Channel {
  id;
  name;

  constructor({ name, id }) {
    this.name = name;
    this.id = id;
  }
}

module.exports.Channel = Channel;