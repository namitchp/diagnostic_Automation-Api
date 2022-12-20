const { config } = require("../../../../config/config");
const sql=require("mssql");
const asyncHandler=require("express-async-handler");
// ledger
exports.browseLedger= asyncHandler(async (req, res) => {
    try {
      const { filter_value, page_number, page_size, sort_column, sort_order } =
        req.query;
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("global",filter_value)
            .execute("browse_ledger_new ");
        })
        .then((result) => {
          const data =
            result.recordset.length > 0
              ? result.recordset.reverse().slice(
                  (page_number - 1) * page_size,
                  page_number * page_size
                )
              : [];
          res.send({
            status: 200,
            message:"success",
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
  exports.insertLedger= asyncHandler(async (req, res) => {
    try {
    
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("ledger_id",req.body.ledger_id)
          .input("ledger_name",req.body.ledger_name)
          .input("description",req.body.description)
          .input("user_id",req.body.user_id)
          // .input("user_name",req.body.user_name)
          .output("new_identity")
            .execute("insert_ledger_master ");
        })
        .then((result) => {
        
          res.send({
            status: 200,
          message:"success"
      
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
  exports.deleteLedger= asyncHandler(async (req, res) => {
    try {
     
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("ledger_id",req.body.ledger_id)
            .execute("delete_Ledger ");
        })
        .then((result) => {
          
          res.send({
            status: 200,
            message:"success",

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
  exports.previewLedger= asyncHandler(async (req, res) => {
    try {
    
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("ledger_id",req.body.ledger_id)
            .execute("preview_Ledger");
        })
        .then((result) => {
        
          res.send({
            status: 200,
          message:"success",
          data:result.recordset
      
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
//finance
exports.browseFinance= asyncHandler(async (req, res) => {
  try {
    const { filter_value, page_number, page_size, sort_column, sort_order } =
      req.query;
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("global",filter_value)
          .execute("browse_finance_new");
      })
      .then((result) => {
        const data =
          result.recordset.length > 0
            ? result.recordset.reverse().slice(
                (page_number - 1) * page_size,
                page_number * page_size
              )
            : [];
        res.send({
          status: 200,
          message:"success",
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
exports.insertFinance= asyncHandler(async (req, res) => {
  try {
  
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
        .input("finance_id",req.body.finance_id)
        .input("finance_name",req.body.finance_name)
        .input("description",req.body.description)
        .input("user_id",req.body.user_id)
        // .input("user_name",req.body.user_name)
        .output("new_identity")
          .execute("insert_finance_master");
      })
      .then((result) => {
      
        res.send({
          status: 200,
        message:"success"
    
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
exports.deleteFinance= asyncHandler(async (req, res) => {
  try {
   
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("finance_id",req.body.finance_id)
          .execute("delete_Finance ");
      })
      .then((result) => {
        
        res.send({
          status: 200,
          message:"success",

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
exports.previewFinance= asyncHandler(async (req, res) => {
  try {
  
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
        .input("finance_id",req.body.finance_id)
          .execute("preview_Finance");
      })
      .then((result) => {
      
        res.send({
          status: 200,
        message:"success",
        data:result.recordset
    
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
// tabs
exports.browseTabs= asyncHandler(async (req, res) => {
  try {
    const { filter_value, page_number, page_size, sort_column, sort_order } =
      req.query;
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("global",filter_value)
          .execute("browse_costing_tab_new");
      })
      .then((result) => {
        const data =
          result.recordset.length > 0
            ? result.recordset.reverse().slice(
                (page_number - 1) * page_size,
                page_number * page_size
              )
            : [];
        res.send({
          status: 200,
          message:"success",
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
exports.insertTabs= asyncHandler(async (req, res) => {
  try {
    const tabDetail=new sql.Table("costing_tabs_details");
    tabDetail.columns.add("tab_name",sql.VarChar(200));
    tabDetail.columns.add("sequence",sql.Int);
    req.body.tabArray.forEach(element => {
      tabDetail.rows.add(
        element.tab_name,
        element.sequence
      )
    });
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
        .input("mtab_id",req.body.mtab_id)
        .input("tab_id",req.body.tab_id)
        .input("mtab_name",req.body.mtab_name)
        .input("costing_tabs_details",sql.TVP,tabDetail)
        .input("user_id",req.body.user_id)
        // .input("user_name",req.body.user_name)
        .output("new_identity")
          .execute("insert_costing_tabs");
      })
      .then((result) => {
      
        res.send({
          status: 200,
        message:"success"
    
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
exports.deleteTabs= asyncHandler(async (req, res) => {
  try {
   
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("mtab_id",req.body.mtab_id)
          .execute("delete_costing_tabs ");
      })
      .then((result) => {
        
        res.send({
          status: 200,
          message:"success",

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
exports.previewTabs= asyncHandler(async (req, res) => {
  try {
  
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
        .input("mtab_id",req.body.mtab_id)
          .execute("preview_costing_tab");
      })
      .then((result) => {
      
        res.send({
          status: 200,
        message:"success",
        data:result.recordset
    
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