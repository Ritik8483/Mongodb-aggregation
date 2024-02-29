const express = require("express");
const usersController = require("../controller/users");
const usersRouter = express.Router();

exports.userTableRouters = usersRouter.get("/", usersController.getAllUsers);
//   .post("/", usersController.createProducts)
//   .get("/:id", usersController.getSingleProduct)
//   .put("/:id", usersController.updatePUTProducts)
//   .patch("/:id", usersController.updatePATCHProducts)
//   .delete("/:id", usersController.deleteProduct);