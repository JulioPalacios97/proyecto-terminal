require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
//const path = require("path");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//ROUTES
app.use("/admin", require("./routes/adminRouter"));
app.use("/api", require("./routes/sectionRouter"));
app.use("/api", require("./routes/uploadRouter"));
app.use("/api", require("./routes/serviceRouter"));
app.use("/api", require("./routes/consultantRouter"));
app.use("/api", require("./routes/contactRouter"));
app.use("/api", require("./routes/quoteRouter"));
app.use("/api", require("./routes/newsRouter"));

/*app.use(express.static("../webpage/build"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "webpage", "build", "index.html"));
});*/

module.exports = app;
