const express = require('express');
const { registeringNewUser, loggingUser, resetPassword } = require('../controllers/user.controller');
const { passwordValidator } = require('../middleware/passwordValidator.middleware');



const userRoute = express.Router();


userRoute.post('/register', passwordValidator, registeringNewUser);

userRoute.post('/login', loggingUser);

userRoute.patch('/reset', passwordValidator, resetPassword);

module.exports = { userRoute }
