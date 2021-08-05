const models = require("../models");
const token = require("../utils.js/jwt.verif");
exports.deleteComment = async (req, res, next) => {
  try {
    const findComment = await models.comment.findOne({
      where: { id: req.params.id },
    });
    const findAdmin = await models.user.findOne({
      attributes: ["admin"],
      where: { id: token.verification(req) },
    });
    if (!findComment) {
      res.status(404).json({ message: "Commentaire introuvable" });
      return;
    }
    if (
      findComment.userId == token.verification(req) ||
      findAdmin.admin === true
    ) {
      models.comment
        .destroy({
          where: { id: req.params.id },
        })
        .then(() => res.status(200).json({ message: findAdmin }))
        .catch((error) => res.status(500).json({ error: error + "" }));
    } else {
      return res
        .status(403)
        .json({ message: "L'utilisateur n'est pas autorisé " });
    }
  } catch (error) {
    return res.status(500).json({ error: error + " hey" });
  }
};
exports.addComment = async (req, res, next) => {
  const text = req.body.text;
  const userId = token.verification(req);
  const postId = req.params.id;
  if (text.length < 2) {
    res.status(404).json({ message: "Tous les champs ne sont pas rempli" });
  }
  if (userId != token.verification(req)) {
    res
      .status(403)
      .json({ message: "Vous n'êtes pas autorisé à créer un commentaire" });
  }
  try {
    const user = await models.user.findOne({
      attributes: ["firstName", "id", "lastName"],
      where: { id: userId },
    });
    const postComment = await models.comment.create({
      includes: [
        {
          model: models.user,
          attributes: ["text", "title", "id", "createdAt"],
        },
      ],
      text: text,
      userId: user.id,
      postId: postId,
    });
    res
      .status(201)
      .json({ comment: postComment, messageRetour: "Votre post est ajouté" });
  } catch (error) {
    res.status(500).json(error);
  }
};
