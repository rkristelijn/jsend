const express = require("express");
const jsend = require("../../lib/jsend");
const debug = require("debug")("jsend:user-router");

let routes = () => {
  let users = [
    { name: "admin", pass: "admin" },
    { name: "system", pass: "system" },
    { name: "henk", pass: "annie" }
  ];
  let router = express.Router();
  router.get("/", (_req, res) => {
    debug(`GET /`);
    res.send(jsend.success({ users }));
  });
  router.get("/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find(user => user.name === id);
    debug(`GET /${id}, found:`, user);
    res.send(jsend.success({ user }));
  });
  router.use((_req, res) => {
    let fail = "Route not found";
    debug(fail);
    res.status(400).send(jsend.fail(fail));
  });
  return router;
};

module.exports = routes;
