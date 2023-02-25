const { config } = require("../../../config/config");
const sql=require("mssql");
const asyncHandler=require("express-async-handler");
exports.browseMenu= asyncHandler(async (req, res) => {
    try {
      const { filter_value, page_number, page_size, sort_column, sort_order, } =
        req.query;
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("global",filter_value)
            .input("user_id",req.body.user_id)
            .execute("browse_menu_structure ");
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
            message:"success",
            data:data,
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
  exports.UpdateMenu= asyncHandler(async (req, res) => {
    try {
    
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("transaction_id",req.body.transaction_id)
          .input("display_name",req.body.display_name)
          .input("level",req.body.level)
          .input("user_id",req.body.user_id)
          .input("parent_id",req.body.parent_id)
          .input("sequence",req.body.sequence)
          .input("main_form",req.body.main_form)
          .execute("update_menu_structure");
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
  exports.listTransection= asyncHandler(async (req, res) => {
    try {
    
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("transaction_id",req.body.transaction_id)
            .execute("list_parent_transaction");
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
 