const { config } = require("../../../../config/config");
const sql=require("mssql");
const asyncHandler=require("express-async-handler");
exports.browseUnit= asyncHandler(async (req, res) => {
    try {
      const { filter_value, page_number, page_size, sort_column, sort_order } =
        req.query;
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("global",filter_value)
            .execute("list_uom_master_new ");
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
  exports.insertUnit= asyncHandler(async (req, res) => {
    try {
    
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("uom_id",req.body.uom_id)
          .input("uom",req.body.uom)
          .input("description",req.body.description)
          .input("user_id",req.body.user_id)
          .input("user_name",req.body.user_name)
          .output("new_identity")
            .execute("insert_uom_master ");
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
  exports.deleteUnit= asyncHandler(async (req, res) => {
    try {
     
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("uom_id",req.body.uom_id)
            .execute("delete_uom");
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
  exports.previewUnit= asyncHandler(async (req, res) => {
    try {
    
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("uom_id",req.body.uom_id)
            .execute("preview_uom");
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



// browse_group
// insert_group_master
// preview_group
// delete_group

// browse_pincode
// insert_pincode_master
// preview_pincode
// delete_pincode

// browse_region
// insert_region_master
// preview_region
// delete_region

// browse_rating
// insert_rating_master
// preview_rating
// delete_rating

// browse_department
// insert_department_master
// preview_department
// delete_department

// browse_designation
// insert_designation_master
// preview_designation
// delete_designation

// browse_siemens
// insert_siemens_engg
// preview_siemens
// delete_siemens

// browse_item
// insert_supply_item
// preview_supply_items
// delete_supply_item
