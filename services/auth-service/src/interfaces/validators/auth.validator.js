const { body } = require('express-validator');

exports.registerValidator = [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('phone').isMobilePhone().withMessage('Please provide a valid phone number'),
    body('password').isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),    
]