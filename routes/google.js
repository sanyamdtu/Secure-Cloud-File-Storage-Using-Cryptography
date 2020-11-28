var router = require("express").Router();
// const { check, validationResult } = require("express-validator");
var { restAuth } = require("../utils/google/getAccessToken");
var authorize = require("../utils/google/authorize");
/*
  router  -- /api/user/register
  desc   -- regiser the new user
  access --public
 */
router.get("/", (req, res) => {
  authorize(res);
});
router.get("/token", async (req, res) => {
  let code = req.query.code;
  try {
    restAuth(code, res);
  } catch {
    (err) => res.status(400).json({ error: { msg: "server ERROR!!" } });
  }
});

module.exports = router;
