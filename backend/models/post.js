"use strict";
const { mode } = require("crypto-js");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.post.belongsTo(models.user, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      });
      models.post.hasMany(models.comment);
    }
  }
  post.init(
    {
      userId: DataTypes.INTEGER,
      text: DataTypes.STRING,
      title: DataTypes.STRING,
      imgUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "post",
    }
  );
  return post;
};
