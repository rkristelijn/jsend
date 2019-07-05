const expect = require("chai").expect;
const jsend = require("./jsend");
const validators = require("./jsend.spec.validators");

describe("lib/jsend", function() {
  it("success: should return jsend format", function() {
    validators.jsendSuccess(
      { statusCode: 200 },
      JSON.stringify(jsend.success("idk"))
    );
  });
  it("fail: should return jsend format", function() {
    validators.jsendFail(
      { statusCode: 400 },
      JSON.stringify(
        jsend.fail("idk", [
          "400: BAD REQUEST",
          "Route '/all/your/base' not found"
        ])
      )
    );
  });
  it("error: should return jsend format", function() {
    validators.jsendError(
      { statusCode: 500 },
      JSON.stringify(
        jsend.error("idk", ["500: INTERNAL SERVER ERROR", "User Too Ugly"])
      )
    );
  });
});
