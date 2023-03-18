const mongoose = require("mongoose");
const URI = process.env.MONGO_DB;

mongoose
  .connect(URI)
  .then((res) => {
    console.log("DB ");
  })
  .catch((error) => {
    console.log(error.message);
  });
