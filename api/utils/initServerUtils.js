/**
 * Init mongo db
 * @param {Mongoose} mongoose
 */
exports.initMongoDB = (mongoose) => {
  mongoose.connect(
    process.env.MONGODB_URL,
    {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: process.env.MONGODB_SSL || false,
    },
    (error) => {
      if (!error) {
        console.log('Connected to the Database successfully');
      } else {
        console.error('Error when trying connect to the Database. SSL: ' + (process.env.MONGODB_SSL || false), error);
      }
    }
  );
};
