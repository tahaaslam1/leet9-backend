const awilix = require("awilix");
const boom = require("@hapi/boom");
const _ = require("lodash");

const _container = awilix.createContainer();

module.exports = async function FastDI(options) {
  const logger = _.get(options, "logger", undefined);
  //   const config = _.get(options, "config", undefined);

  if (logger === undefined)
    throw new Error("FastDI is dependent on [logger] instance");

  //   if (config === undefined)
  //     throw new Error("FastDI is dependent on [config] instance");

  logger.info("in the di ");

  _container.register({
    //   config: awilix.asValue(config),
    logger: awilix.asValue(logger),
    //   Joi: awilix.asValue(Joi),
    Boom: awilix.asValue(boom),
    //   _: awilix.asValue(_),
  });

  _container.loadModules(
    [
      "../models/**/*.js",
      "../services/**/*.js",
      "../schema/**/*.js",
      "../handlers/**/*.js",
      "../mediators/**/*.js",
    ],
    {
      cwd: __dirname,
      formatName: "camelCase",
      resolverOptions: {
        lifetime: awilix.Lifetime.SINGLETON,
        register: awilix.asFunction,
      },
    },
  );
  const container = () => _container;

  const registerDB = async (value) => {
    _container.register("db", awilix.asFunction(() => value).singleton());
  };

  return {
    container,
    registerDB,
  };
};
