const jwt = require("jsonwebtoken");
const secret = require("../secret/secret");
function verification(req) {
  const headers = req.headers.authorization.split(" ")[1];
  const verify = jwt.verify(headers, secret.authSecret);
  const userId = verify.userId;
  return userId;
}

module.exports.verification = verification;
