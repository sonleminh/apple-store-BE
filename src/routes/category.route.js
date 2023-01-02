const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/category.controller');

const route = require('express').Router();

route.get('/category', getCategories);

route.get('/category/:id', getCategory);

route.post('/category', createCategory);

route.patch('/category/:id', updateCategory);

route.delete('/category/:id', deleteCategory);

module.exports = route;
