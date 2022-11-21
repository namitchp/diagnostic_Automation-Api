const userRoute = require("express").Router();
const sql=require("mssql");
const config=require("../../config/config")
const asyncHandler=require("express-async-handler")
const dotenv=require("dotenv")
dotenv.config()

userRoute.get("/date_filter",asyncHandler(async(req,res,next)=>{
    try{
   await sql.connect(config.config)
    .then(pool=>{
        return pool.request()
        .input("user_id",req.query.user_id)
        .execute("current_fy")
    }).then(result=>{
        res.send({
            status:200,
            message:"success",
            data:result.recordset
        })
    }).catch(err=>{
        res.send({
            message:err,
            status:400
        })
    })

    }catch(err){
        res.send({
            status:500,
            message:err
        })
    }
}));
userRoute.post("/insert_date_filter",asyncHandler(async(req,res,next)=>{
    try{
  await  sql.connect(config.config)
    .then(pool=>{
        return pool
        .request()
        .input("user_id",req.body.user_id)
        .input("from_date",req.body.from_date)
        .input("to_date",req.body.to_date)
        .execute("update_user_date_filter")
    }).then(result=>{
        res.status(200).json({
            status:200,
            message:"success",
        })
    }).catch(err=>{
        res.status(400).json({
            message:err,
            status:400
        })
    })

    }catch(err){
        res.status(500).json({
            status:500,
            message:err
        })
    }
}));



module.exports={userRoute}