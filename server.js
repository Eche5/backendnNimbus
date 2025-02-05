const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT;
const DB = process.env.DATABASE;
console.log(DB);
mongoose.connect(DB).then(() => {
  console.log("DB is running");
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
