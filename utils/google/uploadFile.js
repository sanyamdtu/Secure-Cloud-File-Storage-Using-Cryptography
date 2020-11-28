const { google } = require("googleapis"),
  fs = require("fs");
const { json } = require("express");
var registerFile = require("../models/registerFile");
async function uploadFile(req, token) {
  const client_secret = process.env.client_secret,
    client_id = process.env.client_id,
    redirect_uris = process.env.redirect_uris;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris
  );
  oAuth2Client.setCredentials(token);
  const drive = google.drive({ version: "v3", auth: oAuth2Client });
  const fileMetadata = {
    name: req.files[0].originalname,
  };
  const media = {
    mimeType: req.files[0].mimetype,
    body: fs.createReadStream(req.files[0].path),
  };
  drive.files.create(
    {
      resource: fileMetadata,
      media: media,
      fields: "id",
    },
    (err, file) => {
      if (err) {
        console.error(err);
      }
      try {
        registerFile(
          token.access_token,
          file.data.id,
          req.files[0].mimetype.split("/")[1],
          req.files[0].mimetype.split("/")[0]
        );
      } catch (err) {
        console.error(err);
      }
    }
  );
}
module.exports = uploadFile;
