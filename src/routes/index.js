module.exports = (fastify, opts, next) => {
  const di = fastify.di().cradle;
  const { logger } = di;
  const injections = Object.keys(di);
  logger.info(injections);

  const schemas = injections.filter((x) => x.indexOf("Schema") !== -1);
  logger.info(schemas);

  schemas.forEach((r) => {
    const requests = Object.keys(di[r]);

    requests.forEach((rq) => {
      const request = di[r][rq].apply(di[r], [{ fastify }]);
      logger.info(request);
      fastify.route({ ...request });
    });
  });
  next();
};
