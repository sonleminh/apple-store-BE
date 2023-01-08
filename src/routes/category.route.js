const {
  getCategories,
  getCategoryId,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/category.controller');

const route = require('express').Router();

route.get('/category', getCategories);

route.get('/categoryid/:id', getCategoryId);

route.post('/category', createCategory);

route.patch('/category/:id', updateCategory);

route.delete('/category/:id', deleteCategory);

module.exports = route;
