class ChannelUserMapping {
    id;
    channelId;
    userId;

  
    constructor({ channelId, userId, id }) {
      this.channelId = channelId;
      this.userId = userId;
      this.id = id;

    }
  }
  
  module.exports.ChannelUserMapping = ChannelUserMapping;