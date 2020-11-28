var axios = require("axios"),
  User = require("../../models/user");
async function registerFile(accessToken, Id, ext, type) {
  try {
    let url = `https://www.googleapis.com/oauth2/v2/userinfo?alt=json&&access_token=${accessToken}`;
    let res = await axios.get(url);
    let user = await User.findOne({ userId: res.data.id });
    let newFiles = user.files;
    newFiles.push({ id: Id, extension: ext, type: type });
    let updatedUser = await User.findOneAndUpdate(
      { userId: res.data.id },
      { files: newFiles }
    );
    user = await User.findOne({ userId: res.data.id });
  } catch (err) {
    console.error(err);
  }
}

module.exports = registerFile;
