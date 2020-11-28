var router = require("express").Router();
var axios = require("axios");
var User = require("../models/user");
var middleware = require("../middlewares/auth");
/*
  router  -- /api/user/register
  desc   -- regiser the new user
  access --public
*/
router.get("/", middleware, async (req, res) => {
  let accessToken = JSON.parse(JSON.parse(req.body.token)).access_token;
  try {
    let url = `https://www.googleapis.com/oauth2/v2/userinfo?alt=json&&access_token=${accessToken}`;
    let response = await axios.get(url);
    let user = await User.findOne({ userId: response.data.id });
    res.status(200).json({ user: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});
module.exports = router;
