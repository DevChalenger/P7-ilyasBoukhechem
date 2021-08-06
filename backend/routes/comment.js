const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const commentControl = require("../controllers/comment");
router.delete("/:id", auth, commentControl.deleteComment);
router.post("/:id", auth, commentControl.addComment);

module.exports = router;
