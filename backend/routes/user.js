const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const password = require("../middleware/passwordMiddleware");

const userControl = require("../controllers/user");

router.post("/signup", password, userControl.signup);
router.post("/login", userControl.login);
router.delete("/delete/:id", auth, userControl.userDelete);
router.get("/user/:id", auth, userControl.getInformationUser);
router.get("/users/", auth, userControl.getAllUsers);

module.exports = router;
