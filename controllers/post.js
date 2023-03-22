const postService = require("../services/post");

exports.addPost = async (req, res) => {
  try {
    const { caption, media } = req.body;
    if (!media || !caption) {
      return res.status(409).json({
        message: "Media and Caption is necessary",
      });
    }

    const post = await postService.addPost({
      caption,
      media,
    });

    return res.status(200).json({
      message: "Post uploaded",
      data: post,
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
      error: error.message,
    });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postService.getPostById(id);

    if (!post) {
      return res.status(409).json({
        message: "post does not exists",
      });
    }

    return res.status(200).json({
      message: "Post found",
      data: post,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.updatePostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postService.updatePostById(id, req.body);

    if (!post) {
      return res.status(409).json({
        message: "post does not exists",
      });
    }
    return res.status(200).json({
      message: "Posted successfully!",
      post,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.deletePostById = async (req, res) => {
  try {
    const { id } = req.params;
    await postService.deletePostById(id);
    return res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getAllPost = async (req, res) => {
  try {
    const post = await postService.getAllPost();
    return res.status(200).json({
      message: "Posts",
      data: post,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postService.addComment(id, req.body);

    if (!post) {
      return res.status(409).json({
        message: "post does not exists",
      });
    }
    return res.status(200).json({
      message: "comented successfully!",
      post,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.addLikes = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postService.addLikes(id, req.body);
    if (!post) {
      return res.status(409).json({
        message: "post does not exists",
      });
    }
    return res.status(200).json({
      message: "Liked successfully!",
      post,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
