const jsend = () => {
  const SUC = "SUCCESS";
  const FAIL = "FAIL";
  const ERR = "ERROR";
  const OK = "200: OK";
  const ISE = "500: INTERNAL SERVER ERROR";
  const BR = "400: BAD REQUEST";

  let _success = (data, code = 200) => {
    return { status: SUC, data, message: OK, code };
  };

  let _fail = (message, data, code = 400) => {
    data.unshift(BR);
    return { status: FAIL, message, data, code };
  };

  let _error = (message, data, code = 500) => {
    data.unshift(ISE);
    return {
      status: ERR,
      message: message,
      data,
      code
    };
  };

  return {
    success: _success,
    fail: _fail,
    error: _error
  };
};

module.exports = jsend();
