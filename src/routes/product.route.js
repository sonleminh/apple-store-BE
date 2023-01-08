const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  getSaleProduct,
  getIPhoneProduct,
  getIpadProduct,
  search,
} = require('../controllers/product.controller');

const route = require('express').Router();

route.get('/sale', getSaleProduct);

route.get('/iphone', getIPhoneProduct);

route.get('/ipad', getIpadProduct);

route.get('/products', getProducts);

route.post('/product', createProduct);

route.get('/product/:id', getProduct);

route.patch('/product/:id', updateProduct);

route.delete('/product/:id', deleteProduct);

route.get('/search', search);

module.exports = route;
