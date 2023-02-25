const userRoute = require("express").Router();
const sql=require("mssql");
const config=require("../../config/config")
const asyncHandler=require("express-async-handler")
const dotenv=require("dotenv");
const { upload } = require("../../files/file");
dotenv.config()
//upload image
userRoute.post("/user_image_upload",upload.single("file_path"),asyncHandler(async(req,res,next)=>{
    try{
   await sql.connect(config.config)
    .then(pool=>{
        return pool.request()
        .input("user_id",req.body.user_id)
        .input("image_path",req.file.filename)
        .execute("update_user_image")
    }).then(result=>{
        res.send({
            status:200,
            message:"success",
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
//profile preview
userRoute.post("/profile_prev",asyncHandler(async(req,res,next)=>{
    try{
   await sql.connect(config.config)
    .then(pool=>{
        return pool.request()
        .input("user_id",req.body.user_id)
        .execute("preview_profile")
    }).then(result=>{
        res.send({
            status:200,
            message:"success",
            data:result.recordset[0]
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
// trangection menu list
userRoute.post("/transaction_menu_list",asyncHandler(async(req,res,next)=>{
    try{
   await sql.connect(config.config)
    .then(pool=>{
        return pool.request()
        .input("parent_id",req.body.parent_id)
        .execute("get_transaction_menu_list_new")
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

//employe List
userRoute.post("/employe_list",asyncHandler(async(req,res,next)=>{
    try{
   await sql.connect(config.config)
    .then(pool=>{
        return pool.request()
        .input("global",req.body.global)
        .execute("list_employee_master_new")
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
//get_transaction_right
userRoute.post("/get_transaction_right",asyncHandler(async(req,res,next)=>{
    try{
   await sql.connect(config.config)
    .then(pool=>{
        return pool.request()
        .input("transaction_id",req.body.transaction_id)
        .execute("get_transaction_right")
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
userRoute.post("/get_transaction_right_employe",asyncHandler(async(req,res,next)=>{
    try{
   await sql.connect(config.config)
    .then(pool=>{
        return pool.request()
        .input("emp_id",req.body.emp_id)
        .execute("get_transaction_right_emp")
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
//user right update
userRoute.post("/update_user_right",asyncHandler(async(req,res,next)=>{
    try{
        const userRight=new sql.Table("user_rights_new")
        userRight.columns.add("user_id",sql.Int)
        userRight.columns.add("transaction_id",sql.Int)
        userRight.columns.add("view_right",sql.Bit)
        userRight.columns.add("insert_right",sql.Bit)
        userRight.columns.add("update_right",sql.Bit)
        userRight.columns.add("delete_right",sql.Bit)
        userRight.columns.add("print_right",sql.Bit)
        userRight.columns.add("approve_right",sql.Bit)
        userRight.columns.add("special_column",sql.Bit)
  req.body.userRight.forEach(element => {
    userRight.rows.add(element.user_id
        ,element.transaction_id
        ,element.view_right
        ,element.insert_right
        ,element.update_right
        ,element.delete_right
        ,element.print_right
        ,element.approve_right
        ,element.special_column
        )
    
  });

   await sql.connect(config.config)
    .then(pool=>{
        return pool.request()
        .input("transaction_id",req.body.transaction_id)
        .input("transaction_name",req.body.transaction_name)
        .input("user_rights_new",sql.TVP,userRight)
        .input("user_id",req.body.user_id)
        .execute("update_user_rights")
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
//employe
userRoute.post("/update_user_right_emp",asyncHandler(async(req,res,next)=>{
    try{
        const userRight=new sql.Table("user_rights_new")
        userRight.columns.add("user_id",sql.Int)
        userRight.columns.add("transaction_id",sql.Int)
        userRight.columns.add("view_right",sql.Bit)
        userRight.columns.add("insert_right",sql.Bit)
        userRight.columns.add("update_right",sql.Bit)
        userRight.columns.add("delete_right",sql.Bit)
        userRight.columns.add("print_right",sql.Bit)
        userRight.columns.add("approve_right",sql.Bit)
        userRight.columns.add("special_column",sql.Bit)
  req.body.userRight.forEach(element => {
    userRight.rows.add(element.user_id
        ,element.transaction_id
        ,element.view_right
        ,element.insert_right
        ,element.update_right
        ,element.delete_right
        ,element.print_right
        ,element.approve_right
        ,element.special_column
        )
    
  });

   await sql.connect(config.config)
    .then(pool=>{
        return pool.request()
        .input("emp_id",req.body.emp_id)
        .input("user_rights_new",sql.TVP,userRight)
        .input("user_id",req.body.user_id)
        .execute("update_user_rights_emp")
    }).then(result=>{
        res.send({
            status:200,
            message:"success",
        })
    }).catch(err=>{
        console.log(err)
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


//department list
userRoute.post("/department_list",asyncHandler(async (req, res) => {
    try {
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .execute("list_department");
        })
        .then((result) => {
          res.send({
            status: 200,
            message:"success",
            data:result.recordset,
           
          });
        })
        .catch((err) => {
          res.send({
            status: 400,
            message: err,
          });
        });
    } catch (error) {
      res.status(500).send({
        status: 500,
        message: error,
      });
    }
  }))

module.exports={userRoute}