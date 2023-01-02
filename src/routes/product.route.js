const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  getSaleProduct,
  getIPhoneProduct,
  getIpadProduct,
} = require('../controllers/product.controller');

const route = require('express').Router();

route.get('/product/sale', getSaleProduct);

route.get('/product/iphone', getIPhoneProduct);

route.get('/product/ipad', getIpadProduct);

route.get('/products', getProducts);

route.post('/product', createProduct);

route.get('/product/:id', getProduct);

route.patch('/product/:id', updateProduct);

route.delete('/product/:id', deleteProduct);

module.exports = route;
