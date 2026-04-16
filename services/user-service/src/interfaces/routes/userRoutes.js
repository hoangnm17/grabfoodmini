const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const userRoutes = (userController) => {
  const router = express.Router();

  router.get('/me', authMiddleware, userController.getProfile);
  router.put('/me', authMiddleware, userController.updateProfile);

  return router;
};

module.exports = userRoutes;
