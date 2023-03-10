const Bootstrap = require("./bootstrap");
module.exports.bootstrap = async (process) => {
  try {
    await Bootstrap(process);
  } catch (_error) {
    logger.error("Fatal Error During Application Bootstrap >", _error);
    process.exit(1);
  }
};
