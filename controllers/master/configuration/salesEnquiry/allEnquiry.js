const { config } = require("../../../../config/config");
const sql=require("mssql");
const asyncHandler=require("express-async-handler");
// type
exports.browseType= asyncHandler(async (req, res) => {
    try {
      const { filter_value, page_number, page_size, sort_column, sort_order } =
        req.query;
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("global",filter_value)
            .execute("list_enq_type_new ");
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
exports.insertType= asyncHandler(async (req, res) => {
    try {
    
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("enq_type_id",req.body.enq_type_id)
          .input("enq_type",req.body.enq_type)
          .input("description",req.body.description)
          .input("user_id",req.body.user_id)
          // .input("user_name",req.body.user_name)
          .output("new_identity")
            .execute("insert_enq_type_master ");
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
  exports.deleteType= asyncHandler(async (req, res) => {
    try {
     
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("enq_type_id",req.body.enq_type_id)
            .execute("delete_enq_type ");
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
  exports.previewType= asyncHandler(async (req, res) => {
    try {
    
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("enq_type_id",req.body.enq_type_id)
            .execute("preview_enq_type");
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
//priority
exports.browsePriority= asyncHandler(async (req, res) => {
  try {
    const { filter_value, page_number, page_size, sort_column, sort_order } =
      req.query;
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("global",filter_value)
          .execute("browse_enq_priority_new");
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
exports.insertPriority= asyncHandler(async (req, res) => {
  try {
  
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
        .input("enq_priority_id",req.body.enq_priority_id)
        .input("enq_priority",req.body.enq_priority)
        .input("description",req.body.description)
        .input("user_id",req.body.user_id)
        // .input("user_name",req.body.user_name)
        .output("new_identity")
          .execute("insert_enq_priority_master");
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
exports.deletePriority= asyncHandler(async (req, res) => {
  try {
   
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("enq_priority_id",req.body.enq_priority_id)
          .execute("delete_enq_priority ");
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
exports.previewPriority= asyncHandler(async (req, res) => {
  try {
  
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
        .input("enq_priority_id",req.body.enq_priority_id)
          .execute("preview_enq_priority");
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
// reference
exports.browseReference= asyncHandler(async (req, res) => {
  try {
    const { filter_value, page_number, page_size, sort_column, sort_order } =
      req.query;
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("global",filter_value)
          .execute("list_enq_ref_new ");
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
exports.insertReference= asyncHandler(async (req, res) => {
  try {
  
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
        .input("enq_ref_id",req.body.enq_ref_id)
        .input("enq_ref",req.body.enq_ref)
        .input("description",req.body.description)
        .input("user_id",req.body.user_id)
        // .input("user_name",req.body.user_name)
        .output("new_identity")
          .execute("insert_enq_ref_master ");
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
exports.deleteReference= asyncHandler(async (req, res) => {
  try {
   
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("enq_ref_id",req.body.enq_ref_id)
          .execute("delete_enq_ref ");
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
exports.previewReference= asyncHandler(async (req, res) => {
  try {
  
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
        .input("enq_ref_id",req.body.enq_ref_id)
          .execute("preview_enq_ref");
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
// status
exports.browseStatus= asyncHandler(async (req, res) => {
  try {
    const { filter_value, page_number, page_size, sort_column, sort_order } =
      req.query;
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("global",filter_value)
          .execute("list_enq_status_new ");
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
exports.insertStatus= asyncHandler(async (req, res) => {
  try {
  
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
        .input("status_id",req.body.status_id)
        .input("status_name",req.body.status_name)
        .input("description",req.body.description)
        .input("user_id",req.body.user_id)
        // .input("user_name",req.body.user_name)
        .output("new_identity")
          .execute("insert_enq_status_master ");
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
exports.deleteStatus= asyncHandler(async (req, res) => {
  try {
   
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("status_id",req.body.status_id)
          .execute("delete_enq_status ");
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
exports.previewStatus= asyncHandler(async (req, res) => {
  try {
  
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
        .input("status_id",req.body.status_id)
          .execute("preview_enq_status");
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