const jwt = require("jsonwebtoken");
const secret = require("../secret/secret");
function verification(req) {
  const token = req.headers.authorization.split(" ")[1];
  const verify = jwt.verify(token, secret.authSecret);
  const userId = verify.userId;
  return userId;
}

module.exports.verification = verification;
