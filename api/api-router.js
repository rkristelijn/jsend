const express = require("express");
const jsend = require("../lib/jsend");
const debug = require("debug")("jsend:api-router");

const usersRouter = require("./users/users-router")();
const failRouter = require("./fail/fail-router")();

let allowedRoutes = [{ "/users": usersRouter }, { "/fail": failRouter }];

destructureRoute = route => {
  let [key] = Object.keys(route);
  let [router] = Object.values(route);
  return [key, router];
};

getAllowedRouteNames = req => {
  if (req) {
    const url = [`${req.protocol}:/`, req.get("host"), "api"].join("/");
    return allowedRoutes.map(route => url + [Object.keys(route)]);
  }
  return allowedRoutes.map(route => [Object.keys(route)]);
};

const routes = () => {
  const router = express.Router();
  for (route of allowedRoutes) {
    [routerName, routerFunction] = destructureRoute(route);
    router.use(routerName, routerFunction);
  }
  router.use((req, res) => {
    const fail = `Route '${req.originalUrl}' not found`;
    debug("FAIL", 400, fail);
    const routes = getAllowedRouteNames(req);
    const stack = [fail, { available: [routes] }];
    res.status(400).send(jsend.fail(fail, stack));
  });
  return router;
};
module.exports = routes;
