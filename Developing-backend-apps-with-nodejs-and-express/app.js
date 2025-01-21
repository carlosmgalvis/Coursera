const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(express.json()); //middleware ==> use() ==> middleware for tour

const routes = require("./routes/routes");

app.use(morgan("dev"));

app.use("/", routes);

module.exports = app;
