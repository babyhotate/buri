class Post {
  id;
  userId;
  message;

  constructor({ userId, message, id }) {
    this.userId = userId;
    this.message = message;
    this.id = id;
  }
}

module.exports.Post = Post;