const express = require("express");
const jsend = require("../../lib/jsend");
const debug = require("debug")("jsend:user-router");

let routes = () => {
  let fails = [{ this: "will", not: "show" }];
  let router = express.Router();
  router.get("/", (_req, res) => {
    debug(`GET /`);
    i_will_crash_on_purpose();
    res.send(jsend.success({ fails }));
  });
  router.get("/:id", (req, res) => {
    const { id } = req.params;
    const fail = fails.find(fail => fail.this === id);
    debug(`GET /${id}, found:`, fail);
    i_will_crash_on_purpose();
    res.send(jsend.success({ fail }));
  });
  router.use((_req, res) => {
    let fail = "Route not found";
    debug(fail);
    res.status(400).send(jsend.fail(fail));
  });
  return router;
};

module.exports = routes;
