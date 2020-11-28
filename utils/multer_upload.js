var mul = require("multer");
module.exports = mul({
  storage: mul.diskStorage({}),
  fileFilter: (req, file, callbck) => {
    callbck(null, true);
  },
});
