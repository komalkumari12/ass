const mongoose = require("mongoose");

const post = mongoose.Schema({
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  caption: {
    type: String,
    required: true,
  },
  media: {
    type: String,
    required: true,
  },
  comments: [
    {
      comment: {
        type: String,
      },
      commentedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Post = mongoose.model("Post", post);

module.exports = Post;
