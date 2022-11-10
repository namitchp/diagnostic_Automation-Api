const sql = require("mssql");
const config = require("../../../config/config.js")
const asyncHandler = require("express-async-handler")

exports.getMrn = asyncHandler(async (req, res, next) => {
    res.send("mrn Get")
});
exports.browseMrnDc = asyncHandler(async (req, res, next) => {
    try {
        const { filter_value, page_number, page_size, sort_column, sort_order } =req.query;
        sql.connect(config.config)
            .then(pool => {
                return pool.request()
                    .input("user_id", req.body.user_id)
                    .input("chk_all", req.body.chk_all)
                    .execute("browse_mrn")
            }).then(result => {
                const data=result.recordset.length>0?result.recordset.slice(((page_number-1)*page_size),page_number*page_size):[];
                res.send({
                    status: 200,
                    message: "success",
                    totaldata: result.recordset.length,
                    data: data
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
exports.browseMrnPo = asyncHandler(async (req, res, next) => {
    try {
        const { filter_value, page_number, page_size, sort_column, sort_order } =req.query;
        sql.connect(config.config)
            .then(pool => {
                return pool.request()
                    .input("user_id", req.body.user_id)
                    .input("chk_all", req.body.chk_all)
                    .input("status", req.body.status)
                    .execute("browse_mrn_po")
            }).then(result => {
                const data=result.recordset.length>0?result.recordset.slice(((page_number-1)*page_size),page_number*page_size):[];
                res.send({
                    status: 200,
                    message: "success",
                    totaldata: result.recordset.length,
                    data: data
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
exports.prevMrnMainDetailDc = asyncHandler(async (req, res, next) => {
    try {
        const { filter_value, page_number, page_size, sort_column, sort_order } =req.query;
        sql.connect(config.config)
            .then(pool => {
                return pool.request()
                    .input("tran_id", req.body.tran_id)
                    .execute("preview_Mrn_main_details_dc")
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
exports.prevMrnItemDetailDc = asyncHandler(async (req, res, next) => {
    try {
        const { filter_value, page_number, page_size, sort_column, sort_order } =req.query;
        sql.connect(config.config)
            .then(pool => {
                return pool.request()
                    .input("mtran_id", req.body.mtran_id)
                    .execute("preview_Mrn_item_details_dc")
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
exports.insertMrnMainDetailDc = asyncHandler(async (req, res, next) => {
    try {
      let mrndetail=new sql.Table("mdetail");
    //   mrndetail.columns.add("tran_id",sql.Int);
      mrndetail.columns.add("product_id",sql.Int);
      mrndetail.columns.add("item_id",sql.Int);
      mrndetail.columns.add("item_name",sql.VarChar(50));
      mrndetail.columns.add("description",sql.VarChar(sql.MAX));
      mrndetail.columns.add("serial_no",sql.VarChar(50));
      mrndetail.columns.add("mlfb_no",sql.VarChar(50));
      mrndetail.columns.add("qty",sql.Decimal(18,0));
      mrndetail.columns.add("dc_tran_id",sql.Int);
      mrndetail.columns.add("soi_tran_id",sql.Int);
      console.log(mrndetail);
     req.body.mrndetailList.forEach(item => {
        mrndetail.rows.add(
            
            item.product_id,
            item.item_id,
            item.item_name,
            item.description,
            item.serial_no,
            item.mlfb_no,
            item.qty,
            item.dc_tran_id,
            item.soi_tran_id
        )
        
     });


        sql.connect(config.config)
            .then(pool => {
                return pool.request()
                    .input("tran_id", req.body.tran_id)
                    .input("mrn_no", req.body.mrn_no)
                    .input("company_id", req.body.company_id)
                    .input("company_name", req.body.company_name)
                    .input("cperson_id", req.body.cperson_id)
                    .input("cperson_name", req.body.cperson_name)
                    .input("po_company_id", req.body.po_company_id)
                    .input("po_company_name", req.body.po_company_name)
                    .input("po_id", req.body.po_id)
                    .input("po_no", req.body.po_no)
                    .input("po_date", req.body.po_date)
                    .input("employee_id", req.body.employee_id)
                    .input("employee_name", req.body.employee_name)
                    .input("department_id", req.body.department_id)
                    .input("department_name", req.body.department_name)
                    .input("courier_name", req.body.courier_name)
                    .input("status", req.body.status)
                    .input("remarks", req.body.remarks)
                    .input("docket_no", req.body.docket_no)
                    .input("docket_date", req.body.docket_date)
                    .input("invoice_no", req.body.invoice_no)
                    .input("invoice_date", req.body.invoice_date)
                    .input("godown_id", req.body.godown_id)
                    .input("user_id", req.body.user_id)
                    .input("user_name", req.body.user_name)
                    .input("mrndetails", sql.TVP,mrndetail)
                    .output("new_identity")
                    .execute("insert_Mrn_main_details_dc")
            }).then(result => {
                res.send({
                    status: 200,
                    message: "success",
                })
            }).catch(err => {
                res.send({
                    message: err,
                    status: 400
                })
            })

    } catch (err) {
        res.send({
            message: err+"",
            status: 500
        })
    }
});
exports.pickDcInMrn  = asyncHandler(async (req, res, next) => {
    try {
        // const { filter_value, page_number, page_size, sort_column, sort_order } =req.query;
        sql.connect(config.config)
            .then(pool => {
                return pool.request()
                    .execute("pick_dc_in_mrn")
            }).then(result => {
                res.send({
                    status: 200,
                    message: "success",
                    data: result.recordset
                
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
exports.DcDetailInMrn = asyncHandler(async (req, res, next) => {
    try {
        // const { filter_value, page_number, page_size, sort_column, sort_order } =req.query;
        sql.connect(config.config)
            .then(pool => {
                return pool.request()
                .input("dc_id",req.query.dc_id)
                    .execute("dc_detail_in_mrn")
            }).then(result => {
                res.send({
                    status: 200,
                    message: "success",
                    data: result.recordset
                
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