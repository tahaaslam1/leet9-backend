module.exports = function testService(opts) {
  const { models,logger } = opts;
  async function test(body) {
    const note = { text: "note" };
    const newNote = await models.Note.create(note);
    // logger.info(newNote);
    return newNote;
  }

  return {
    test,
  };
};
