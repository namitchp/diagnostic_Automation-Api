const sql = require("mssql");
const config = require("../../../config/config.js")
const asyncHandler = require("express-async-handler")
exports.getJw = asyncHandler(async (req, res, next) => {
    res.send("jw Get")
});

exports.browseJwOut= asyncHandler(async (req, res) => {
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
            .input("global", filter_value)
            .execute("browse_jwout ");
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

  exports.browseJwIn= asyncHandler(async (req, res) => {
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
              .input("global", filter_value)
              .execute("browse_jwin ");
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