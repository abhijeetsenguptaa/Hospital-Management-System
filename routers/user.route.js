const express = require('express');
const { registeringNewUser, loggingUser, resetPassword, staffAdditionDetail } = require('../controllers/user.controller');
const { passwordValidator } = require('../middleware/passwordValidator.middleware');
const { authentication } = require('../middleware/authentication.middleware');



const userRoute = express.Router();


userRoute.post('/register', passwordValidator, registeringNewUser);

userRoute.post('/login', loggingUser);

userRoute.patch('/reset', passwordValidator, resetPassword);

userRoute.patch('/extra', authentication, staffAdditionDetail);

module.exports = { userRoute }
