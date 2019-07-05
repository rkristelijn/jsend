const request = require("request");
const chai = require("chai");

const expect = chai.expect;
const endpoint = "http://localhost:3000";
const validators = require("../lib/jsend.spec.validators");

before(function() {
  request.get(endpoint, function(err, res) {
    if (err && err.errno === "ECONNREFUSED") {
      console.log(
        "It seems the server is not running. Please start the server: npm start"
      );
      process.exit(1);
    }
  });
});

describe("e2e", function() {
  it("Should start server", function(done) {
    request.get(endpoint, function() {
      expect(true).to.equal(true);
      done();
    });
  });
  it("GET / should return 200", function(done) {
    request.get(endpoint, function(_err, res, body) {
      validators.jsendSuccess(res, body);
      done();
    });
  });
  it("GET /api should return 400", function(done) {
    request.get(endpoint + "/api", function(_err, res, body) {
      validators.jsendFail(res, body);
      done();
    });
  });
  it("GET /api/users should return 200", function(done) {
    request.get(endpoint + "/api/users", function(_err, res, body) {
      validators.jsendSuccess(res, body);
      done();
    });
  });
  it("GET /api/fail should return 500 and an error", function(done) {
    request.get(endpoint + "/api/fail", function(err, res, body) {
      validators.jsendError(res, body);
      done();
    });
  });
});
