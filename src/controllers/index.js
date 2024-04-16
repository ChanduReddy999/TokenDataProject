const {mailService,addUserService,loginService,otpVerificationService} = require("../services/index")
const { callServices } = require('./callServices')

const mailController = async(req,res)=>{
    callServices(mailService,req,res)
}
const addUserController = async(req,res)=>{
    callServices(addUserService,req,res)
}
const loginController = async(req,res)=>{
    callServices(loginService,req,res)
}
const otpVerificationController = async(req,res)=>{
    callServices(otpVerificationService,req,res)
}


module.exports = {
    mailController,addUserController,loginController,otpVerificationController
}