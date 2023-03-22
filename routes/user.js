const UserController = require("../controllers/user");
const router = require("express").Router();

router.post("/user/login", UserController.login);
router.put("/user/updateUser/:username", UserController.updateUser);
router.get("/user/sendOtp/:username", UserController.sendOtp);
router.post("/user/signup", UserController.signup);

module.exports = router;
