const express = require("express");
const routes = express.Router();
const AnnotationController = require("./controllers/AnnotationController");
const ContentController = require("./controllers/ContentController");
const PriorityController = require("./controllers/PriorityController");
const UserRegisterController = require("./controllers/UserRegisterController");
const UserLogin = require("./controllers/UserLogin");
const UserToken = require("./controllers/UserToken");

//Annotations Route
routes.post("/annotations", UserToken.checkToken, AnnotationController.create);
routes.get("/annotations", UserToken.checkToken, AnnotationController.read);
routes.delete(
  "/annotations/:id",
  UserToken.checkToken,
  AnnotationController.delete
);
routes.get("/priorities", UserToken.checkToken, PriorityController.read);
routes.post("/priorities/:id", UserToken.checkToken, PriorityController.update);
routes.post("/contents/:id", UserToken.checkToken, ContentController.update);

//User Route
routes.post("/auth/register", UserRegisterController.create);
routes.post("/auth/login", UserLogin.create);

routes.get("/user/:id", UserToken.checkToken, UserToken.read);

module.exports = routes;
