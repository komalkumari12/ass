const Post = require("../models/post");

exports.addPost = async (body) => {
  const post = await Post.create(body);
  return post;
};

exports.getPostById = async (id) => {
  const post = await Post.findById(id);
  return post;
};

exports.updatePostById = async (id, body) => {
  const post = await Post.findByIdAndUpdate(
    id,
    {
      $set: body,
    },
    {
      new: true,
    }
  );
  return post;
};

exports.deletePostById = async (id) => {
  const post = await Post.findByIdAndDelete(id);
  return post;
};

exports.getAllPost = async () => {
  const post = await Post.find({})
    .populate("comments.commentedBy")
    .populate("likes");
  return post;
};

exports.addComment = async (id, body) => {
  console.log(body);
  const post = await Post.findByIdAndUpdate(
    id,
    {
      $push: body,
    },
    {
      new: true,
    }
  );
  return post;
};

exports.addLikes = async (id, body) => {
  const postLike = await Post.findByIdAndUpdate(
    id,
    {
      $addToSet: body,
    },
    {
      new: true,
    }
  );
  return postLike;
};
