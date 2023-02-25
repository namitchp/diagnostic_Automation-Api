const { config } = require("../../config/config");
const sql = require("mssql");
const asyncHandler = require("express-async-handler");
exports.browseMaterialCode = asyncHandler(async (req, res) => {
  try {
    const { filter_value, page_number, page_size, sort_column, sort_order } =
      req.query;
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("global", filter_value)
          .input("user_id", req.body.user_id)
          .input("customer_type", req.body.customer_type)
          .execute("browse_material_code_new");
      })
      .then((result) => {
        const data =
          result.recordset.length > 0
            ? result.recordset
                .reverse()
                .slice(
                  parseInt(page_number) * parseInt(page_size),
                  parseInt(page_size) * (parseInt(page_number) + 1)
                )
            : [];
        res.send({
          status: 200,
          message: "success",
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
exports.insertMaterialCode = asyncHandler(async (req, res) => {
  try {
    let materialCodeCustomer = new sql.Table("material_code_customer");
    let materialCodeProduct = new sql.Table("material_code_products");
    materialCodeCustomer.columns.add("customer_id", sql.Int);

    // /product
    materialCodeProduct.columns.add("product_id", sql.Int);
    materialCodeProduct.columns.add("material_code", sql.NVarChar(100));
    materialCodeProduct.columns.add("lp_ref", sql.NVarChar(100));
    materialCodeProduct.columns.add("list_price", sql.Decimal(18, 2));
    materialCodeProduct.columns.add("dis_per", sql.Decimal(18, 2));
    materialCodeProduct.columns.add("unit_price", sql.Decimal(18, 2));

    req.body.customer.forEach((element) => {
      materialCodeCustomer.rows.add(element.customer_id);
    });
    req.body.product.forEach((element) => {
      materialCodeProduct.rows.add(
        element.product_id,
        element.material_code,
        element.lp_ref,
        element.list_price,
        element.dis_per,
        element.unit_price
      );
    });
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("tran_id", req.body.tran_id)
          .input("customer_id", req.body.customer_id)
          .input("material_code_customer", sql.TVP, materialCodeCustomer)
          .input("material_code_products", sql.TVP, materialCodeProduct)
          .input("user_id", req.body.user_id)
          .output("new_identity")
          .execute("insert_material_code");
      })
      .then((result) => {
        res.send({
          status: 200,
          message: "success",
        });
      })
      .catch((err) => {
        res.send({
          status: 400,
          message: err,
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: error,
    });
  }
});
exports.partyNameList = asyncHandler(async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("customer_type", req.body.customer_type)
          .execute("list_parent_company_material_code");
      })
      .then((result) => {
        res.send({
          status: 200,
          message: "success",
          data: result.recordset,
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
exports.pickCustomer = asyncHandler(async (req, res, next) => {
  try {
    const { filter_value, page_number, page_size, sort_column, sort_order } =
      req.query;
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("customer_type", req.body.customer_type)
          .execute("pick_customer_in_material_code");
      })
      .then((result) => {
        const data =
          result.recordset.length > 0
            ? result.recordset
                .reverse()
                .slice(
                  parseInt(page_number) * parseInt(page_size),
                  parseInt(page_size) * (parseInt(page_number) + 1)
                )
            : [];
        res.send({
          status: 200,
          message: "success",
          data: data,
          recordsFiltered: result.recordset.length,
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
exports.pickItem = asyncHandler(async (req, res, next) => {
  try {
    const { filter_value, page_number, page_size, sort_column, sort_order } =
      req.query;
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request().execute("select_product_in_material_code");
      })
      .then((result) => {
        const data =
          result.recordset.length > 0
            ? result.recordset
                .reverse()
                .slice(
                  parseInt(page_number) * parseInt(page_size),
                  parseInt(page_size) * (parseInt(page_number) + 1)
                )
            : [];
        res.send({
          status: 200,
          message: "success",
          data: data,
          recordsFiltered: result.recordset.length,
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
exports.deleteMaterialCode = asyncHandler(async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("tran_id", req.body.tran_id)
          .execute("delete_material_code");
      })
      .then((result) => {
        res.send({
          status: 200,
          message: "success",
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
exports.previewMaterialCodeCustomer = asyncHandler(async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("tran_id", req.body.tran_id)
          .execute("preview_material_code_customer");
      })
      .then((result) => {
        req.customer = result.recordset;
        req.tran_id = req.body.tran_id;
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
exports.previewMaterialCodeMain = asyncHandler(async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("tran_id", req.tran_id)
          .execute("preview_material_code_main");
      })
      .then((result) => {
        res.send({
          status: 200,
          message: "success",
          data:result.recordset[0],
          product: req.product,
          cutomer: req.customer,
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
exports.previewMaterialCodeProduct = asyncHandler(async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("tran_id", req.tran_id)
          .execute("preview_material_code_products");
      })
      .then((result) => {
        req.product = result.recordset;
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
