class ChannelMapping {
    id;
    channel_id;
    user_id;

  
    constructor({ channel_id, user_id, id }) {
      this.channel_id = channel_id;
      this.user_id = user_id;
      this.id = id;

    }
  }
  
  module.exports.ChannelMapping = ChannelMapping;