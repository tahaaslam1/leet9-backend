module.exports = function SvcTalos(opts) {
  const { models } = opts;
  async function test(body) {
    const note = { text: "note" };
    const newNote = await models.Note.create(note);
    console.log(newNote);
    return newNote;
  }

  return {
    test,
  };
};
