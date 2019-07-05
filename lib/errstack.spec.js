const expect = require("chai").expect;
const errstack = require("./errstack");

const err = `
ReferenceError: i_will_crash_on_purpose is not defined
    at /home/gius/login-rest/api/fail/fail-router.js:10:5
    at Layer.handle [as handle_request] (/home/gius/login-rest/node_modules/express/lib/router/layer.js:95:5)
    at next (/home/gius/login-rest/node_modules/express/lib/router/route.js:137:13)
    at Route.dispatch (/home/gius/login-rest/node_modules/express/lib/router/route.js:112:3)
    at Layer.handle [as handle_request] (/home/gius/login-rest/node_modules/express/lib/router/layer.js:95:5)
    at /home/gius/login-rest/node_modules/express/lib/router/index.js:281:22
    at Function.process_params (/home/gius/login-rest/node_modules/express/lib/router/index.js:335:12)
    at next (/home/gius/login-rest/node_modules/express/lib/router/index.js:275:10)
    at Function.handle (/home/gius/login-rest/node_modules/express/lib/router/index.js:174:3)
    at router (/home/gius/login-rest/node_modules/express/lib/router/index.js:47:12)
    `;

describe("lib/errstack", function() {
  it("format: should split string in array", function() {
    const formatted = errstack.format(err);
    expect(formatted.length).to.equal(13);
  });
  it("filter: should remove node_modules and empty string in array", function() {
    const formatted = errstack.format(err);
    const filtered = errstack.filter(formatted);
    expect(filtered.length).to.equal(2);
  });
});
