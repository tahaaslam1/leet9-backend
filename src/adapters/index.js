const mongo = require("./mongo");

module.exports = async (opts) => ({
  db: {
    primary: await mongo(opts),
  },
});
