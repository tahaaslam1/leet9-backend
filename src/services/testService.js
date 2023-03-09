module.exports = function SvcTalos(opts) {
  const { db, logger } = opts;
  async function test(body) {
    logger.info("initailized db with : ", db);
    return;
  }

  return {
    test,
  };
};
