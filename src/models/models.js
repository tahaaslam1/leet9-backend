module.exports = function testModel(opts) {
  const { mongoose } = opts;
  const { Schema } = mongoose;

  const noteSchema = new Schema({
    text: { type: String, required: true },
  });

  const Note = mongoose.model("note", noteSchema);

  return {
    Note,
  };
};
