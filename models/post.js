class Post {
  userId;
  message;

  constructor(userId, message) {
    this.userId = userId;
    this.message = message;
  }
}

module.exports.Post = Post;