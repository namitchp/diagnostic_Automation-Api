const sql = require("mssql");
const {config} = require("../../config/config");
const asyncHandler = require("express-async-handler");

exports.browsesalesquotation = asyncHandler(async (req, res, next) => {
  try {
      const { filter_value, page_number, page_size, sort_column, sort_order } =req.query;
      sql.connect(config.config)
          .then(pool => {
              return pool.request()                   
                  .input("user_id", req.body.user_id)
                  .input("chk_all", req.body.chk_all)
                  .input("type", req.body.type)
                  .input("status", req.body.status)
                  .input("mark_engg", req.body.mark_engg)
                  .input("priority_name", req.body.priority_name)                 
                  .execute("browse_quotation")
          }).then(result => {
            const data =
            result.recordset.length > 0
              ? result.recordset
                  .reverse()
                  .slice(parseInt(page_number)*parseInt(page_size), parseInt(page_size)*(parseInt(page_number)+1))
              : [];
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

exports.GetRemarksinQuotation = asyncHandler(async (req, res, next) => {
  try {
      const { filter_value, page_number, page_size, sort_column, sort_order } =req.query;
      sql.connect(config.config)
          .then(pool => {
              return pool.request()
                  .input("quotation_id", req.body.quotation_id)                   
                  .execute("get_remarks_in_quotation")
          }).then(result => {
              const data=result.recordset.length>0?result.recordset.slice(page_number*page_size):[];
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

exports.updateRemarksinQuotation= asyncHandler(async (req, res, next) => {
  try {     
      sql.connect(config.config)
          .then(pool => {
              return pool.request()                
            .input("tran_id", req.body.tran_id) 
            .input("status_id", req.body.status_id) 
            .input("remarks", req.body.remarks)   
            .input("user_id", req.body.user_id)              
            .execute("insert_quotataion_remarks");               
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

exports.generateQuotationNo = asyncHandler(async (req, res, next) => {
  try {
      const { filter_value, page_number, page_size, sort_column, sort_order } =req.query;
      sql.connect(config.config)
          .then(pool => {
              return pool.request()
                  .input("sub_quot_type", req.body.sub_quot_type)
                  .input("main_quot_id", req.body.main_quot_id)
                  .execute("generate_quot_no")
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

exports.generateSubQuotationNo = asyncHandler(async (req, res, next) => {
  try {
      const { filter_value, page_number, page_size, sort_column, sort_order } =req.query;
      sql.connect(config.config)
          .then(pool => {
              return pool.request()                    
                  .execute("generate_sub_quot_no")
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

exports.pickCostingMainInquotation = asyncHandler(async (req, res, next) => {
  try {
      const { filter_value, page_number, page_size, sort_column, sort_order } =req.query;
      sql.connect(config.config)
          .then(pool => {
              return pool.request()
              .input("mtran_id", req.body.mtran_id)                                  
              .execute("pick_costing_main_in_quotation")
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

exports.get = asyncHandler(async (req, res, next) => {
  res.send("hello")
});

exports.insertSalesQuotation = asyncHandler(async (req, res, next) => {
  try {
     
      console.log(req.body.quotationitems); 
      var tbl_quotation_details = new sql.Table("quotation_items")
      tbl_quotation_details.columns.add("mtab_id",sql.Int());
      tbl_quotation_details.columns.add("tab_id",sql.Int());
      tbl_quotation_details.columns.add("sr_no",sql.Int());
      tbl_quotation_details.columns.add("product_id",sql.Int());
      tbl_quotation_details.columns.add("mlfb_no",sql.VarChar(100));
      tbl_quotation_details.columns.add("quantity",sql.Decimal(18,2));
      tbl_quotation_details.columns.add("list_price",sql.Decimal(18,2));
      tbl_quotation_details.columns.add("lp_ref",sql.VarChar(10));
      tbl_quotation_details.columns.add("discount",sql.Decimal(18,2));
      tbl_quotation_details.columns.add("unit_price",sql.Decimal(18,2));
      tbl_quotation_details.columns.add("amount",sql.Decimal(18,2));
      tbl_quotation_details.columns.add("gp",sql.Bit);
      tbl_quotation_details.columns.add("sgst_per",sql.Decimal(18,2));
      tbl_quotation_details.columns.add("sgst_amt",sql.Decimal(18,2));
      tbl_quotation_details.columns.add("cgst_per",sql.Decimal(18,2));
      tbl_quotation_details.columns.add("cgst_amt",sql.Decimal(18,2));
      tbl_quotation_details.columns.add("igst_per",sql.Decimal(18,2));
      tbl_quotation_details.columns.add("igst_amt",sql.Decimal(18,2));     

  req.body.quotationitems.forEach((item) =>
  tbl_quotation_details.rows.add(
      item.mtab_id,
      item.tab_id,
      item.sr_no ,  
      item.product_id,
      item.mlfb_no,
      item.quantity,
      item.list_price,   
      item.lp_ref,
      item.discount,
      item.unit_price,
      item.amount,  
      item.gp,
      item.sgst_per,
      item.sgst_amt,
      item.cgst_per,   
      item.cgst_amt,
      item.igst_per,
      item.igst_amt       
    )
  );

  console.log(req.body.quotationchargesItems);    
  var tbl_quotation_charges = new sql.Table("quotation_charges")   
  tbl_quotation_charges.columns.add("charges_name",sql.VarChar(100));
  tbl_quotation_charges.columns.add("qty",sql.Decimal(18,2));
  tbl_quotation_charges.columns.add("rate",sql.Decimal(18,2));
  tbl_quotation_charges.columns.add("amount",sql.Decimal(18,2));   
  tbl_quotation_charges.columns.add("sgst_per",sql.Decimal(18,2));
  tbl_quotation_charges.columns.add("sgst_amt",sql.Decimal(18,2));
  tbl_quotation_charges.columns.add("cgst_per",sql.Decimal(18,2));
  tbl_quotation_charges.columns.add("cgst_amt",sql.Decimal(18,2));
  tbl_quotation_charges.columns.add("igst_per",sql.Decimal(18,2));
  tbl_quotation_charges.columns.add("igst_amt",sql.Decimal(18,2));  
  tbl_quotation_charges.columns.add("total_amt",sql.Decimal(18,2));   

  req.body.quotationchargesItems.forEach((item) =>
  tbl_quotation_charges.rows.add(
      item.charges_name,
      item.qty,
      item.rate,
      item.amount ,        
      item.sgst_per,
      item.sgst_amt,
      item.cgst_per,   
      item.cgst_amt,
      item.igst_per,
      item.igst_amt,    
      item.total_amt       
    )
  );
  // console.log(tbl_quotation_charges)
  // console.log(tbl_quotation_details)
      sql.connect(config.config)
          .then(pool => {
              return pool.request()
              .input("tran_id", req.body.tran_id)
              .input("date", req.body.date)  
              .input("quotation_no", req.body.quotation_no)         
              .input("equot_no", req.body.equot_no)  
              .input("sub_quot_no", req.body.sub_quot_no)  
              .input("sub_quot_type", req.body.sub_quot_type)  
              .input("main_quot_id", req.body.main_quot_id)  
              .input("multiple", req.body.multiple)  
              .input("costing_id", req.body.costing_id)
              .input("subject", req.body.subject)  
              .input("remarks", req.body.remarks)
              .input("value", req.body.value)  
    
              .input("status_id", req.body.status_id)
              .input("freight", req.body.freight)  
              .input("insurance", req.body.insurance)
              .input("octroi", req.body.date)   
              .input("ex_works", req.body.octroi)
              .input("pandf", req.body.pandf)  
              .input("loading", req.body.loading)
              .input("boarding", req.body.boarding)  
    
              .input("travel_charges", req.body.travel_charges)
              .input("conveyance", req.body.conveyance)  
              .input("excise_duty", req.body.excise_duty)
              .input("sales_tax", req.body.sales_tax)  
              .input("service_tax", req.body.service_tax)
              .input("delivery", req.body.delivery)  
              .input("validity", req.body.validity)
    
              .input("pay_terms1", req.body.pay_terms1)   
              .input("pay_terms2", req.body.pay_terms2)
              .input("pay_terms3", req.body.pay_terms3)  
              .input("pay_terms4", req.body.pay_terms4)
              .input("pay_terms5", req.body.pay_terms5)  
    
              .input("pt_per1", req.body.pt_per1)
              .input("pt_per2", req.body.pt_per2)  
              .input("pt_per3", req.body.pt_per3)
              .input("pt_per4", req.body.pt_per4)  
              .input("pt_per5", req.body.pt_per5)
    
              .input("ser_pay_terms1", req.body.ser_pay_terms1)  
              .input("ser_pay_terms2", req.body.ser_pay_terms2)
              .input("ser_pay_terms3", req.body.ser_pay_terms3)   
              .input("ser_pay_terms4", req.body.ser_pay_terms4)
              .input("ser_pay_terms5", req.body.ser_pay_terms5)  
    
              .input("ser_pt_per1", req.body.ser_pt_per1)
              .input("ser_pt_per2", req.body.ser_pt_per2)  
              .input("ser_pt_per3", req.body.ser_pt_per3)
              .input("ser_pt_per4", req.body.ser_pt_per4)  
              .input("ser_pt_per5", req.body.ser_pt_per5)
                   
              .input("quotation_items", sql.TVP, tbl_quotation_details) 
              .input("quotation_charges", sql.TVP, tbl_quotation_charges)     
              .input("user_id", req.body.user_id)
              .output("new_identity")
              .execute("insert_quotation_main_details");
          }).then(result => {
              res.send({
                  status: 200,
                  message: "success",
                  
              })
          }).catch(err => {
              console.log(err)
              res.send({
                  message:""+ err,
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