const postController = require("../controllers/post");
const router = require("express").Router();
const { isAuth } = require("../middlewares/jwt");

router.post("/post/addPost", isAuth, postController.addPost);
router.get("/post/getPostById/:id", postController.getPostById);
router.put("/post/updatePostById/:id", isAuth, postController.updatePostById);
router.delete(
  "/post/deletePostById/:id",
  isAuth,
  postController.deletePostById
);

router.get("/post/getAllPost", postController.getAllPost);
router.post("/post/addComment/:id", isAuth, postController.addComment);
router.post("/post/addLikes/:id", isAuth, postController.addLikes);

module.exports = router;
