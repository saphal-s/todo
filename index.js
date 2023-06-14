const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connect = require("./config/db");
const todoRouter = require("./routes/todoRoute");

require("dotenv").config();
connect();

//app
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", todoRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
