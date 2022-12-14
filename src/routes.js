const express = require('express');
const routes = express.Router();
const AcessController = require('./controllers/AcessController');
const UserController = require('./controllers/UserController');
const AnnotationController = require('./controllers/AnnotationController');
const ContentController = require('./controllers/ContentController');
const PriorityController = require('./controllers/PriorityController');



routes.get('/user/:id', AcessController.read);
routes.post('/auth/register', UserController.create);
routes.post('/auth/login', UserController.read);

routes.post('/annotations', AnnotationController.create);
routes.get('/annotations', AnnotationController.read);
routes.delete('/annotations/:id', AnnotationController.delete);

routes.get('/priorities', PriorityController.read);
routes.post('/priorities/:id', PriorityController.update);

routes.post('/contents/:id', ContentController.update);

module.exports = routes;