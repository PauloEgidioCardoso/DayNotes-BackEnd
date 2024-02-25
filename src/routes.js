const express = require('express');
const routes = express.Router();
const AnnotationController = require('./controllers/AnnotationController');
const ContentController = require('./controllers/ContentController');
const PriorityController = require('./controllers/PriorityController');
const UserRegisterController = require('./controllers/UserRegisterController');
const UserLogin = require('./controllers/UserLogin');
const UserToken = require('./controllers/UserToken');



//Annotations Route
routes.post('/annotations', AnnotationController.create);
routes.get('/annotations', AnnotationController.read);
routes.delete('/annotations/:id', AnnotationController.delete);
routes.get('/priorities', PriorityController.read);
routes.post('/priorities/:id', PriorityController.update);
routes.post('/contents/:id', ContentController.update);

//User Route
routes.post('/auth/register', UserRegisterController.create);
routes.post('/auth/login', UserLogin.create);

routes.get('/user/:id',UserToken.checkToken ,UserToken.read);

module.exports = routes;