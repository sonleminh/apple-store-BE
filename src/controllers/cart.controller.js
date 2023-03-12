// const { model } = require('../models/prisma');
const prisma = require('../models/prisma');

const getUserCart = async (req, res, next) => {
  try {
    const userCart = await prisma.cart.findMany({
      include: { category: true },
    });
    res.json(models);
  } catch (error) {
    next(error);
  }
};

const createUserCart = async (req, res, next) => {
  try {
    const { id } = req.body;
    const userCart = await prisma.cart.create({
      data: {
        userId: id,
      },
    });
    res.json(userCart);
  } catch (error) {
    next(error);
  }
};

const createCartItem = async (req, res, next) => {
  try {
    const { cartId, productId, quantity } = req.body;
    const cartItem = await prisma.cartItem.create({
      data: {
        cartId: cartId,
        productId: productId,
        quantity: quantity,
      },
    });
    res.json(cartItem);
  } catch (error) {
    next(error);
  }
};

// const createCartItem = async (req, res, next) => {
//   try {
//     const { cartId, productId, quantity } = req.body;
//     const cartItem = await prisma.cartItem.create({
//       data: {
//         cartId: cartId,
//         productId: productId,
//         quantity: quantity,
//       },
//     });
//     res.json(cartItem);
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = { createUserCart, createCartItem };
