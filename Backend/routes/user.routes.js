const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware')



router.post('/register',[
  body('email').isEmail().withMessage('Invalid Message'),
  body('fullname.firstname').isLength({min:3}).withMessage('First name must be of 3 char'),
  body('password').isLength({min:6}).withMessage('password must of 6 char')  
],
userController.registerUser)


router.post('/login',[
  body('email').isEmail().withMessage('Invalid Email'),
  body('password').isLength({min:3}).withMessage('Password Length Invalid')
],userController.loginUser)

router.get('/profile',authMiddleware.authUser, userController.getUserProfile)

router.get('/logout',authMiddleware.authUser, userController.logOutUser)


module.exports = router;