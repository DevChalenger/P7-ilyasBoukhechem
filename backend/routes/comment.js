const express = require("express");
const router = express.Router();

const commentControl = require("../controllers/comment");
router.get("/:id", commentControl.oneComment);
router.put("/:id", commentControl.modifyComment);
router.delete("/:id", commentControl.deleteComment);
router.post("/", commentControl.addComment);
router.get("/user/:id", commentControl.getUserComment);

module.exports = router;
