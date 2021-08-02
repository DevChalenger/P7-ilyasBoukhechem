const models = require("../models");
const token = require("../utils.js/jwt.verif");
exports.deleteComment = (req, res, next) => {};
exports.addComment = async (req, res, next) => {
  const text = req.body.text;
  const userId = token.verification(req);
  if (text.length < 2) {
    res.status(401).json("Tous les champs ne sont pas rempli");
  }
  if (userId != token.verification(req)) {
    res.status(403).json("Vous n'êtes pas autorisé à créer un commentaire");
  }
  try {
    const user = await models.user.findOne({
      attributes: ["firstName", "id", "lastName"],
      where: { id: userId },
    });
    const post = await models.post.findOne({
      attributes: ["id"],
    });
    const comment = await models.post.create({
      includes: [
        {
          model: models.user,
          attributes: ["text", "title", "id", "imgUrl"],
        },
      ],
      text: text,
      title: title,
      userId: user.id,
      imgUrl: imgData,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
