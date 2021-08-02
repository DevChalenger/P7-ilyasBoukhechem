const models = require("../models");
const token = require("../utils.js/jwt.verif");
const admin = require("../middleware/admin");

exports.createPost = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;
  const imgData = req.body.imgUrl;
  const userId = token.verification(req);

  /* if (text.length < 2 || title.length < 2) {
    res.status(401).json("Tous les champs ne sont pas rempli");
  } */
  if (userId != token.verification(req)) {
    res.status(403).json("Vous n'êtes pas autorisé à créer un post");
  }
  try {
    const user = await models.user.findOne({
      attributes: ["firstName", "id", "lastName"],
      where: { id: userId },
    });
    const post = await models.post.create({
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

    res
      .status(201)
      .json({ post: post, messageRetour: "Votre post est ajouté" });
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.allPost = async (req, res, next) => {
  try {
    const posts = await models.post.findAll({
      include: [
        {
          model: models.user,
          attributes: ["firstName", "lastName"],
        },
      ],
      order: [["createdAt", "DESC"]],
      attributes: [
        "text",
        "id",
        "title",
        "createdAt",
        "updatedAt",
        "userId",
        "imgUrl",
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

exports.modifyPost = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;

  try {
    const update = await models.post.findOne({
      attributes: ["userId"],
      where: { id: req.params.id },
    });
    if (update.userId) {
      if (title == null && text == null) {
        res.status(401).json("Tous les champs ne sont pas rempli");
      } else {
        update.text = text;
        update.title = title;
        await update.save({
          fields: ["text", "title"],
        });
      }
      res.status(200).json({
        message: "title: " + update.title + "| |" + "text: " + update.text,
      });
    } else {
      res.status(401).json("Vous n'êtes pas autorisé à modifié ce post");
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
exports.deletePost = async (req, res, next) => {
  try {
    const findPost = await models.post.findOne({
      where: { id: req.params.id },
    });
    const findAdmin = await models.user.findOne({
      attributes: ["admin"],
    });
    if (findPost.userId == token.verification(req) || findAdmin.admin == true) {
      models.post
        .destroy({
          where: { id: req.params.id },
        })
        .then(() => res.status(200).json({ message: "Post supprimé" }))
        .catch((error) => res.status(500).json({ error }));
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
exports.getOnePost = async (req, res, next) => {
  try {
    const posts = await models.post.findOne({
      include: [
        {
          model: models.user,
          attributes: ["firstName", "lastName"],
        },
        {
          model: models.comment,
          order: [["createdAt", "DESC"]],
          attributes: ["text", "id", "userId"],
          include: [
            {
              model: models.user,
              attributes: ["firstName", "lastName"],
            },
          ],
        },
      ],
      attributes: [
        "text",
        "id",
        "title",
        "createdAt",
        "updatedAt",
        "userId",
        "imgUrl",
      ],
      where: { id: req.params.id },
    });
    if (!posts) {
      res.status(404).json("Poste introuvable");
    }
    if (token.verification(req)) {
      res.status(200).json(posts);
    } else {
      res.status(403).json("L'utilisateur n'est pas autorisé");
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
