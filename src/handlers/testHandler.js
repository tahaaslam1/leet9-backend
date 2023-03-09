module.exports = function testHandler(opts) {
  const { testMediator } = opts;
  async function test(request, reply) {
    const { body } = request;
    const result = testMediator.test(body);
    reply.send(result);
  }
  return {
    test,
  };
};
