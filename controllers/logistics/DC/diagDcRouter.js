const express = require("express");
const dcRouter = express.Router();
const asyncHandler = require("express-async-handler");
const sql = require("mssql");
const config = require("../../../config/config");

dcRouter.post(
  "/insertDc",
  asyncHandler(async (req, res) => {
    try {
      const { boxList } = req.body;
      let dcBoxList = new sql.Table("dc_packaging_details");
      dcBoxList.columns.add("dci_tran_id", sql.Int);
      dcBoxList.columns.add("serial_no", sql.NVarChar(100));
      dcBoxList.columns.add("qty", sql.Decimal(18, 2));
      dcBoxList.columns.add("box_no", sql.Int);

      boxList.forEach((item, index) =>
        item.items.map((_) => {
          return dcBoxList.rows.add(
            _.di_tran_id,
            _.serial_no,
            _.qty,
            index + 1
          );
        })
      );

      await sql
        .connect(config.config)
        .then((pool) => {
          return pool
            .request()
            .input("tran_id", req.body.tran_id)
            .input("date", req.body.date)
            .input("entry_no", req.body.entry_no)
            .input("company_id", req.body.company_id)
            .input("remarks", req.body.remarks)
            .input("dc_packaging_details", sql.TVP, dcBoxList)
            .input("user_id", req.body.user_id)
            .output("new_identity")
            .execute("insert_dc_packaging");
        })
        .then((result) => {
          res.status(200).json({
            status: 200,
            message: "success",
            result: result.recordsets[0],
          });
        })
        .catch((err) => {
          console.log("err", err);
          res.json(err);
        });
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  })
);

dcRouter.post(
  "/browseDCPackage",
  asyncHandler(async (req, res, next) => {
    try {
      const { filter_value, page_number, page_size, sort_column, sort_order } =
        req.query;
      await sql
        .connect(config.config)
        .then((pool) => {
          return pool
            .request()
            .input("user_id", req.body.user_id)
            .execute("browse_dc_packaging");
        })
        .then((result) => {
          const data =
            result.recordsets[0].length > 0
              ? result.recordsets[0].slice(
                  (page_number - 1) * page_size,
                  page_number * page_size - 1
                )
              : [];

          res.status(200).json({
            status: 200,
            message: "success",
            data: data,
            totalRecords: result.recordsets[0].length,
            recordsFiltered: result.recordsets[0].length,
          });
        })
        .catch((err) => {
          res.json(err);
        });
    } catch (err) {
      res.json(err);
    }
  })
);
dcRouter.get(
  "/pickCompany",
  asyncHandler(async (req, res) => {
    try {
      await sql
        .connect(config.config)
        .then((pool) => {
          return pool
            .request()
            .input("search", req.query.search)
            .execute("list_account_company");
        })
        .then((result) => {
          res.status(200).json({
            status: 200,
            message: "success",
            result: result.recordsets[0],
          });
        })
        .catch((err) => {
          res.status(400).json({
            status: 400,
            message: err,
          });
        });
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err,
      });
    }
  })
);
dcRouter.post(
  "/pickDc",
  asyncHandler(async (req, res) => {
    try {
      const { filter_value, page_number, page_size, sort_column, sort_order } =
        req.query;
      await sql
        .connect(config.config)
        .then((pool) => {
          return pool
            .request()
            .input("company_id", req.body.company_id)
            .execute("pick_dc_in_packaging");
        })
        .then((result) => {
          const data =
            result.recordsets[0].length > 0
              ? result.recordsets[0].slice(
                  (page_number - 1) * page_size,
                  page_number * page_size - 1
                )
              : [];

          res.status(200).json({
            status: 200,
            message: "success",
            data: data,
            result: result.recordsets[0].length,
            totalRecords: result.recordsets[0].length,
            recordsFiltered: result.recordsets[0].length,
          });
        })
        .catch((err) => {
          res.status(404).json({
            status: 404,
            message: err,
          });
        });
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err,
      });
    }
  })
);

dcRouter.post(
  "/pickDCItem",
  asyncHandler(async (req, res) => {
    try {
      const { filter_value, page_number, page_size, sort_column, sort_order } =
        req.query;
      let dc_id = new sql.Table("dc_id");
      dc_id.columns.add("dc_id", sql.Int);
      req.body.dcList.forEach((item) => dc_id.rows.add(item.id));
      
      await sql
        .connect(config.config)
        .then((pool) => {
          return pool
            .request()
            .input("dc_id", sql.TVP, dc_id)
            .execute("pick_dc_item_in_packaging");
        })
        .then((result) => {
          let records =
            result.recordsets[0].length > 0
              ? result.recordsets[0].filter(
                  (x) =>
                    req.body.itemList.findIndex(
                      (y) => y.tran_id === x.tran_id
                    ) < 0
                )
              : [];
          const data =
            records.length > 0
              ? records.slice(
                  (page_number - 1) * page_size,
                  page_number * page_size
                )
              : [];

          res.send({
            status: 200,
            data: data,
            totalRecords: result.recordsets[0].length,
            recordsFiltered: result.recordsets[0].length,
          });
        })
        .catch((err) => {
          console.log(err);
          res.send(err);
        });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        status: 400,
        message: error,
      });
    }
  })
);

dcRouter.get(
  "/generateDCNo",
  asyncHandler(async (req, res) => {
    try {
      await sql
        .connect(config.config)
        .then((pool) => {
          return pool
            .request()

            .execute("generate_dc_packaging_no");
        })
        .then((result) => {
          res.send({
            status: 200,
            data: result.recordsets[1][0].entry_no,
          });
        })
        .catch((err) => {
          console.log(err);
          res.send(err);
        });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        status: 400,
        message: error,
      });
    }
  })
);

module.exports = {
  dcRouter,
};
