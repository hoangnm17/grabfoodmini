require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// Repositories
const UserProfileRepository = require('./src/infrastructure/repositories/userProfileRepository');

// Use Cases
const GetMyProfileUseCase = require('./src/application/GetMyProfileUseCase');
const UpdateMyProfileUseCase = require('./src/application/UpdateMyProfileUseCase');

// Controllers
const UserController = require('./src/interfaces/controllers/userController');

// Routes
const userRoutes = require('./src/interfaces/routes/userRoutes');

const app = express();
app.use(express.json());

// 1. Initialize Repositories 
const userProfileRepository = new UserProfileRepository();

// 2. Initialize Use Cases 
const getMyProfileUseCase = new GetMyProfileUseCase(userProfileRepository);
const updateMyProfileUseCase = new UpdateMyProfileUseCase(userProfileRepository);

// 3. Initialize Controllers 
const userController = new UserController(
  getMyProfileUseCase,
  updateMyProfileUseCase
);

// 4. Setup Routes
app.use('/users', userRoutes(userController));

// Global Error Handler
const errorHandlerMiddleware = require('./src/interfaces/middlewares/errorHandlerMiddleware');
app.use(errorHandlerMiddleware);

// 5. Start DB & Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('User Service connected to MongoDB');
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`User Service is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });