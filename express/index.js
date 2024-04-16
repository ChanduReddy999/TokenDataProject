const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { endpoint }  = require('../config')
const router = require('../src/routes/index')

module.exports = () => {
    const app = express();
    app.use(cors());
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());
    app.use((error,request,response,next)=>{
        if (error !== null){
            return response.json({status:401,message:"Invalid json",error:error});
        }
        next();
    });
    app.use(endpoint,router)
    return app;
}