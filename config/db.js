var mongoose = require("mongoose");
var connectdb = () => {
  mongoose
    .connect(process.env.Mongo_url, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("database conmected"))
    .catch((err) => console.log(err));
};
module.exports = connectdb;
