const sql = require("mssql");
const {config} = require("../../config/config");
const asyncHandler = require("express-async-handler");
exports.browseEnquiry= asyncHandler(async (req, res) => {
    try {
      const { filter_value, page_number, page_size, sort_column, sort_order } =
        req.query;
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("user_id", req.body.user_id)
            .input("chk_all", req.body.chk_all)
            .input("company_name", req.body.company_name)
            .input("type", req.body.type)
            .input("status", req.body.status)
            .input("mark_engg", req.body.mark_engg)
            // .input("global", filter_value)
            .execute("browse_enquiry");
        })
        .then((result) => {
          const data =
            result.recordset.length > 0
              ? result.recordset.slice(
                  (page_number - 1) * page_size,
                  page_number * page_size
                )
              : [];
          res.send({
            status: 200,
            data: data,
            totalRecords: result.recordset.length,
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
  });
  enquiry.post('/insertenquirymain',async (req, res, next) => {

    try {
        let sales = new sql.Table("trabody");
        sales.columns.add("enquiry_no", sql.VarChar(50));
        sales.columns.add("company_id", sql.nVarChar(50));
        sales.columns.add("comapany_name", sql.VarChar(50));
        sales.columns.add("cperson_name", sql.nVarChar(50));
        sales.columns.add("type", sql.nVarchar(50));
        sales.columns.add("priority_id", sql.nvarchar(50));
        sales.columns.add("priority_name", sql.nvarchar(50));
        sales.columns.add("reference_id", sql.nvarchar(50));
        sales.columns.add("reference_name", sql.nvarchar(50));
        sales.columns.add("status_id", sql.nvarchar(50));
        sales.columns.add("status", sql.nvarchar(50));
        sales.columns.add("employe_id", sql.nvarchar(50));
        sales.columns.add("employe_name", sql.nvarchar(50));
        sales.columns.add("description", sql.nvarchar(200));
        sales.columns.add("cm_id", sql.navarchar(100));
        sales.columns.add("user_id", sql.nvarchar(100));
        sales.columns.add("datetime", sql.DateTime(100));

        req.body.insertenquirymain.forEach(item => {

            sales.rows.add(

                item.enquiry_no,
                item.company_id,
                item.company_name,
                item.cperson_name,
                item.type,
                item.priority_id,
                item.priority_name,
                item.reference_id,
                item.reference_name,
                item.status_id,
                item.status,
                item.employe_id,
                item.employe_name,
                item.description,
                item.cm_id,
                item.user_id,
                item.datetime
            )

            sql.connect(config.config).then(
                pool => {
                    return pool

                        .request()
                        .input("tran_id", req.body.tran_id)
                        .input("date", req.body.date)
                        .input("enquiry_no", req.body.enquiry_no)
                        .input("company_id", req.body.company_id)
                        .input("company_name", req.body.company_name)
                        .input("type", req.body.type)
                        .input("priority_id", req.body.priority_id)
                        .input("priority_name", req.body.priority_name)
                        .input("reference_id", req.body.reference_id)
                        .input("reference_name", req.body.reference_name)
                        .input("status_id", req.body.status_id)
                        .input("status", req.body.status)
                        .input("employe_id", req.body.employe_id)
                        .input("employe_name", req.body.employe_name)
                        .input("description", req.body.description)
                        .input("cm_id", req.body.cm_id)
                        .input("user_id", req.body.user_id)
                        .input("datetime", req.body.datetime)
                        .input("enquiry_main", sql.TVP.sales)
                        .output("new_identity")
                        .execute("insert_enquiry_main_details")
                }).then(result => {
                    res.send({
                        status: 200,
                        message: "success",
                        result:result
                    })
                }).catch(err => {
                    console.log(err);
                    res.send({
                        message: err,
                        status: 400
                    })
                })
        })
    }

    catch (err) {
        console.log(err + "");
        res.send({
            message: err + "",
            status: 500


        })
    }
})


enquiry.post('/browsecosting', async (req, res, next) => {
    try {
        const { filter_value, page_number, page_size, sort_column, sort_order } =
            req.query;
        sql.connect(config.config)
            .then(pool => {
                return pool
                    .request()
                    .input("user_Id", req.body.user_id)
                    .input("chk_all", req.body.chk_all)
                    .input("type", req.body.type)
                    .input("status", req.body.status)
                    .input("mark_engg", req.body.mark_engg)
                    .input("company_name", req.body.company_name)


                    .execute("browse_costing")
            }).then(result => {
                const data =
                    result.recordset.length > 0
                        ? result.recordset.slice(
                            (page_number - 1) * page_size,
                            page_number * page_size
                        )
                        : [];
                res.send({
                    status: 200,
                    message: "success",
                    data: data,
                    totalrecord: result.recordset.length,
                })
            })

    } catch (err) {
        res.send({
            message: err,
            status: 500

        })
    }
});
module.exports={enquiry}






enquiry.post('/insertenquirymaindetail', async(req, res, next) => {

    try {
       
            sql.connect(config.config).then(
                pool => {
                    return pool

                        .request()
                        .input("tran_id", req.body.tran_id)
                        .input("enquiry_no", req.body.enquiry_no)
                        .input("company_id", req.body.company_id)
                        .input("company_name", req.body.company_name)
                        .input("date", req.body.date)
                        .input("cperson_id", req.body.cperson_id)
                        .input("cperson_name", req.body.cperson_name)
                        .input("description", req.body.description)
                        .input("type_id", req.body.type_id)
                        .input("type", req.body.type)
                        .input("priority_id", req.body.priority_id)
                        .input("priority_name", req.body.priority_name)
                        .input("reference_id", req.body.reference_id)
                        .input("reference_name", req.body.reference_name)
                        .input("employee_id", req.body.employee_id)
                        .input("employee_name", req.body.employee_name)
                        .input("user_id", req.body.user_id)
                        .input("status", req.body.status)
                        .output("new_identity")
                        .execute("insert_enquiry_main_details")
                }).then(result => {
                    res.send({
                        status: 200,
                        message: "success",
                        result:result
                    })
                }).catch(err => {
                    console.log(err);
                    res.send({
                        message: err,
                        status: 400
                    })
                })
                }

    catch (err) {
        console.log(err + "");
        res.send({
            message: err + "",
            status: 500


        })
    }})

module.exports={enquiry}





enquiry.post('/previewenquiry', async (req, res, next) => {
    try {
        const { filter_value, page_number, page_size, sort_column, sort_order } =req.query;
        sql.connect(config.config)
            .then(pool => {
                return pool.request()
                .input("enquiryid", req.body.enquiryid)
                    .execute("preview_sales_enquiry")
            }).then(result => {
                res.send({
                    status: 200,
                    message: "success",
                    totaldata: result.recordset
                
                })
            }).catch(err => {
                res.send({
                    message: err,
                    status: 400
                })
            })

    } catch (err) {
        res.send({
            message: err,
            status: 500
        })
    }
});



enquiry.delete('/deleteenquiry',async(req,res,next)=>{
    try
    {
        const {pageSize,pageNo,filterValue}=req.query 
        sql.connect(config.config)
        .then(pool=>{
            return pool
            .request()
            .input("tran_Id",req.body.tran_id)
            .execute("delete_enquiry")
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
})





enquiry.post('/cp_person_enquiry', async (req, res, next) => {
    try {
        const { filter_value, page_number, page_size, sort_column, sort_order } =req.query;
        sql.connect(config.config)
            .then(pool => {
                return pool.request()
                .input("company_id",req.body.company_id)
            .execute("select_cperson_in_enquiry")
            }).then(result => {
                res.send({
                    status: 200,
                    message: "success",
                    totaldata: result.recordset
                
                })
            }).catch(err => {
                res.send({
                    message: err,
                    status: 400
                })
            })

    } catch (err) {
        res.send({
            message: err,
            status: 500
        })
    }
});




enquiry.post('/previewenquirydetail', async (req, res, next) => {
    try {
        const { filter_value, page_number, page_size, sort_column, sort_order } =req.query;
        sql.connect(config.config)
            .then(pool => {
                return pool.request()
                .input("enquiry_id",req.body.enquiry_id)
            .execute("preview_enquiry_details")
            }).then(result => {
                res.send({
                    status: 200,
                    message: "success",
                    totaldata: result.recordset
                
                })
            }).catch(err => {
                res.send({
                    message: err,
                    status: 400
                })
            })

    } catch (err) {
        res.send({
            message: err,
            status: 500
        })
    }
});





enquiry.post('/previewenquirymain', async (req, res, next) => {
    try {
        const { filter_value, page_number, page_size, sort_column, sort_order } =req.query;
        sql.connect(config.config)
            .then(pool => {
                return pool.request()
                .input("enquiry_id",req.body.enquiry_id)
            .execute("preview_enquiry_main")
            }).then(result => {
                res.send({
                    status: 200,
                    message: "success",
                    totaldata: result.recordset
                
                })
            }).catch(err => {
                res.send({
                    message: err,
                    status: 400
                })
            })

    } catch (err) {
        res.send({
            message: err,
            status: 500
        })
    }
});


enquiry.post('/previewenqpriority', async (req, res, next) => {
    try {
        const { filter_value, page_number, page_size, sort_column, sort_order } =req.query;
        sql.connect(config.config)
            .then(pool => {
                return pool.request()
                .input("enq_priority_id",req.body.enq_priority_id)
            .execute("preview_enq_priority")
            }).then(result => {
                res.send({
                    status: 200,
                    message: "success",
                    totaldata: result.recordset
                
                })
            }).catch(err => {
                res.send({
                    message: err,
                    status: 400
                })
            })

    } catch (err) {
        res.send({
            message: err,
            status: 500
        })
    }
});




enquiry.post('/previewenqref', async (req, res, next) => {
    try {
        const { filter_value, page_number, page_size, sort_column, sort_order } =req.query;
        sql.connect(config.config)
            .then(pool => {
                return pool.request()
                .input("enq_ref_id",req.body.enq_ref_id)
            .execute("preview_enq_ref")
            }).then(result => {
                res.send({
                    status: 200,
                    message: "success",
                    totaldata: result.recordset
                
                })
            }).catch(err => {
                res.send({
                    message: err,
                    status: 400
                })
            })

    } catch (err) {
        res.send({
            message: err,
            status: 500
        })
    }
});



enquiry.post('/previewenqstatus', async (req, res, next) => {
    try {
        const { filter_value, page_number, page_size, sort_column, sort_order } =req.query;
        sql.connect(config.config)
            .then(pool => {
                return pool.request()
                .input("status_id",req.body.status_id)
            .execute("preview_enq_status")
            }).then(result => {
                res.send({
                    status: 200,
                    message: "success",
                    totaldata: result.recordset
                
                })
            }).catch(err => {
                res.send({
                    message: err,
                    status: 400
                })
            })

    } catch (err) {
        res.send({
            message: err,
            status: 500
        })
    }
});




enquiry.post('/previewenqtype', async (req, res, next) => {
    try {
        const { filter_value, page_number, page_size, sort_column,sort_order } =req.query;
        sql.connect(config.config)
            .then(pool => {
                return pool.request()
                .input("enq_type_id",req.body.enq_type_id)
            .execute("[preview_enq_type]")
            }).then(result => {
                res.send({
                    status: 200,
                    message: "success",
                    totaldata: result.recordset
                
                })
            }).catch(err => {
                res.send({
                    message: err,
                    status: 400
                })
            })

    } catch (err) {
        res.send({
            message: err,
            status: 500
        })
    }
});



enquiry.post('/previewenqupload', async (req, res, next) => {
    try {
        const { filter_value, page_number, page_size, sort_column,sort_order } =req.query;
        sql.connect(config.config)
            .then(pool => {
                return pool.request()
                .input("tran_id",req.body.tran_id)
            .execute("[preview_enquiry_upload]")
            }).then(result => {
                res.send({
                    status: 200,
                    message: "success",
                    totaldata: result.recordset
                
                })
            }).catch(err => {
                res.send({
                    message: err,
                    status: 400
                })
            })

    } catch (err) {
        res.send({
            message: err,
            status: 500
        })
    }
});



enquiry.post('/browseenqpriority', async (req, res, next) => {
    try {
        const { filter_value, page_number, page_size, sort_column,sort_order } =req.query;
        sql.connect(config.config)
            .then(pool => {
                return pool.request()
            .execute("[browse_enq_priority]")
            }).then(result => {
                res.send({
                    status: 200,
                    message: "success",
                    totaldata: result.recordset
                
                })
            }).catch(err => {
                res.send({
                    message: err,
                    status: 400
                })
            })

    } catch (err) {
        res.send({
            message: err,
            status: 500
        })
    }
});


enquiry.post('/browseenqref', async (req, res, next) => {
    try {
        const { filter_value, page_number, page_size, sort_column,sort_order } =req.query;
        sql.connect(config.config)
            .then(pool => {
                return pool.request()
            .execute("[browse_enq_ref]")
            }).then(result => {
                res.send({
                    status: 200,
                    message: "success",
                    totaldata: result.recordset
                
                })
            }).catch(err => {
                res.send({
                    message: err,
                    status: 400
                })
            })

    } catch (err) {
        res.send({
            message: err,
            status: 500
        })
    }
});

enquiry.post('/browseenqstatus', async (req, res, next) => {
    try {
        const { filter_value, page_number, page_size, sort_column,sort_order } =req.query;
        sql.connect(config.config)
            .then(pool => {
                return pool.request()
            .execute("[browse_enq_status]")
            }).then(result => {
                res.send({
                    status: 200,
                    message: "success",
                    totaldata: result.recordset
                
                })
            }).catch(err => {
                res.send({
                    message: err,
                    status: 400
                })
            })

    } catch (err) {
        res.send({
            message: err,
            status: 500
        })
    }
});
enquiry.post('/browseenqtype', async (req, res, next) => {
    try {
        const { filter_value, page_number, page_size, sort_column,sort_order } =req.query;
        sql.connect(config.config)
            .then(pool => {
                return pool.request()
            .execute("[browse_enq_type]")
            }).then(result => {
                res.send({
                    status: 200,
                    message: "success",
                    totaldata: result.recordset
                
                })
            }).catch(err => {
                res.send({
                    message: err,
                    status: 400
                })
            })

    } catch (err) {
        res.send({
            message: err,
            status: 500
        })
    }
});
enquiry.post('/getcomment', async (req, res, next) => {
    try {
        const { filter_value, page_number, page_size, sort_column,sort_order } =req.query;
        sql.connect(config.config)
            .then(pool => {
                return pool.request()

                .input("enquiry_id",req.body.enquiry_id)
            .execute("[get_remarks_in_salesenquiry]")
            }).then(result => {
                res.send({
                    status: 200,
                    message: "success",
                    totaldata: result.recordset
                
                })
            }).catch(err => {
                res.send({
                    message: err,
                    status: 400
                })
            })

    } catch (err) {
        res.send({
            message: err,
            status: 500
        })
    }
});
module.exports={enquiry}