import mongoose, { Connection } from "mongoose";

const connectSecondaryDB = (
  uri: any,
  options: mongoose.ConnectOptions = {}
): Connection => {
  // Connect to MongoDB
  const db: Connection = mongoose.createConnection(uri, options);

  // By default, Mongoose skips properties not defined in the schema (strictQuery). Adjust it based on your configuration.
  db.set("strictQuery", true);

  // Event handling
  db.once("open", () => console.info("MongoDB secondary connection opened!"));
  db.on("connected", () =>
    console.info(`MongoDB secondary connection succeeded!`)
  );
  db.on("error", (err) => {
    console.error(`MongoDB secondary connection failed, ` + err);
    db.close();
  });
  db.on("disconnected", () =>
    console.info(`MongoDB secondary connection disconnected!`)
  );

  // Graceful exit
  process.on("SIGINT", () => {
    db.close().then(() => {
      console.info(
        `Mongoose secondary connection disconnected through app termination!`
      );
      process.exit(0);
    });
  });

  // Export db object
  return db;
};

export default connectSecondaryDB;
