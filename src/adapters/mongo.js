module.exports = async ({ logger, mongoose, config }) => {
  logger.info("Initializing MongoDB Adapter >");
  const connectionString = config.DB_URI;
  try {
    await mongoose.connect(connectionString);
    logger.info(mongoose.STATES[mongoose.connection.readyState]); //logs 'connected' if connection is successful
  } catch (e) {
    logger.error(e.message);
  }

  const customLogger = (collectionName, method, query) => {
    logger.info(
      `collection : ${collectionName} \n method : ${method} \n query : ${JSON.stringify(
        query
      )} `
    );
  };
  mongoose.set({ debug: customLogger });
  return mongoose;
};
