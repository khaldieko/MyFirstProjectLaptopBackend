const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  if (req) {
    const authorization = req.header("Authorization");
    if (!authorization) {
      return res
        .status(401)
        .json({ status: "failed", msg: "No authorization is set" })
        .end();
    }
    const token = authorization.replace("Bearer ", "");
    try {
      const data = jwt.verify(token, process.env.SECRET);
      console.log(data);
      if (data && (data.id || data._id)) {
        req.body = { ...req.body, user: data.id ? data.id : data._id };
        req.user = data;
        next();
      } else {
        return res
          .status(401)
          .json({ status: "failed", msg: "Token is incorrect" })
          .end();
      }
    } catch (e) {
      return res
        .status(401)
        .json({ status: "failed", msg: "Token has expired" })
        .end();
    }
  }
};

module.exports = auth;
