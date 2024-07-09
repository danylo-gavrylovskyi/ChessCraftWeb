const createUserTable = require("./user");
const createGameTable = require("./game");

const initDb = async () => {
  await createUserTable();
  await createGameTable();
  console.log("Tables created");
};

module.exports = initDb;
