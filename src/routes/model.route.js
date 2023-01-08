const {
  createModel,
  getModels,
  getModel,
  updateModel,
  deleteModel,
} = require('../controllers/model.controller');

const route = require('express').Router();

route.get('/models', getModels);

route.get('/model/:id', getModel);

route.post('/model', createModel);

route.patch('/model/:id', updateModel);

route.delete('/model/:id', deleteModel);

module.exports = route;
