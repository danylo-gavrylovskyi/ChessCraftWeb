const initDb = require("../models");

const errorHandler = async (err, req, res, next) => {
  // console.error("Error occurred:", err);
  err.statusCode = err.statusCode || 500;

  if (
    err.message.includes("relation") &&
    err.message.includes("does not exist")
  ) {
    console.log("Database table missing, initializing...");

    // Initialize the database schema
    await initDb();

    try {
      // Re-execute the original request logic if necessary
      res.status(err.statusCode).json({
        error: "Database tables are being initialized. Please try again later.",
      });
    } catch (initError) {
      res
        .status(err.statusCode)
        .json({ error: "Failed to initialize database tables." });
    }
  } else {
    res.status(err.statusCode).json({ error: err.message });
  }
};

module.exports = errorHandler;
