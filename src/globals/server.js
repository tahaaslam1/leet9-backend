const fastify = require("fastify");
const pino = require("pino");
const di = require("./di");
const fastifyCors = require("@fastify/cors");
const responseDecorator = require("../middleware/responseDecorator");

module.exports = async function FastServer(options) {
  const process = options.process;

  let userOptions = options.options;

  if (userOptions === undefined) userOptions = {};

  if (process === undefined)
    throw new Error("FastServer is dependent on [process]");

  let _server = null;

  const logger = pino({
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
      },
    },
  });

  const defaultOptions = {
    bodyLimit: 1048576 * 8,
    logger: logger,
    serializers: {
      res(res) {
        return {
          code: res.code,
          body: res.body,
        };
      },
      req(req) {
        return {
          method: req.method,
          url: req.url,
          path: req.path,
          parameters: req.parameters,
          headers: req.headers,
        };
      },
    },
  };

  const serverOptions = { ...defaultOptions, ...userOptions };

  if (_server === null) _server = fastify(serverOptions);

  const defaultInitialization = async () => {
    await defaultMiddleware();

    const _di = await di({
      logger: _server.log,
    });

    const _container = _di.container();

    await _di.registerDB(() => {
      "mongoAdaptor";
    }, true);

    // di k naam se har jaga container utha sakty hain porey server mai
    await decorateServer("di", () => _container);

    _server.setValidatorCompiler(
      ({ schema }) =>
        (data) =>
          schema.validate(data),
    );
  };

  const defaultMiddleware = async () => {
    _server.register(fastifyCors);
    _server.setErrorHandler(function (error, request, reply) {
      const { _, Boom } = _server.di().cradle;
      // if "joi" error object
      if (error && error.isJoi) {
        error = Boom.badRequest(error.message, error.details);
      }
      // if "boom" error object
      if (error && error.isBoom) {
        const _code = _.get(error, "output.statusCode", 500);
        const _payload = Object.assign(
          error.output.payload,
          { data: error.data },
          { message: error.message },
        );
        // change "statusCode" to "code"
        _.set(_payload, "code", _code);
        _.unset(_payload, "statusCode");
        // remove "data" if "null"
        if (_.isNull(_payload.data)) _.unset(_payload, "data");
        // respond
        reply
          .code(_code)
          .type("application/json")
          .headers(error.output.headers)
          .send(_payload);
        return;
      }
      reply.send(error || new boom("Got non-error: " + error));
    });
    _server.register(responseDecorator);
  };

  const registerRoutes = async ({ routes, prefix }) => {
    // if (!prefix) prefix = config.get("server").api_prefix;
    _server.register(routes);
  };

  const decorateServer = async function decorateServer(key, value) {
    _server.decorate(key, value);
  };

  const start = async function start() {
    try {
      await defaultInitialization();
      await _server.listen(
        { port: 3000, host: "localhost" },
        // config.get("server").port,
        // config.get("server").host,
      );
    } catch (_error) {
      console.error("Shutting Down Due To Fatal Exception >");
      console.error("Server Initialization Error >", _error);
      process.exit(1);
    }
  };

  return {
    start,
    registerRoutes,
  };
};
