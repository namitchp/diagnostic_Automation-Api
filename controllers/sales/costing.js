const sql = require("mssql");
const {config} = require("../../config/config");
const asyncHandler = require("express-async-handler");

exports.browseCosting= asyncHandler(async (req, res) => {
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
            .execute("browse_costing");
        })
        .then((result) => {
           const data =
          result.recordset.length > 0
            ? result.recordset
                .reverse()
                .slice(parseInt(page_number)*parseInt(page_size), parseInt(page_size)*(parseInt(page_number)+1))
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
  exports.currentFy=asyncHandler(async (req, res, next) => {
    try {
        const { filter_value, page_number, page_size, sort_column,sort_order } =req.query;
        sql.connect(config)
            .then(pool => {
                return pool.request()

                .input("user_id",req.body.user_id)
            .execute("[current_fy]")
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


exports.previewCostingTabs=asyncHandler(async (req, res, next) => {
  try {
      // const {  } =req.query;
      sql.connect(config)
          .then(pool => {
              return pool.request()

              .input("mtab_id",req.body.mtab_id)
          .execute("preview_costing_tab")
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



exports.generateCostNo=asyncHandler(async (req, res, next) => {
  try {
      // const {  } =req.query;
      sql.connect(config)
          .then(pool => {
              return pool.request()

              .input("sub_cost_type",req.body.sub_cost_type)
              .input("main_cost_id",req.body.main_cost_id)

          .execute("generate_cost_no")
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




exports.pickcCosting=asyncHandler(async (req, res, next) => {
  try {
      // const {  } =req.query;
      sql.connect(config)
          .then(pool => {
              return pool.request()

              .input("mtran_id",req.body.mtran_id)
              .input("customer_id",req.body.customer_id)

          .execute("pick_costing_item_in_costing")
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



exports.getCosting=asyncHandler(async (req, res, next) => {
  try {
      // const {  } =req.query;
      sql.connect(config)
          .then(pool => {
              return pool.request()

              .input("tab_id",req.body.tab_id)
              .input("group_id",req.body.group_id)

          .execute("get_item_in_costing")
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



exports.cpersonInList=asyncHandler(async (req, res, next) => {
    try {
        // const {  } =req.query;
        sql.connect(config)
            .then(pool => {
                return pool.request()
  
                .input("company_id",req.body.company_id)
  
            .execute("cperson_list_in_sales")
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
  





