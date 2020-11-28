var axios = require("axios"),
  User = require("../../models/user");
async function registerUser(accessToken) {
  try {
    let url = `https://www.googleapis.com/oauth2/v2/userinfo?alt=json&&access_token=${accessToken}`;
    let res = await axios.get(url);
    var user = await User.findOne({ userId: res.data.id });
    if (!user) {
      user = new User({
        userId: res.data.id,
        files: [],
        avatarUrl: res.data.picture,
      });
      await user.save();
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = registerUser;
