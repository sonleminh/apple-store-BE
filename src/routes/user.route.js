const {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  register,
  login,
  getMyProfile,
  logout,
} = require('../controllers/user.controller');
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require('../controllers/verifyToken');
const route = require('express').Router();

route.get('/user/profile/my', getMyProfile);

route.get('/user/:id', getUser);

route.get(
  '/users',
  // verifyToken,
  getUsers
);

route.patch('/user/:id', updateUser);

route.delete(
  '/user/:id',
  //  verifyTokenAndAdmin,
  deleteUser
);

route.post('/register', register);

route.post('/login', login);

route.post('/logout', verifyToken, logout);

module.exports = route;
