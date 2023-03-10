module.exports = async ({ logger, mongoose }) => {
  logger.info("Initializing MongoDB Adapter >");

  // will be saved in the config folder latere
  const connectionString =
    "mongodb+srv://leet9:leet912345@cluster0.ltczhj2.mongodb.net/?retryWrites=true&w=majority";
  try {
    await mongoose.connect(connectionString);
    console.log(mongoose.connection.readyState);
  } catch (e) {
    logger.error(e.message);
  }

  return mongoose;
};
