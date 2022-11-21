const mdc=require("express").Router()
require("dotenv").config()
const sql=require("mssql")
const config=require('../../../../config/config.js')
const asyncHandler=require("express-async-handler")

mdc.post('/browsemdc',asyncHandler(async(req,res,next)=>{
    try
    {
        const { filter_value, page_number, page_size, sort_column, sort_order } =
        req.query;
        sql.connect(config.config)
        .then(pool=>{
            return pool
            .request()
            .input("user_Id",req.body.user_id)
            .input("chk_all",req.body.chk_all)
            .input("approval",req.body.approval)
            .input("status",req.body.status)
            .input("global",filter_value)
            .execute("browse_mdc")
        }).then(result=>{
            const data =
            result.recordset.length > 0
              ? result.recordset.slice(
                  (page_number - 1) * page_size,
                  page_number * page_size
                )
              : [];
            res.send({
                status:200,
                message:"success",
                data:data,
                totalrecord:result.recordset.length,
            })
        })

    }catch(err){
        res.send({
            message:err,
            status:500

        })
    }
}))
mdc.post('/picksomdc',asyncHandler(async(req,res,next)=>{
    try
    {
        const {search}=req.query 
        sql.connect(config.config)
        .then(pool=>{
            return pool
            .request()
            .input("search",search)
            .execute("pick_so_in_mdc")
        }).then(result=>{
            const data =
            result.recordset.length > 0
              ? result.recordset.slice(0,10
                )
              : [];
            // const data=result.recordset.length > 0 ?result.recordset.slice((pageNo-1)*pageSize,pageNo*pageSize):[];
            res.send({
                status:200,
                message:"success",
                result:data,
            })
        })

    }catch(err){
        res.send({
            message:err,
            status:500

        })
    }
}))
mdc.post('/reportmdc',asyncHandler(async(req,res,next)=>{
    try
    {
        const {pageSize,pageNo,filterValue}=req.query 
        sql.connect(config.config)
        .then(pool=>{
            return pool
            .request()
            .input("tran_Id",req.body.tran_id)
            .execute("report_manufacturing_dc")
        }).then(result=>{
            // const data=result.recordset.length > 0 ?result.recordset.slice((pageNo-1)*pageSize,pageNo*pageSize):[];
            res.send({
                status:200,
                message:"success",
                result:result.recordset,
            })
        })

    }catch(err){
        res.send({
            message:err,
            status:500

        })
    }
}))
mdc.delete('/deletemdc',asyncHandler(async(req,res,next)=>{
    try
    {
        const {pageSize,pageNo,filterValue}=req.query 
        sql.connect(config.config)
        .then(pool=>{
            return pool
            .request()
            .input("tran_Id",req.body.tran_id)
            .execute("delete_manufacturing_DC")
        }).then(result=>{
            // const data=result.recordset.length > 0 ?result.recordset.slice((pageNo-1)*pageSize,pageNo*pageSize):[];
            res.send({
                status:200,
                message:"success",
            })
        })

    }catch(err){
        res.send({
            message:err,
            status:500

        })
    }
}))
mdc.put('/editmdc',asyncHandler(async(req,res,next)=>{
    try
    {
        sql.connect(config.config)
        .then(pool=>{
            return pool
            .request()
            .input("tran_id", req.body.tran_id)
            .input("date", req.body.date)
            .input("dc_no", req.body.dc_no)
            .input("so_id", req.body.so_id)
            .input("company_id", req.body.company_id)
            .input("company_name", req.body.company_name)
            .input("cperson_id", req.body.cperson_id)
            .input("cperson_name", req.body.cperson_name)
            .input("po_no", req.body.po_no)
            .input("po_date", req.body.po_date)
            .input("carrier", req.body.carrier)
            .input("vehicle", req.body.vehicle)
            .input("remarks", req.body.remarks)
            .input("noofbox", req.body.noofbox)
            .input("value", req.body.value)
            .input("user_id", req.body.user_id)
            .input("user_name", req.body.user_name)
            .output("new_identity")
            .execute("insert_manufacturing_DC")
        }).then(result=>{
            res.send({
                status:200,
                message:"success",
                result:result.recordset
            })
        })

    }catch(err){
        res.send({
            message:err +"",
            status:500

        })
    }
}))
mdc.post('/insertmdc',async(req,res,next)=>{
    try{
        let manulist=new sql.Table("manu_dc_detail");

        manulist.columns.add("box_no",sql.VarChar(50));
        manulist.columns.add("description",sql.VarChar(sql.MAX));
        manulist.columns.add("qty",sql.Decimal(18,0));
       req.body.manuDcDetail.forEach(item => {
            manulist.rows.add(
                item.box_no,
                item.description,
                item.qty)
        });
        sql.connect(config.config)
        .then(pool=>{

            return pool
          
            .request()
            .input("tran_id", req.body.tran_id)
            .input("date", req.body.date)
            .input("dc_no", req.body.dc_no)
            .input("so_id", req.body.so_id)
            .input("company_id", req.body.company_id)
            .input("company_name", req.body.company_name)
            .input("cperson_id", req.body.cperson_id)
            .input("cperson_name", req.body.cperson_name)
            .input("po_no", req.body.po_no)
            .input("po_date", req.body.po_date)
            .input("carrier", req.body.carrier)
            .input("vehicle", req.body.vehicle)
            .input("remarks", req.body.remarks)
            .input("noofbox", req.body.noofbox)
            .input("value", req.body.value)
            .input("user_id", req.body.user_id)
            .input("user_name", req.body.user_name)
            .input("manu_dc_detail", sql.TVP, manulist)
            .output("new_identity")
            .execute("insert_manufacturing_DC")
        }).then(result=>{
            res.send({
                status:200,
                message:"success",
                id_no:result.output.new_identity
            
            })
        }).catch(err=>{
            console.log(err );
            res.send({
                message:err,
                status:400
        });
    });

    }catch(err){
        console.log(err +"");
        res.send({
            message:err+"",
            status:500

        })
    }
});
mdc.get('/accountlist',async(req,res,next)=>{
    try{   
        sql.connect(config.config)
        .then(pool=>{
            return pool
            .request()
            .input("search", req.query.search)
            .execute("list_account_company")
        }).then(result=>{
            res.send({
                status:200,
                message:"success",
               result :result.recordset,
               totalresult:result.recordset.length
            
            })
        }).catch(err=>{
            console.log(err );
            res.send({
                message:err,
                status:400
        });
    });

    }catch(err){
        console.log(err +"");
        res.send({
            message:err+"",
            status:500

        })
    }
});
mdc.post('/accountcontactlist',async(req,res,next)=>{
    try{  
        sql.connect(config.config)
        .then(pool=>{

            return pool
          
            .request()
          
            .input("search", req.body.search)
            .execute("list_account_contact")
        }).then(result=>{
            res.send({
                status:200,
                message:"success",
               result :result.recordset[0]
            
            })
        }).catch(err=>{
            console.log(err );
            res.send({
                message:err,
                status:400
        });
    });

    }catch(err){
        console.log(err +"");
        res.send({
            message:err+"",
            status:500

        })
    }
});
module.exports={mdc}