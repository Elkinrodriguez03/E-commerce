const express = require('express');

const CategoryService = require('./../services/categoryService');
const validatorHandler = require('./../middleware/validatorHandler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('./../schemas/categorySchema');

const router = express.Router();
const categoryService = new CategoryService();

router.get('/', async (req, res, next) => {
  try {
    const categories = await categoryService.find();
    res.json(categories);
  } catch (error) {
      next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await categoryService.findOne(id);
    res.json(category);
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await categoryService.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await categoryService.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const answer = await categoryService.delete(id);
  res.json(answer);
});

module.exports = router;
