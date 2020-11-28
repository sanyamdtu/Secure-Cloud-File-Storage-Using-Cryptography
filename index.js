require("dotenv").config();
var express = require("express"),
  app = express(),
  connectDb = require("./config/db");
connectDb();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/file", require("./routes/files"));
app.use("/api/user", require("./routes/user"));
app.use("/api/google", require("./routes/google"));
app.listen(process.env.PORT || 5000, () => {
  console.log("server started at 5000");
});
