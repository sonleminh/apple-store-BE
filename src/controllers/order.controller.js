const prisma = require('../models/prisma');

const getOrdersByUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const products = await prisma.order.findMany({
      where: {
        userId: Number(id),
      },
      include: {
        orderItems: true,
      },
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

const createOrder = async (req, res, next) => {  try {
    const {
      name,
      phone,
      email,
      note,
      address,
      transport,
      payment,
      orderItems,
      totalAmount,
      userId,
    } = req.body;
    const cartItemData = orderItems?.reduce((array, item) => {
      array.push({
        productId: Number(item.id),
        name: item.name,
        image: item.image,
        price: Number(item.price),
        discountPrice: Number(item.discountPrice),
        quantity: Number(item.quantity),
      });
      return array;
    }, []);
    // console.log(cartItemData);
    const order = await prisma.order.create({
      data: {
        name: name,
        phone: phone,
        email: email,
        note: note,
        address: address,
        transport: transport,
        payment: payment,
        orderItems: {
          createMany: {
            data: cartItemData,
          },
        },
        totalAmount: String(totalAmount),
        userId: userId,
      },
    });
    return res.json({ order, message: 'Create order successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOrdersByUser,
  createOrder,
};
