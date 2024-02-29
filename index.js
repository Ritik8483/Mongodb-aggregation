const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./src/routes/users");

const app = express();
console.log("usersRouter",usersRouter);
const { userTableRouters } = usersRouter;

app.use("/users", userTableRouters);

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/aggregation");
  console.log("moongoose connected");
}
//Server Connection
app.listen(8080, () => {
  console.log("server started");
});
