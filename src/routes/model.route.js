const {
  createModel,
  getModels,
  getModel,
  updateModel,
  deleteModel,
} = require('../controllers/model.controller');

const route = require('express').Router();

route.get('/models', getModels);

route.get('/models/:id', getModel);

route.post('/models', createModel);

route.patch('/models/:id', updateModel);

route.delete('/models/:id', deleteModel);

module.exports = route;
