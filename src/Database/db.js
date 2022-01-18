const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connection.on("connected", () => {
  console.log("database connected");
});

mongoose.connection.on("disconnected", () => {
  console.log("database disconnected");
});

mongoose.connection.on("reconnect", () => {
  console.log("database reconnect");
});

mongoose.connection.on("error", (error) => {
  console.error(error);
  process.exit(-1);
});

function startDB() {
  mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
module.exports = startDB;
