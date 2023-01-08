// const { model } = require('../models/prisma');
const prisma = require('../models/prisma');

const getModels = async (req, res, next) => {
  try {
    const models = await prisma.model.findMany({
      include: { category: true },
    });
    res.json(models);
  } catch (error) {
    next(error);
  }
};

const getModel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const model = await prisma.model.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        category: { include: { model: true } },
        products: {
          include: {
            description: true,
            specifications: true,
            color: true,
          },
        },
      },
    });
    res.json(model);
  } catch (error) {
    next(error);
  }
};

const createModel = async (req, res, next) => {
  try {
    const { name, categoryId } = req.body;
    const model = await prisma.model.create({
      data: {
        name: name,
        categoryId: parseInt(categoryId),
      },
      include: {
        category: true,
      },
    });
    res.json(model);
  } catch (error) {
    next(error);
  }
};

const updateModel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const model = await prisma.model.update({
      where: {
        id: Number(id),
      },
      data: req.body,
      include: {
        category: true,
      },
    });
    res.json(model);
  } catch (error) {
    next(error);
  }
};

const deleteModel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteModel = await prisma.model.delete({
      where: {
        id: Number(id),
      },
    });
    res.json('Delete successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getModels,
  getModel,
  createModel,
  updateModel,
  deleteModel,
};
