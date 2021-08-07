const bcrypt = require("bcrypt"); //Importation du module bcrypt pour le hashage des mots de passes//
const jwt = require("jsonwebtoken");
const secret = require("../secret/secret");
const models = require("../models/");
const { Op } = require("sequelize");
const token = require("../utils.js/jwt.verif");

exports.signup = (req, res, next) => {
  const email = req.body.email;
  const lastName = req.body.lastName;
  const firstName = req.body.firstName;
  const password = req.body.password;

  if (
    email == null ||
    lastName == null ||
    firstName == null ||
    password == null
  ) {
    return res
      .status(400)
      .json({ message: "Tous les champs ne sont pas valide" });
  }

  if (firstName.length >= 15 || firstName.length <= 2) {
    res.status(400).json({ message: "Le prénom n'est pas valide" });
  }
  if (lastName.length >= 25 || lastName.length <= 2) {
    res.status(400).json({ message: "Le nom n'est pas valide" });
  }
  models.user
    .findOne({
      attributes: ["email"],
      where: { email: email },
    })
    .then((user) => {
      if (!user) {
        bcrypt.hash(password, 10).then(async (hash) => {
          const user = await models.user.create({
            email: email,
            password: hash,
            lastName: lastName,
            firstName: firstName,
            admin: 0,
          });
          user
            .save()
            .then((user) => {
              return res.status(201).json({ idUser: user.id });
            })
            .catch((error) => res.status(400).json({ message: error + "" }));
        });
      } else {
        return res.status(400).json({
          message:
            "Un utilisateur est déja enrengistré avec cette adresse mail",
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        message:
          "Impossible de verifier si l'utilisateur est enrengistré dans la base de donnés",
      });
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  if (email == null || password == null) {
    return res
      .status(400)
      .json({ message: "Tous les champs ne sont pas valide" });
  }
  console.log(email);
  models.user
    .findOne({
      where: { email: email },
    })
    .then((users) => {
      if (users !== null) {
        bcrypt
          .compare(password, users.password)
          .then((valid) => {
            if (!valid) {
              return res
                .status(400)
                .json({ message: "Mot de passe incorrect !" });
            }
            res.status(200).json({
              token: jwt.sign(
                { userId: users.id, admin: users.admin },
                secret.authSecret,
                {
                  expiresIn: "10s",
                }
              ),
            });
          })
          .catch((error) => res.status(500).json({ message: error + "" }));
      } else {
        return res.status(404).json({ message: "Utilisateur non trouvé !" });
      }
    })
    .catch((error) => res.status(500).json({ message: error + "" }));
};

exports.userDelete = (req, res, next) => {
  const userId = req.params.id;
  try {
    models.user.findOne({
      attributes: [
        "id",
        "email",
        "lastName",
        "firstName",
        "password",
        "admin",
        "createdAt",
        "updatedAt",
      ],
      where: { id: userId },
    });
    if (userId != token.verification(req)) {
      return res.status(403).json({
        message: `L'utilisateur n'est pas autorisé a suprimer le profil`,
      });
    }
    console.log(userId);
    if (!userId) {
      return res
        .status(404)
        .json({ message: "Identifiant utilisateur invalide" });
    }
    models.user
      .destroy({ where: { id: userId } })
      .then(() => {
        return res.status(202).json({ message: "Utilisateur supprimé" });
      })
      .catch((error) => res.status(400).json({ message: error + "" }));
  } catch (error) {
    return res.status(500).json({ error: error + "" });
  }
};

exports.getInformationUser = (req, res, next) => {
  const userId = req.params.id;
  const verify = token.verification(req);
  if (userId != verify || models.user.admin === true) {
    res.status(403).json({
      message: `L'utilisateur n'est pas autorisé a consulter le profil`,
    });
  }
  models.user
    .findOne({
      attributes: ["firstName", "lastName", "email", "id"],
      where: { id: userId },
    })

    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ message: error + "" }));
};
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await models.user.findAll({
      attributes: ["lastName", "id", "firstName", "email"],
      where: {
        id: {
          [Op.not]: 1,
        },
      },
    });
    res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur" });
  }
};
