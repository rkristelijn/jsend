// npm libs
const express = require("express");
const path = require("path");
const debug = require("debug")("jsend:server");

// custom libs
const jsend = require("./lib/jsend");
const errstack = require("./lib/errstack");

// routers
const defaultRouter = require("./api/default/default-router");
const apiRouter = require("./api/api-router")();

const app = express();

// view engine setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  "/favicon.ico",
  express.static(path.join(__dirname, "img", "favicon.ico"))
);

// routing
app.use("/", defaultRouter);
app.use("/api", apiRouter);

const clientErrHandler = (err, _req, res, next) => {
  let errCode = err.status || 500;
  debug("ERROR", errCode, err.message);
  res
    .status(errCode)
    .send(
      jsend.error(
        err.message,
        errstack.filter(errstack.format(err.stack)),
        errCode
      )
    );
  next(err);
};

app.use(clientErrHandler);

module.exports = app;
