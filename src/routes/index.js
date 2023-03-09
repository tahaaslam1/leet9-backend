module.exports = (fastify, opts, next) => {
  const di = fastify.di().cradle;

  const injections = Object.keys(di);
  console.log(injections);

  const schemas = injections.filter((x) => x.indexOf("Schema") !== -1);
  console.log(schemas);

  schemas.forEach((r) => {
    const requests = Object.keys(di[r]);

    requests.forEach((rq) => {
      const request = di[r][rq].apply(di[r], [{ fastify }]);
      console.log(request);
      fastify.route({ ...request });
    });
  });
  next();
};
