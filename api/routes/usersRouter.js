const express = require('express');

const UsersService = require('./../services/userService');
const validatorHandler = require('./../middleware/validatorHandler');
const { createUserSchema, updateUserSchema, getUserSchema } = require('./../schemas/userSchema');

const router = express.Router();
const userService = new UsersService();


// router.get('/', (req, res) => {
//   const { limit, offset } = req.query;
//   if (limit && offset) {
//     res.json({
//       limit,
//       offset,
//     });
//   } else {
//     res.send('There is not params!');
//   }
// });

// router.get('/', async (req, res) => {
//   const users = await userService.find();
//   res.json(users);
// });

router.get('/', async (req, res, next) => {
  try {
    const users = await userService.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.findOne(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newUser = await userService.create(body);
    res.status(201).json(newUser);
  }
);

router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await userService.update(id, body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const answer = await userService.delete(id);

  res.json(answer);
});

module.exports = router;
