const express = require("express");
const app = express();

const PORT = 9000;
const db_conn = require("./db_conn")();
const eventRouter = require("./routers/eventRouter");
const userRouter = require("./routers/userRouter");
app.use(express.json());
app.use("/api/event", eventRouter);
app.use("/api/user", userRouter);
app.use((err, req, res, next) => {
  console.log(err);
  res.status(400).json({
    err: err.message,
  });
});
app.listen(PORT, () => {
  console.log("Running on PORT", PORT);
});
