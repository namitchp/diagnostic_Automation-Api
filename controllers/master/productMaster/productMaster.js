const { config } = require("../../../config/config");
const sql = require("mssql");
const asyncHandler = require("express-async-handler");

exports.listDi = asyncHandler(async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request().execute("list_di_in_product_master");
      })
      .then((result) => {
        req.di = result.recordset;
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
exports.listAi = asyncHandler(async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request().execute("list_ai_in_product_master");
      })
      .then((result) => {
        req.ai = result.recordset;
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
exports.listFc = asyncHandler(async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request().execute("list_fc_in_product_master");
      })
      .then((result) => {
        req.fc = result.recordset;
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
exports.listDo = asyncHandler(async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request().execute("list_do_in_product_master");
      })
      .then((result) => {
        req.do = result.recordset;
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
exports.listAo = asyncHandler(async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request().execute("list_ao_in_product_master");
      })
      .then((result) => {
        req.ao = result.recordset;
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
exports.listFm = asyncHandler(async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request().execute("list_fm_in_product_master");
      })
      .then((result) => {
        res.send({
          status: 200,
          message: "success",
          fm: result.recordset,
          di: req.di,
          ai: req.ai,
          fc: req.fc,
          do: req.do,
          ao: req.ao,
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

//
exports.browseProduct = asyncHandler(async (req, res) => {
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
          .input("moving_non_moving", req.body.moving_non_moving)
          .input("category", req.body.category)
          .input("group", req.body.group)
          .input("gg_name", req.body.gg_name)
          .input("item_name", req.body.item_name)
          .input("lp_ref", req.body.lp_ref)
          .input("siemens_product", req.body.siemens_product)
          .input("status", req.body.status)
          .execute("browse_product_new");
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
exports.insertProductMaster = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("product_id", req.body.product_id)
          .input("product_code", req.body.product_code)
          .input("category_id", req.body.category_id)
          .input("category_name", req.body.category_name)
          .input("p_group_id", req.body.p_group_id)
          .input("p_group_name", req.body.p_group_name)
          .input("item_id", req.body.item_id)
          .input("item_name", req.body.item_name)
          .input("gg_id", req.body.gg_id)
          .input("description", req.body.description)
          .input("mlfb_no", req.body.mlfb_no)
          .input("grade", req.body.grade)
          .input("tax_rate", req.body.tax_rate)
          .input("uom_id", req.body.uom_id)
          .input("uom", req.body.uom)
          .input("package", req.body.package)
          .input("qty", req.body.qty)
          .input("list_price", req.body.list_price)
          .input("margin", req.body.margin)
          .input("pur_rate", req.body.pur_rate)
          .input("reorder_level", req.body.reorder_level)
          .input("lp_ref", req.body.lp_ref)
          .input("di", req.body.di)
          .input("di_value", req.body.di_value)
          .input("Ai", req.body.ai)
          .input("Ai_value", req.body.ai_value)
          .input("Fc", req.body.fc)
          .input("Fc_value", req.body.fc_value)
          .input("Do", req.body.do)
          .input("Do_value", req.body.do_value)
          .input("Ao", req.body.ao)
          .input("Ao_value", req.body.ao_value)
          .input("Fm", req.body.fm)
          .input("Fm_value", req.body.fm_value)
          .input("edit", req.body.edit)
          .input("deactivate", req.body.deactivate)
          .input("serial", req.body.serial)
          .input("siemens_product", req.body.siemens_product)
          .input("user_id", req.body.user_id)
          .input("user_name", req.body.user_name)
          .output("new_identity")
          .execute("insert_product_master ");
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
exports.dropdownList = asyncHandler(async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request().execute("list_pcategory_master_filter");
      })
      .then((result) => {
        res.send({
          status: 200,
          message: "success",
          category: result.recordset,
          lp: req.lp,
          gg: req.gg,
          uom: req.uom,
          group: req.group,
          item: req.item,
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
exports.listItem = asyncHandler(async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request().execute("list_item");
      })
      .then((result) => {
        req.item = result.recordset;
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
exports.lpList = asyncHandler(async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request().execute("list_lp_ref");
      })
      .then((result) => {
        req.lp = result.recordset;
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
exports.ggList = asyncHandler(async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request().execute("list_gg");
      })
      .then((result) => {
        req.gg = result.recordset;
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
exports.uomList = asyncHandler(async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request().execute("list_uom");
      })
      .then((result) => {
        req.uom = result.recordset;
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
exports.pgroupList = asyncHandler(async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request().execute("list_pgroup_name");
      })
      .then((result) => {
        req.group = result.recordset;
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
exports.updateProductEdit = asyncHandler(async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("product_id", req.body.product_id)
          .input("edit", req.body.edit)
          .input("user_id", req.body.user_id)
          .execute("update_product_edit");
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
exports.updateProductMoving = asyncHandler(async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("product_id", req.body.product_id)
          .input("moving_non_moving", req.body.moving_non_moving)
          .input("user_id", req.body.user_id)
          .execute("update_product_moving_non_moving");
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
exports.updateProductListPrice = asyncHandler(async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("product_id", req.body.product_id)
          .input("list_price", req.body.list_price)
          .input("user_id", req.body.user_id)
          .execute("update_product_list_price");
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
exports.updateProductlp = asyncHandler(async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("product_id", req.body.product_id)
          .input("lp_ref", req.body.lp_ref)
          .input("user_id", req.body.user_id)
          .execute("update_product_lp_ref");
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

exports.deleteProductmaster = asyncHandler(async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("product_id", req.body.product_id)
          .execute("delete_product_master");
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
exports.previewProductmaster = asyncHandler(async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("product_id", req.body.product_id)
          .execute("preview_product_master");
      })
      .then((result) => {
        res.send({
          status: 200,
          message: "success",
          data: result.recordset[0],
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
