const express = require('express')
const { mailController,addUserController,loginController,otpVerificationController } =require('../controllers/index')
router  = express.Router()
router.post('/mail',mailController)
router.post('/addUser',addUserController)
router.post('/login',loginController)
router.put('/otp',otpVerificationController)

module.exports =router