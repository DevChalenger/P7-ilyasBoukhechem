const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const postControl = require("../controllers/post");

router.get("/", auth, postControl.allPost);
router.get("/:id", auth, postControl.getOnePost);
router.put("/:id", auth, postControl.modifyPost);
router.delete("/:id", auth, postControl.deletePost);
router.post("/", postControl.createPost);

module.exports = router;
