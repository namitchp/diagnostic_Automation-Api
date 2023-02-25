const { config } = require("../../../config/config");
const sql = require("mssql");
const asyncHandler = require("express-async-handler");
exports.browseAccountMaster = asyncHandler(async (req, res) => {
  try {
    const { filter_value, page_number, page_size, sort_column, sort_order } =
      req.query;
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("global", filter_value)
          .input("account_type", req.body.account_type)
          .input("region_name", req.body.region_name)
          .input("group_name", req.body.group_name)
          .input("verified", req.body.verified)
          .input("mark_engg", req.body.mark_engg)
          .execute("browse_account_master_new");
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
//tcs
exports.browseAccountMasterTcs = asyncHandler(async (req, res) => {
  try {
    const { filter_value, page_number, page_size, sort_column, sort_order } =
      req.query;
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("global", filter_value)
          .input("account_type", req.body.account_type)
          .execute("browse_account_master_tcs_new");
      })
      .then((result) => {
        const data =
          result.recordset.length > 0
            ? result.recordset
                .reverse()
                .slice(page_number * page_size, (page_number + 1) * page_size)
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
exports.supplierlist = async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request().execute("list_account_master_supplier");
      })
      .then((result) => {
        req.supplier = result.recordset;
        next();
      })
      .catch((err) => {
        res.send({
          status: 400,
          message: err,
        });
      });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err,
    });
  }
};
exports.listAccountMasterTcsCustomer = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request().execute("list_account_master_customer");
      })
      .then((result) => {
        res.send({
          status: 200,
          message: "success",
          Customer: result.recordset,
          Supplier: req.supplier,
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
exports.updateAccountMasterTcs = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("tcs_per", req.body.tcs_per)
          .input("company_id", req.body.company_id)
          .execute("update_account_master_tcs");
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
exports.deleteAccountMasterTcs = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("company_id", req.body.company_id)
          .execute("delete_account_master_tcs_new");
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

exports.regionList = async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request().execute("list_region");
      })
      .then((result) => {
        req.regionlist = result.recordset;
        next();
      })
      .catch((err) => {
        res.send({
          status: 400,
          message: err,
        });
      });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err,
    });
  }
};
exports.groupList = async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request().execute("list_group");
      })
      .then((result) => {
        req.groupList = result.recordset;
        next();
      })
      .catch((err) => {
        res.send({
          status: 400,
          message: err,
        });
      });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err,
    });
  }
};
exports.siemensEngg = async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request().execute("list_siemens_engg");
      })
      .then((result) => {
        req.siemensEngg = result.recordset;
        next();
      })
      .catch((err) => {
        res.send({
          status: 400,
          message: err,
        });
      });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err,
    });
  }
};
exports.rating = async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request().execute("list_rating_master");
      })
      .then((result) => {
        req.rating = result.recordset;
        next();
      })
      .catch((err) => {
        res.send({
          status: 400,
          message: err,
        });
      });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err,
    });
  }
};
exports.pincode = async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request().execute("list_pincode");
      })
      .then((result) => {
        req.pincode = result.recordset;
        next();
      })
      .catch((err) => {
        res.send({
          status: 400,
          message: err,
        });
      });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err,
    });
  }
};
exports.department = async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request().execute("list_department_master");
      })
      .then((result) => {
        req.department = result.recordset;
        next();
      })
      .catch((err) => {
        res.send({
          status: 400,
          message: err,
        });
      });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err,
    });
  }
};
exports.designation = async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request().execute("list_designation_master");
      })
      .then((result) => {
        req.designation = result.recordset;
        next();
      })
      .catch((err) => {
        res.send({
          status: 400,
          message: err,
        });
      });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err,
    });
  }
};
exports.exciseDuty = async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request().execute("list_exciseduty");
      })
      .then((result) => {
        req.exciseDuty = result.recordset;
        next();
      })
      .catch((err) => {
        res.send({
          status: 400,
          message: err,
        });
      });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err,
    });
  }
};
exports.pf = async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request().execute("list_pf");
      })
      .then((result) => {
        req.pf = result.recordset;
        next();
      })
      .catch((err) => {
        res.send({
          status: 400,
          message: err,
        });
      });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err,
    });
  }
};
exports.saleTax = async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request().execute("list_salestax");
      })
      .then((result) => {
        req.saleTax = result.recordset;
        next();
      })
      .catch((err) => {
        res.send({
          status: 400,
          message: err,
        });
      });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err,
    });
  }
};
exports.serviceTax = async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request().execute("list_servicetax");
      })
      .then((result) => {
        req.serviceTax = result.recordset;
        next();
      })
      .catch((err) => {
        res.send({
          status: 400,
          message: err,
        });
      });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err,
    });
  }
};
exports.travel = async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request().execute("list_travel");
      })
      .then((result) => {
        req.travel = result.recordset;
        next();
      })
      .catch((err) => {
        res.send({
          status: 400,
          message: err,
        });
      });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err,
    });
  }
};
exports.conveyance = async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request().execute("list_conveyance");
      })
      .then((result) => {
        req.conveyance = result.recordset;
        next();
      })
      .catch((err) => {
        res.send({
          status: 400,
          message: err,
        });
      });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err,
    });
  }
};
exports.freight = async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request().execute("list_freight");
      })
      .then((result) => {
        req.freight = result.recordset;
        next();
      })
      .catch((err) => {
        res.send({
          status: 400,
          message: err,
        });
      });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err,
    });
  }
};
exports.loading = async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request().execute("list_loading");
      })
      .then((result) => {
        req.loading = result.recordset;
        next();
      })
      .catch((err) => {
        res.send({
          status: 400,
          message: err,
        });
      });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err,
    });
  }
};
exports.insurance = async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request().execute("list_insurance");
      })
      .then((result) => {
        req.insurance = result.recordset;
        next();
      })
      .catch((err) => {
        res.send({
          status: 400,
          message: err,
        });
      });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err,
    });
  }
};
exports.boarding = async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request().execute("list_boarding");
      })
      .then((result) => {
        req.boarding = result.recordset;
        next();
      })
      .catch((err) => {
        res.send({
          status: 400,
          message: err,
        });
      });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err,
    });
  }
};
exports.inspection = async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request().execute("list_inspection");
      })
      .then((result) => {
        req.inspection = result.recordset;
        next();
      })
      .catch((err) => {
        res.send({
          status: 400,
          message: err,
        });
      });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err,
    });
  }
};
exports.modeOfDispatch = async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request().execute("list_mode_of_dispatch");
      })
      .then((result) => {
        req.modeOfDispatch = result.recordset;
        next();
      })
      .catch((err) => {
        res.send({
          status: 400,
          message: err,
        });
      });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err,
    });
  }
};
exports.ld = async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request().execute("list_ld");
      })
      .then((result) => {
        req.ld = result.recordset;
        next();
      })
      .catch((err) => {
        res.send({
          status: 400,
          message: err,
        });
      });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err,
    });
  }
};
exports.validity = async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request().execute("list_validity");
      })
      .then((result) => {
        req.validity = result.recordset;
        next();
      })
      .catch((err) => {
        res.send({
          status: 400,
          message: err,
        });
      });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err,
    });
  }
};
exports.delivery = async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request().execute("list_delivery");
      })
      .then((result) => {
        req.delivery = result.recordset;
        next();
      })
      .catch((err) => {
        res.send({
          status: 400,
          message: err,
        });
      });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err,
    });
  }
};
exports.payment = async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request().execute("list_payment");
      })
      .then((result) => {
        req.payment = result.recordset;
        next();
      })
      .catch((err) => {
        res.send({
          status: 400,
          message: err,
        });
      });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err,
    });
  }
};
exports.octroi = async (req, res, next) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request().execute("list_octroi");
      })
      .then((result) => {
        req.octroi = result.recordset;
        next();
      })
      .catch((err) => {
        res.send({
          status: 400,
          message: err,
        });
      });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err,
    });
  }
};
// exports.finance = async (req, res, next) => {
//   try {
//     await sql
//       .connect(config)
//       .then((pool) => {
//         return pool
//           .request()
//           .execute("list_finance");
//       })
//       .then((result) => {
//       req.finance=result.recordset
//       next();
//       })
//       .catch((err) => {
//         res.send({
//           status: 400,
//           message: err,
//         });
//       });
//   } catch (err) {
//     res.status(500).send({
//       status: 500,
//       message: err,
//     });
//   }
// };
// dropdown browse filter
exports.listGroupFilterMarketingEngg = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request().execute("list_marketing_engg ");
      })
      .then((result) => {
        res.send({
          status: 200,
          message: "success",
          listengg: result.recordset,
          listGroup: req.groupList,
          listregion: req.regionlist,
          siemensEngg: req.siemensEngg,
          rating: req.rating,
          pincode: req.pincode,
          department: req.department,
          designation: req.designation,
          exciseDuty: req.exciseDuty,
          pf: req.pf,
          saleTax: req.saleTax,
          serviceTax: req.serviceTax,
          travel: req.travel,
          conveyance: req.conveyance,
          freight: req.freight,
          loading: req.loading,
          insurance: req.insurance,
          boarding: req.boarding,
          inspection: req.inspection,
          ld: req.ld,
          modeOfDispatch: req.modeOfDispatch,
          validity: req.validity,
          delivery: req.delivery,
          payment: req.payment,
          octroi: req.octroi,
          finance: req.finance,
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
// dropdown term and condition
exports.finance = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool.request().execute("list_finance ");
      })
      .then((result) => {
        res.send({
          status: 200,
          message: "success",
          exciseDuty: req.exciseDuty,
          pf: req.pf,
          saleTax: req.saleTax,
          serviceTax: req.serviceTax,
          travel: req.travel,
          conveyance: req.conveyance,
          freight: req.freight,
          loading: req.loading,
          insurance: req.insurance,
          boarding: req.boarding,
          inspection: req.inspection,
          ld: req.ld,
          modeOfDispatch: req.modeOfDispatch,
          validity: req.validity,
          delivery: req.delivery,
          payment: req.payment,
          octroi: req.octroi,
          finance: result.recordset,
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
//insert
exports.insertAccountMaster = asyncHandler(async (req, res) => {
  try {
    let partySupply = new sql.Table("partysupplyitems");
    partySupply.columns.add("item_id", sql.Int);
    req.body.partyList.forEach((element) => {
      partySupply.rows.add(element.item_id);
    });
    let contactPerson = new sql.Table("cperson");
    contactPerson.columns.add("cperson_name", sql.VarChar(50));
    contactPerson.columns.add("company_name", sql.Int);
    contactPerson.columns.add("department_id", sql.Int);
    contactPerson.columns.add("department_name", sql.VarChar(100));
    contactPerson.columns.add("designation_id", sql.Int);
    contactPerson.columns.add("designation_name", sql.VarChar(100));

    contactPerson.columns.add("mobile", sql.VarChar(20));
    contactPerson.columns.add("email", sql.VarChar(100));
    contactPerson.columns.add("phone", sql.VarChar(20));
    contactPerson.columns.add("extn", sql.VarChar(20));
    contactPerson.columns.add("vcard_path", sql.VarChar(sql.MAX));
    req.body.cpersonList.forEach((element) => {
      contactPerson.rows.add(
        element.cperson_name,
        element.company_name,
        element.department_id,
        element.department_name,
        element.designation_id,
        element.designation_name,

        element.mobile,
        element.email,
        element.phone,
        element.extn,
        element.vcard_path
      );
    });
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("company_name", req.body.company_name)
          .input("company_id", req.body.company_id)
          .input("short_name", req.body.short_name)
          .input("group_id", req.body.group_id)
          .input("group_name", req.body.group_name)
          .input("address1", req.body.address1)
          .input("address2", req.body.address2)
          .input("pin_id", req.body.pin_code_id)
          .input("pin_code", req.body.pin_code_no)
          .input("region_id", req.body.region_id)
          .input("region_name", req.body.region_name)
          .input("phone1", req.body.phone1)
          .input("phone2", req.body.phone2)
          .input("mobile", req.body.mobile)
          .input("fax", req.body.fax)
          .input("email", req.body.email)
          .input("website", req.body.website)
          .input("rating_id", req.body.rating_id)
          .input("rating_name", req.body.rating_name)
          .input("mark_engg", req.body.name)
          .input("se_id", req.body.se_id)
          .input("siem_engg", req.body.Engg_name)
          .input("remarks", req.body.remarks)
          .input("distance", req.body.distance)
          .input("credit_limit", req.body.credit_limit)
          .input("credit_period", req.body.credit_period)
          .input("range", req.body.range)
          .input("division", req.body.division)
          .input("comm", req.body.comm)
          .input("ecc_no", req.body.ecc_no)
          .input("ser_tax_no", req.body.ser_tax_no)
          .input("pan_no", req.body.pan_no)
          .input("tin_no", req.body.tin_no)
          .input("cst_no", req.body.cst_no)
          .input("lst_no", req.body.lst_no)
          .input("pla_no", req.body.pla_no)
          .input("edit", req.body.edit)
          .input("hide", req.body.hide)
          .input("boarding_id", req.body.boarding_id)
          .input("delivery_id", req.body.delivery_id)
          .input("exciseduty_id", req.body.exciseduty_id)
          .input("finance_id", req.body.finance_id)
          .input("freight_id", req.body.freight_id)
          .input("insurance_id", req.body.insurance_id)
          .input("inspection_id", req.body.inspection_id)
          .input("ld_id", req.body.ld_id)
          .input("loading_id", req.body.loading_id)
          .input("mode_of_dispatch_id", req.body.mode_of_dispatch_id)
          .input("octroi_id", req.body.octroi_id)
          .input("payment_id", req.body.payment_id)
          .input("pf_id", req.body.pf_id)
          .input("salestax_id", req.body.salestax_id)
          .input("servicetax_id", req.body.servicetax_id)
          .input("validity_id", req.body.validity_id)
          .input("conveyance_id", req.body.conveyance_id)
          .input("travel_id", req.body.travel_id)
          .input("user_id", req.body.user_id)
          .input("user_name", req.body.user_name)
          .input("contactdetails", sql.TVP, contactPerson)
          .input("partyitems", sql.TVP, partySupply)
          .input("account_type", req.body.account_type)
          .output("new_identity")
          .execute("insert_account_master ");
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
    console.log(error)
    res.status(500).send({
      status: 500,
      message: error,
    });
  }
});
exports.previewAccountMaster = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("company_id", req.body.company_id)
          .execute("preview_account_master");
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
exports.deleteAccountMaster = asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("company_id", req.body.company_id)
          .execute("delete_account_master");
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
