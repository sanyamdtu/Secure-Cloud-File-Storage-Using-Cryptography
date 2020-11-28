var express = require("express"),
  axios = require("axios");

module.exports = (req, res, next) => {
  let token = req.header("x-auth-token");
  // console.log(token);
  req.body.token = JSON.parse(token);
  let accessToken = req.body.token.access_token;
  let url = `https://www.googleapis.com/oauth2/v2/userinfo?alt=json&&access_token=${accessToken}`;
  if (token) {
    axios
      .get(url)
      .then((respo) => {
        req.body.userId = respo.data.id;
        next();
      })
      .catch((err) => {
        // console.log(err);
        res.status(401).json({ error: "please login" });
      });
  } else res.status(401).json({ error: "please login" });
};
