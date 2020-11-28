const { google } = require("googleapis"),
  SCOPES = [
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/userinfo.profile",
  ];
var oauth;
var userRegister = require("../models/registerUser");
function getAccessToken(oAuth2Client, res) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  oauth = oAuth2Client;
  res.redirect(authUrl);
}
function restAuth(code, res) {
  oauth.getToken(code, (err, token) => {
    if (err) return console.log("Error retrieving access token");
    userRegister(token.access_token);

    res.status(200).json({
      msg: "authentication done you are logged in",
      token: token,
    });
  });
}
module.exports = { getAccessToken, restAuth };
