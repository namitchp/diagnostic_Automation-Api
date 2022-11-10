const menu=require("express").Router()
require("dotenv").config()
const sql=require("mssql")
const asyncHandler=require("express-async-handler")
const config = require("../../config/config.js")

menu.get('/menu_list_level1',asyncHandler(async(req,res,next)=>{
    try
    {
        sql.connect(config.config)
        .then(pool=>{
            return pool
            .request()
            .input("user_id",req.query.user_id)
            .execute("menu_list_level1")
        }).then(result=>{
            res.send({
                status:200,
                message:"success",
                data:result.recordset,
                
            })
        }).catch(err=>{
            res.send({
                message:err,
                status:400
    
            })
        })

    }catch(err){
        res.send({
            message:err,
            status:500

        })
    }
}))

menu.post('/menu_list_level2',asyncHandler(async(req,res,next)=>{
    try
    {
        sql.connect(config.config)
        .then(pool=>{
            return pool
            .request()
            .input("user_id",req.body.user_id)
            .input("parent_id",req.query.menu_id)
            .execute("menu_list_level2")
        }).then(result=>{
            res.send({
                status:200,
                message:"success",
                data:result.recordset,
                
            })
        }).catch(err=>{
            res.send({
                message:err,
                status:400
    
            })
        })

    }catch(err){
        res.send({
            message:err,
            status:500

        })
    }
}))

menu.post('/menu_list_level3',asyncHandler(async(req,res,next)=>{
    try
    {
        sql.connect(config.config)
        .then(pool=>{
            return pool
            .request()
            .input("user_id",req.body.user_id)
            .input("parent_id",req.query.menu_id)
            .execute("menu_list_level3")
        }).then(result=>{
            res.send({
                status:200,
                message:"success",
                data:result.recordset,
                
            })
        }).catch(err=>{
            res.send({
                message:err,
                status:400
    
            })
        })

    }catch(err){
        res.send({
            message:err,
            status:500

        })
    }
}))


module.exports={menu}