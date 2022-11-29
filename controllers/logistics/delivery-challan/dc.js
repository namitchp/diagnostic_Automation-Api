const express = require("express");
const dc = express.Router();
const asyncHandler = require("express-async-handler");
const sql = require("mssql");
const config = require("../../../config/config");

const getAmount = (arr, col) => {
  return arr.reduce((sum, column) => {
    return sum + column[col];
  }, 0);
};
// browse dc
dc.post(
  "/browseDelivery",
  asyncHandler(async (req, res) => {
    try {
      const { filter_value, page_number, page_size, sort_column, sort_order } =
        req.query;
      await sql
        .connect(config.config)
        .then((pool) => {
          return pool
            .request()
            .input("user_id", req.body.user_id)
            .input("chk_all", req.body.chk_all)
            .input("status", req.body.status)
            .input("Sl_type", req.body.sl_type)
            .input("search", filter_value)
            .execute("browse_dc_new");
        })
        .then((result) => {
          const amount =
            result.recordset.length > 0
              ? getAmount(result.recordset, "amount")
              : 0;
          const mdc_amount =
            result.recordset.length > 0
              ? getAmount(result.recordset, "mdc_amount")
              : 0;
          const actual_amount =
            result.recordset.length > 0
              ? getAmount(result.recordset, "actual_amount")
              : 0;

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
            recordsFiltered: result.recordset.length,
            amount: amount,
            mdc_amount: mdc_amount,
            actual_amount: actual_amount,
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
  })
);

// preview dc model

dc.post(
  "/previewDC",
  asyncHandler(async (req, res) => {
    try {
      await sql
        .connect(config.config)
        .then((pool) => {
          return pool
            .request()
            .input("tran_id", req.body.id)
            .execute("preview_dc_main");
        })
        .then((result) => {
          console.log(result);
          res.send({
            status: 200,
            data: {
              dc_main: result.recordsets[0],
              dc_detail: result.recordsets[1],
            },
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
  })
);

// update item by tran id

dc.post(
  "/updateItemById",
  asyncHandler(async (req, res) => {
    try {
      await sql
        .connect(config.config)
        .then((pool) => {
          return pool
            .request()
            .input("tran_Id", req.body.tran_id)
            .input("box_no", req.body.box_no)
            .input("mlfb_no", req.body.mlfb_no)
            .input("material_code", req.body.material_code)
            .input("serial_no", req.body.serial_no)
            .input("user_id", req.body.user_id)
            .execute("update_dc_details");
        })
        .then((result) => {
          res.send({
            status: 200,
            message: "saved",
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
  })
);
// Generte DC No.
dc.get(
  "/generateDC",
  asyncHandler(async (req, res) => {
    try {
      await sql
        .connect(config.config)
        .then((pool) => {
          return pool.request().execute("generate_dc_no");
        })
        .then((result) => {
          res.send({
            status: 200,
            data: {
              dc_no:
                "DC" +
                (parseInt(result.recordset[0].dc_no.replace("DC", "")) + 1),
            },
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
  })
);

// Pick DI List Model
dc.post(
  "/pickDI",
  asyncHandler(async (req, res) => {
    try {
      const { filter_value, page_number, page_size, sort_column, sort_order } =
        req.query;
      await sql
        .connect(config.config)
        .then((pool) => {
          return pool
            .request()
            .input("user_id", req.body.user_id)
            .input("sl_type", req.body.sl_type)
            .execute("pick_di_in_dc");
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
  })
);

// Pick DI Item List Model
dc.post(
  "/pickDIItem",
  asyncHandler(async (req, res) => {
    try {
      await sql
        .connect(config.config)
        .then((pool) => {
          return pool
            .request()
            .input("mtran_id", req.body.id)

            .execute("pick_di_item_in_dc");
        })
        .then((result) => {
          res.send({
            status: 200,
            data: result.recordset,
            totalRecords: result.recordset.length,
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
  })
);

dc.post("/insertmain", async (req, res, next) => {
  try {
    const { dcDetail } = req.body;
    let dcBoxList = new sql.Table("dcdetail");

    dcBoxList.columns.add("di_tran_id", sql.Int);
    dcBoxList.columns.add("product_id", sql.Int);
    dcBoxList.columns.add("box_no", sql.Int);
    dcBoxList.columns.add("mlfb_no", sql.VarChar(100));
    dcBoxList.columns.add("material_code", sql.NVarChar(100));

    dcBoxList.columns.add("description", sql.NVarChar(sql.MAX));
    dcBoxList.columns.add("serial_no", sql.NVarChar(100));
    dcBoxList.columns.add("qty", sql.Decimal(18, 0));
    dcBoxList.columns.add("rate", sql.Decimal(18, 2));
    dcBoxList.columns.add("amount", sql.Decimal(18, 2));

    dcDetail.forEach((item) => {
      if (item.serial) {
        [...Array(item.allocate_qty + 1)].forEach((_, i) => {
          dcBoxList.rows.add(
            item.tran_id,
            item.product_id,
            0,
            i === 0 ? item.mlfb_no : "",
            i === 0 ? item.material_code : "",

            item.description,
            i === 0 ? null : "",
            i === 0 ? item.allocate_qty : "1",
            item.rate,
            item.amount
          );
        });
      } else {
        dcBoxList.rows.add(
          item.tran_id,
          item.product_id,
          0,
          item.mlfb_no,
          item.material_code,

          item.description,
          "",
          item.allocate_qty,
          item.rate,
          item.amount
        );
      }
    });
    await sql
      .connect(config.config)
      .then((pool) => {
        // console.log(pool)
        return pool
          .request()
          .input("tran_id", req.body.tran_id)
          .input("dc_no", req.body.dc_no)
          .input("company_id", req.body.company_id)
          .input("company_name", req.body.company_name)
          .input("cperson_id", req.body.cperson_id)
          .input("cperson_name", req.body.cperson_name)
          .input("di_id", req.body.di_id)
          .input("di_no", req.body.di_no)
          .input("di_date", req.body.di_date)
          .input("so_no", req.body.so_no)
          .input("so_date", req.body.so_date)
          .input("ref_no", req.body.ref_no)
          .input("ref_date", req.body.ref_date)
          .input("dis_doc_no", req.body.dis_doc_no)
          .input("dis_doc_date", req.body.dis_doc_date)
          .input("dis_through", req.body.dis_through)
          .input("destination", req.body.destination)
          .input("vehicle_no", req.body.vehicle_no)
          .input("type", req.body.type)
          .input("status", req.body.status)
          .input("remarks", req.body.remarks)
          .input("user_id", req.body.user_id)
          .input("user_name", req.body.user_name)
          .input("noofbox", req.body.noofbox)
          .input("scan_using", req.body.scan_using)
          .input("dcdetails", sql.TVP, dcBoxList)
          .output("new_identity")
          .execute("insert_DC_main_details");
      })
      .then((result) => {
        console.log(result);
        res.send({
          message: "Saved",
          status: 200,
          data: result.output.new_identity,
        });
      })
      .catch((err) => {
        res.send({
          message: err,
          status: 400,
        });
      });
  } catch (err) {
 
    res.send({
      message: err,
      status: 500,
    });
  }
});

//sl Wip and Non Sl Wip 
dc.post(
  "/browseWip",
  asyncHandler(async (req, res) => {
    try {
      const { filter_value, page_number, page_size, sort_column, sort_order } =
        req.query;
      await sql
        .connect(config.config)
        .then((pool) => {
          return pool
            .request()
            .input("user_id", req.body.user_id)
            .input("chk_all", req.body.chk_all)
            .input("status", req.body.status)
            .input("Sl_type", req.body.sl_type)
            .input("global", filter_value)
            .execute("browse_wip ");
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
            totaldata: result.recordset.length,
          });
        })
        .catch((err) => {
          res.status(400).send({
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
  })
);


module.exports = {
  dc,
};

//preview_dc_main
