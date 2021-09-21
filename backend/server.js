require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

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

module.exports = app;
