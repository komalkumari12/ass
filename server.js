const express = require("express");
require("dotenv").config();
const app = express();
require("./database/connection");

app.use(express.json());

const userRouter = require("./routes/user");
const postRouter = require("./routes/post");

const port = process.env.PORT;

app.use("/api", userRouter);
app.use("/api", postRouter);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
