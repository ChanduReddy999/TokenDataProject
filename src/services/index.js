// const axios = require('axios')
const nodemailer = require('nodemailer')
// const mysql = require('mysql2')
const {addUserModel,loginModel,otpVerificationModel} = require('../models/index')

const loginService = async (req) => {
  try {
      const email = req.body.email;
      const password = req.body.password;

      const result = await loginModel(email, password);

      if (result.data.length > 0) {
          // If data array is not empty, login is successful
          console.log("Login success:", result);
          return { status: 200, message: "Login successful", data: result.data };
      } else {
          // If data array is empty, login failed
          console.log("Login failed:", result);
          return { status: 301, message: "Login failed", data: [] };
      }
  } catch (error) {
      // If an error occurs during login process
      console.error("Error during login:", error);
      return { status: 300, message: "Error during login", data: [] };
  }
};


const addUserService = async (req) => {
    try {
        const name = req.body.name
        const email =  req.body.email
        const password = req.body.password
        const otp = await RandomOTP()
        const result = await addUserModel(name,email,password,otp,callback(email,password))
        mailService()
        return { status: 200, message: "success", data: [] }
    } catch (error) {
        return { status: 300, message: "error", data: [] }
    }
}

const RandomOTP = ()=>{
  var OTP=''
  for(var i=0; i<6; i++){
    var a = Math.floor(Math.random()*10)
    var a = a.toString()
    OTP = OTP+a
  }
  return OTP
}


const mailService = async () => {
  var OneTimePassword = await RandomOTP()
  try {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'anilreddydwaram@gmail.com',
        pass: 'xbwm ajsr vjsn oqhw'
      }
    });

    var mailOptions = {
      from: 'anilreddydwaram@gmail.com',
      to: 'cmfriend111@gmail.com',
      subject: 'OTP for Verification',
      html: `<h1>DemoProject</h1>
      <p>Hello,This is your OTP ${OneTimePassword} to Verify your account</p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    return { status: 200, message: "success", data: [] }
  } catch (error) {
    return { status: 300, message: "error", data: [] }
  }
}

const otpVerificationService = async(req)=>{
  try {
    const email = req.body.email;
    const password = req.body.password;
    const otp = req.body.otp
    const result = await otpVerificationModel(email, password,otp,callback(email));
    return { status: 200, message: "success", data: [] }
  } catch (error) {
      return { status: 300, message: "error", data: [] }
  }
}




module.exports = {
    mailService,addUserService,loginService, otpVerificationService
 }
