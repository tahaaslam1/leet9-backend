module.exports = function testSchema(opts) {
  const { testHandler } = opts;

  const testRequst = () => {
    return {
      method: "POST",
      url: "/test",
      handler: testHandler.test,
    };
  };

  return {
    testRequst,
  };
};
