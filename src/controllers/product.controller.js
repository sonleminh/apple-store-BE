// const { model } = require('../models/prisma');
const prisma = require('../models/prisma');

const getProducts = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      include: { model: true },
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

//test

const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const products = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        model: true,
        description: true,
        specifications: true,
        color: true,
      },
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

const getSaleProduct = async (req, res, next) => {
  try {
    // const { id } = req.params;
    const products = await prisma.product.findMany({
      where: {
        status: { has: 'sale' },
      },
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

const getIPhoneProduct = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        model: {
          categoryId: 1,
        },
      },
      include: {
        description: true,
        specifications: true,
        color: true,
        model: {
          include: {
            category: true,
          },
        },
      },
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

const getIpadProduct = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        model: {
          categoryId: 2,
        },
      },
      include: {
        description: true,
        specifications: true,
        color: true,
        model: {
          include: {
            category: true,
          },
        },
      },
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      image,
      description,
      price,
      discountPrice,
      quantity,
      // modelId,
    } = req.body;
    const productNameExist = await prisma.product.findUnique({
      where: {
        name: name,
      },
    });
    if (productNameExist)
      return res.status(200).json({ message: 'Productname_exist' });
    const product = await prisma.product.create({
      data: {
        name: name,
        image: image,
        description: description,
        price: parseInt(price),
        discountPrice: parseInt(discountPrice),
        quantity: parseInt(quantity),
        // status: status,
        // url: url,
        // modelId: parseInt(modelId),
      },
      include: {
        model: true,
      },
    });
    res.json(product);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: req.body,
      include: {
        model: true,
      },
    });
    res.json(product);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteProduct = await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });
    res.json('Delete successfully');
  } catch (error) {
    next(error);
  }
};

const search = async (req, res, next) => {
  const { q } = req.query;
  console.log(q);
  try {
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: q,
          mode: 'insensitive',
        },
      },
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProduct,
  getSaleProduct,
  getIPhoneProduct,
  getIpadProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  search,
};
