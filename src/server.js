const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const startDB=require("./Database/db")

const port = 8000;

dotenv.config()
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ message: "success" });
});
if (process.env.NODE_ENV === "development") {

  app.use(morgan("dev"));
}

startDB()
app.listen(port, () => {
  console.log(`server listening at ${port}`);
});
