const debug = require("debug")("jsend:errstack");

const format = stack => {
  if (!stack || typeof stack !== "string") return stack;
  debug("formatting");
  return stack.split("\n").map(msg => msg.trim());
};

const filter = stack => {
  if (!stack || !Array.isArray(stack)) return stack;
  debug("filtering");
  return format(stack).filter(
    msg => !msg.includes("node_modules") && msg.length > 0
  );
};

module.exports = { format, filter };
