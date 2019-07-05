const expect = require("chai").expect;

let validators = function() {
  function jsendSuccess(res, payload) {
    const body = JSON.parse(payload);
    expect(res.statusCode).equals(200);
    expect(body.status).equals("SUCCESS");
    expect(body.code).equals(200);
    expect(body).to.have.property("data");
    expect(body).to.have.property("message");
  }

  function jsendFail(res, payload) {
    const body = JSON.parse(payload);
    expect(res.statusCode).equals(400);
    expect(body.status).equals("FAIL");
    expect(body.code).equals(400);
    expect(body).to.have.property("data");
    expect(body).to.have.property("message");
  }

  function jsendError(res, payload) {
    const body = JSON.parse(payload);
    expect(res.statusCode).equals(500);
    expect(body.status).equals("ERROR");
    expect(body.code).equals(500);
    expect(body).to.have.property("data");
    expect(body).to.have.property("message");
  }

  function isUsers(payload) {
    const body = JSON.parse(payload);
  }

  return {
    jsendSuccess,
    jsendFail,
    jsendError
  };
};

module.exports = validators();
