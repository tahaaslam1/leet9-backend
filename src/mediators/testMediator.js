module.exports = function testMediator(opts) {
  const { testService } = opts;

  async function test(body) {
    const result = await testService.test(body);
    return result;
  }

  return {
    test,
  };
};
