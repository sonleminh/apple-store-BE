const {
  createUserCart,
  createCartItem,
} = require('../controllers/cart.controller');

const route = require('express').Router();

route.post('/cart', createUserCart);

route.post('/cartitem', createCartItem);

module.exports = route;
