const express = require("express"); //Importation du module express//
const bodyParser = require("body-parser"); //Importation du module body-parser//
const helmet = require("helmet");
const morgan = require("morgan");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
const { sequelize } = require("./models/index");
require("dotenv").config();

const app = express();
//Cors//
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true, limit: "2mb" }));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(helmet());

const connectionTest = async function () {
  try {
    await sequelize.authenticate();
    console.log(
      `Connection à la base de données ${process.env.DATA_BASE_NAME} réussi`
    );
  } catch (error) {
    console.error(
      `Connection à la base de données ${process.env.DATA_BASE_NAME} échoué`,
      error
    );
  }
};
connectionTest();

app.use("/api/posts", postRoutes); //middleware pour les routes post//
app.use("/api/reply", commentRoutes); //middleware pour les routes post//
app.use("/api/auth", userRoutes); //middleware pour les routes users//
module.exports = app;
