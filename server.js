const express = require("express");
require("dotenv").config();
const app = express();
require("./database/connection");

app.use(express.json());

const userRouter = require("./routes/user");
const port = process.env.PORT;

app.use("/api", userRouter);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
