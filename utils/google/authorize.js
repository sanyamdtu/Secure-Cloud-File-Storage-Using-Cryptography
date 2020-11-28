const { google } = require("googleapis"),
  { getAccessToken } = require("./getAccessToken");
var authorize = function (res) {
  const client_secret = process.env.client_secret,
    client_id = process.env.client_id,
    redirect_uris = process.env.redirect_uris;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris
  );
  return getAccessToken(oAuth2Client, res);
};

module.exports = authorize;
