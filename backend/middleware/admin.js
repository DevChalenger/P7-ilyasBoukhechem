const models = require("../models");

const findAdmin = models.user.findOne({
  attributes: ["admin"],
});

module.exports.findAdmin = findAdmin;
