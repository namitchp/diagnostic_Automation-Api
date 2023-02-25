const sql = require("mssql");
const {config} = require("../../config/config");
const asyncHandler = require("express-async-handler");

//so Detail
exports.browseSoDetail= asyncHandler(async (req, res) => {
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
            .input("priority_name", req.body.priority_name)
            .input("type", req.body.type)
            .input("status", req.body.status)
            .input("mark_engg", req.body.mark_engg)
            // .input("global", filter_value)
            .execute("browse_so_details");
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

  //so pos
//   browse_so_pos
exports.browseSoPos= asyncHandler(async (req, res) => {
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
            .input("priority_name", req.body.priority_name)
            .input("type", req.body.type)
            .input("status", req.body.status)
            .input("mark_engg", req.body.mark_engg)
            // .input("global", filter_value)
            .execute("browse_so_pos");
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

//browse_so_pos_summarize

  exports.browseSoPos= asyncHandler(async (req, res) => {
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
            .input("priority_name", req.body.priority_name)
            .input("type", req.body.type)
            .input("status", req.body.status)
            .input("mark_engg", req.body.mark_engg)
            // .input("global", filter_value)
            .execute("browse_so_pos_summarize");
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

  //browse_di
  exports.browseSoPos= asyncHandler(async (req, res) => {
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
            .input("priority_name", req.body.priority_name)
            .input("type", req.body.type)
            .input("status", req.body.status)
            .input("mark_engg", req.body.mark_engg)
            // .input("global", filter_value)
            .execute("browse_di");
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