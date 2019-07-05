const express = require("express");
const router = express.Router();
const jsend = require("../../lib/jsend");
const debug = require("debug")("jsend:default-router");

router.get("/", (req, res) => {
  const url = [`${req.protocol}:/`, req.get("host"), "api"].join("/");
  debug("/");
  res.send(jsend.success({ hello: "world", api: url }));
});

module.exports = router;
