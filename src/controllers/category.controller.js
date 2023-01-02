// const { model } = require('../models/prisma');
const prisma = require('../models/prisma');

const getCategories = async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany({
      include: { model: true },
    });
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

const getCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: {
        id: Number(id),
      },
      include: { model: true },
    });
    res.json(category);
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const category = await prisma.category.create({
      data: {
        name: name,
      },
    });
    res.json(category);
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.update({
      where: {
        id: Number(id),
      },
      data: req.body,
    });
    res.json(category);
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteCategory = await prisma.category.delete({
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
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
