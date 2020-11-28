const { google } = require("googleapis"),
  fs = require("fs");
function downlaodFile(token, id, ext) {
  const client_secret = process.env.client_secret,
    client_id = process.env.client_id,
    redirect_uris = process.env.redirect_uris;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris
  );
  oAuth2Client.setCredentials(JSON.parse(JSON.parse(token)));
  const drive = google.drive({ version: "v3", auth: oAuth2Client });
  var fileId = id;
  var dest = fs.createWriteStream("./downloads/" + id + "." + ext);
  drive.files.get(
    { fileId: fileId, alt: "media" },
    { responseType: "stream" },
    function (err, res) {
      res.data
        .on("end", () => {
          console.log("Done");
        })
        .on("error", (err) => {
          console.log("Error", err);
        })
        .pipe(dest);
    }
  );
}
module.exports = downlaodFile;
