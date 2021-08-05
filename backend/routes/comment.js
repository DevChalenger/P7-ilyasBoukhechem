const express = require("express");
const router = express.Router();

const commentControl = require("../controllers/comment");
router.delete("/:id", commentControl.deleteComment);
router.post("/:id", commentControl.addComment);

module.exports = router;
