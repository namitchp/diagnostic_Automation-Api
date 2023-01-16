const { config } = require("../../../config/config");
const sql=require("mssql");
const asyncHandler=require("express-async-handler");
exports.browseProduct= asyncHandler(async (req, res) => {
    try {
      const { filter_value, page_number, page_size, sort_column, sort_order } =
        req.query;
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("global",filter_value)
            .input("user_id",req.body.user_id)
            .input("moving_non_moving",req.body.moving_non_moving)
            .input("category",req.body.category)
            .input("group",req.body.group)
            .input("gg_name",req.body.gg_name)
            .input("item_name",req.body.item_name)
            .input("lp_ref",req.body.lp_ref)
            .input("siemens_product",req.body.siemens_product)
            .input("status",req.body.status)
            .execute("browse_product_new");
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
  exports.insertProductMaster= asyncHandler(async (req, res) => {
    try {
    
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("product_id",req.body.product_id)
          .input("product_code",req.body.product_code)
          .input("category_id",req.body.category_id)
          .input("category_name",req.body.category_name)
          .input("p_group_id",req.body.p_group_id)
          .input("p_group_name",req.body.p_group_name)
          .input("item_id",req.body.item_id)
          .input("item_name",req.body.item_name)
          .input("gg_id",req.body.gg_id)
          .input("description",req.body.description)
          .input("mlfb_no",req.body.mlfb_no)
          .input("grade",req.body.grade)
          .input("tax_rate",req.body.tax_rate)
          .input("uom_id",req.body.uom_id)
          .input("uom",req.body.uom)
          .input("package",req.body.package)
          .input("qty",req.body.qty)
          .input("list_price",req.body.list_price)
          .input("margin",req.body.margin)
          .input("pur_rate",req.body.pur_rate)
          .input("reorder_level",req.body.reorder_level)
          .input("lp_ref",req.body.lp_ref)
          .input("di",req.body.di)
          .input("di_value",req.body.di_value)
          .input("Ai",req.body.Ai)
          .input("Ai_value",req.body.Ai_value)
          .input("Fc",req.body.Fc)
          .input("Do",req.body.Do)
          .input("Do_value",req.body.Do_value)
          .input("Ao",req.body.Ao)
          .input("Ao_value",req.body.Ao_value)
          .input("Fm",req.body.Fm)
          .input("Fm_value",req.body.Fm_value)
          .input("edit",req.body.edit)
          .input("deactivate",req.body.deactivate)
          .input("serial",req.body.serial)
          .input("siemens_product",req.body.siemens_product)
          .input("user_id",req.body.user_id)
          .input("user_name",req.body.user_name)
          .output("new_identity")
            .execute("insert_product_master ");
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
  exports.dropdownList= asyncHandler(async (req, res,next) => {
    try {
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .execute("list_pcategory_master_filter");
        })
        .then((result) => {
          res.send({
            status: 200,
            message:"success",
            category:result.recordset,
            lp:req.lp,
            gg:req.gg,
            uom:req.uom,
            group:req.group,
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
  exports.lpList= asyncHandler(async (req, res,next) => {
    try {
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .execute("list_lp_ref");
        })
        .then((result) => {
          req.lp=result.recordset;
          next();
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
  exports.ggList= asyncHandler(async (req, res,next) => {
    try {
     
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .execute("list_gg");
        })
        .then((result) => {
          req.gg=result.recordset;
          next();
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
  exports.uomList= asyncHandler(async (req, res,next) => {
    try {
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .execute("list_uom");
        })
        .then((result) => {
          req.uom=result.recordset;
          next();
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
  exports.pgroupList= asyncHandler(async (req, res,next) => {
    try {
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .execute("list_pgroup_name");
        })
        .then((result) => {
          req.group=result.recordset;
          next();
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
  exports.updateProductEdit= asyncHandler(async (req, res,next) => {
    try {
    
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("product_id",req.body.product_id)
          .input("edit",req.body.edit)
          .input("user_id",req.body.user_id)
            .execute("update_product_edit");
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
  exports.updateProductMoving= asyncHandler(async (req, res,next) => {
    try {
    
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("product_id",req.body.product_id)
          .input("moving_non_moving",req.body.moving_non_moving)
          .input("user_id",req.body.user_id)
            .execute("update_product_moving_non_moving");
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
  exports.updateProductListPrice= asyncHandler(async (req, res,next) => {
    try {
    
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("product_id",req.body.product_id)
          .input("list_price",req.body.list_price)
          .input("user_id",req.body.user_id)
            .execute("update_product_list_price");
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
  exports.updateProductlp= asyncHandler(async (req, res,next) => {
    try {
    
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("product_id",req.body.product_id)
          .input("lp_ref",req.body.lp_ref)
          .input("user_id",req.body.user_id)
            .execute("update_product_lp_ref");
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