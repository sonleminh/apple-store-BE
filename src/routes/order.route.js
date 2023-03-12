const {
  createOrder,
  getOrdersByUser,
} = require('../controllers/order.controller');

const route = require('express').Router();

route.get('/order/user/:id', getOrdersByUser);
route.post('/order', createOrder);

module.exports = route;
