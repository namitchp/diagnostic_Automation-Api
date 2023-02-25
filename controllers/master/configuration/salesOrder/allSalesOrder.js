const { config } = require("../../../../config/config");
const sql=require("mssql");
const asyncHandler=require("express-async-handler");
// Clause
exports.browseClause= asyncHandler(async (req, res) => {
    try {
      const { filter_value, page_number, page_size, sort_column, sort_order } =
        req.query;
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("global",filter_value)
            .execute("browse_ldclause_new");
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
  exports.insertClause= asyncHandler(async (req, res) => {
    try {
    
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("ld_id",req.body.ld_id)
          .input("ld_name",req.body.ld_name)
          .input("description",req.body.description)
          .input("user_id",req.body.user_id)
          // .input("user_name",req.body.user_name)
          .output("new_identity")
            .execute("insert_ldclause_master ");
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
  exports.deleteClause= asyncHandler(async (req, res) => {
    try {
     
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("ld_id",req.body.ld_id)
            .execute("delete_ldclause ");
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
  exports.previewClause= asyncHandler(async (req, res) => {
    try {
    
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("ld_id",req.body.ld_id)
            .execute("preview_ldclause");
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
//freight
exports.browseFreight= asyncHandler(async (req, res) => {
  try {
    const { filter_value, page_number, page_size, sort_column, sort_order } =
      req.query;
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("global",filter_value)
          .execute("browse_freight_new");
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
exports.insertFreight= asyncHandler(async (req, res) => {
  try {
  
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
        .input("freight_id",req.body.freight_id)
        .input("freight_name",req.body.freight_name)
        .input("description",req.body.description)
        .input("user_id",req.body.user_id)
        // .input("user_name",req.body.user_name)
        .output("new_identity")
          .execute("insert_freight_master");
      })
      .then((result) => {
      
        res.send({
          status: 200,
        message:"success",
        
    
        });
      })
      .catch((err) => {
        console.log(err)
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
exports.deleteFreight= asyncHandler(async (req, res) => {
  try {
   
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("freight_id",req.body.freight_id)
          .execute("delete_freight ");
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
exports.previewFreight= asyncHandler(async (req, res) => {
  try {
  
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
        .input("freight_id",req.body.freight_id)
          .execute("preview_freight");
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
//Insurance
exports.browseInsurance= asyncHandler(async (req, res) => {
  try {
    const { filter_value, page_number, page_size, sort_column, sort_order } =
      req.query;
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("global",filter_value)
          .execute("browse_insurance_new");
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
exports.insertInsurance= asyncHandler(async (req, res) => {
  try {
   
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
        .input("insurance_id",req.body.insurance_id)
        .input("description",req.body.description)
        .input("insurance_name",req.body.insurance_name)
        .input("user_id",req.body.user_id)
        // .input("user_name",req.body.user_name)
        .output("new_identity")
          .execute("insert_insurance_master");
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
exports.deleteInsurance= asyncHandler(async (req, res) => {
  try {
   
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("insurance_id",req.body.insurance_id)
          .execute("delete_insurance ");
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
exports.previewInsurance= asyncHandler(async (req, res) => {
  try {
  
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
        .input("insurance_id",req.body.insurance_id)
          .execute("preview_insurance");
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
//octroi
exports.browseOctroi= asyncHandler(async (req, res) => {
    try {
        const { filter_value, page_number, page_size, sort_column, sort_order } =
          req.query;
        await sql
          .connect(config)
          .then((pool) => {
            return pool
              .request()
              .input("global",filter_value)
              .execute("browse_octroi_new");
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
    exports.insertOctroi= asyncHandler(async (req, res) => {
        try{
        await sql
          .connect(config)
          .then((pool) => {
            return pool
              .request()
            .input("octroi_id",req.body.octroi_id)
            .input("description",req.body.description)
            .input("octroi_name",req.body.octroi_name)
            .input("user_id",req.body.user_id)
            // .input("user_name",req.body.user_name)
            .output("new_identity")
              .execute("insert_octroi_master");
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
    exports.deleteOctroi= asyncHandler(async (req, res) => {
      try {
       
        await sql
          .connect(config)
          .then((pool) => {
            return pool
              .request()
              .input("octroi_id",req.body.octroi_id)
              .execute("delete_octroi ");
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
    exports.previewOctroi= asyncHandler(async (req, res) => {
      try {
      
        await sql
          .connect(config)
          .then((pool) => {
            return pool
              .request()
            .input("octroi_id",req.body.octroi_id)
              .execute("preview_octroi");
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
    //pf
    
    exports.browsePf= asyncHandler(async (req, res) => {
  try {
    const { filter_value, page_number, page_size, sort_column, sort_order } =
      req.query;
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("global",filter_value)
          .execute("browse_pf_new");
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
exports.insertPf= asyncHandler(async (req, res) => {
  try {
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
        .input("pf_id",req.body.pf_id)
        .input("description",req.body.description)
        .input("pf_name",req.body.pf_name)
        .input("user_id",req.body.user_id)
        // .input("user_name",req.body.user_name)
        .output("new_identity")
          .execute("insert_pf_master");
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
exports.deletePf= asyncHandler(async (req, res) => {
  try {
   
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("pf_id",req.body.pf_id)
          .execute("delete_pf ");
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
exports.previewPf= asyncHandler(async (req, res) => {
  try {
  
    await sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
        .input("pf_id",req.body.pf_id)
          .execute("preview_pf");
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
//Loading
exports.browseLoading= asyncHandler(async (req, res) => {
    try {
      const { filter_value, page_number, page_size, sort_column, sort_order } =
        req.query;
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("global",filter_value)
            .execute("browse_loading_new");
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
  exports.insertLoading= asyncHandler(async (req, res) => {
    try {
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("loading_id",req.body.loading_id)
          .input("description",req.body.description)
          .input("loading_name",req.body.loading_name)
          .input("user_id",req.body.user_id)
          // .input("user_name",req.body.user_name)
          .output("new_identity")
            .execute("insert_loading_master");
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
  exports.deleteLoading= asyncHandler(async (req, res) => {
    try {
     
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("loading_id",req.body.loading_id)
            .execute("delete_loading ");
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
  exports.previewLoading= asyncHandler(async (req, res) => {
    try {
    
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("loading_id",req.body.loading_id)
            .execute("preview_loading");
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
  //Boarding
  exports.browseBoarding= asyncHandler(async (req, res) => {
    try {
      const { filter_value, page_number, page_size, sort_column, sort_order } =
        req.query;
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("global",filter_value)
            .execute("browse_boarding_new");
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
  exports.insertBoarding= asyncHandler(async (req, res) => {
    try{
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("boarding_id",req.body.boarding_id)
          .input("description",req.body.description)
          .input("boarding_name",req.body.boarding_name)
          .input("user_id",req.body.user_id)
          // .input("user_name",req.body.user_name)
          .output("new_identity")
            .execute("insert_boarding_master");
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
  exports.deleteBoarding= asyncHandler(async (req, res) => {
    try {
     
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("boarding_id",req.body.boarding_id)
            .execute("delete_boarding ");
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
  exports.previewBoarding= asyncHandler(async (req, res) => {
    try {
    
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("boarding_id",req.body.boarding_id)
            .execute("preview_boarding");
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
  //Travel
  exports.browseTravel= asyncHandler(async (req, res) => {
    try {
      const { filter_value, page_number, page_size, sort_column, sort_order } =
        req.query;
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("global",filter_value)
            .execute("browse_travel_new");
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
  exports.insertTravel= asyncHandler(async (req, res) => {
    try {
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("travel_id",req.body.travel_id)
          .input("description",req.body.description)
          .input("travel_name",req.body.travel_name)
          .input("user_id",req.body.user_id)
          // .input("user_name",req.body.user_name)
          .output("new_identity")
            .execute("insert_travel_master");
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
  exports.deleteTravel= asyncHandler(async (req, res) => {
    try {
     
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("travel_id",req.body.travel_id)
            .execute("delete_travel ");
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
  exports.previewTravel= asyncHandler(async (req, res) => {
    try {
    
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("travel_id",req.body.travel_id)
            .execute("preview_travel");
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
  //Conveyance
  exports.browseConveyance= asyncHandler(async (req, res) => {
    try {
      const { filter_value, page_number, page_size, sort_column, sort_order } =
        req.query;
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("global",filter_value)
            .execute("browse_conveyance_configuration_new");
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
  exports.insertConveyance= asyncHandler(async (req, res) => {
    try {
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("conveyance_id",req.body.conveyance_id)
          .input("description",req.body.description)
          .input("conveyance_name",req.body.conveyance_name)
          .input("user_id",req.body.user_id)
          // .input("user_name",req.body.user_name)
          .output("new_identity")
            .execute("insert_conveyance_master");
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
  exports.deleteConveyance= asyncHandler(async (req, res) => {
    try {
     
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("conveyance_id",req.body.conveyance_id)
            .execute("delete_conveyance_configuration ");
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
  exports.previewConveyance= asyncHandler(async (req, res) => {
    try {
    
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("conveyance_id",req.body.conveyance_id)
            .execute("preview_conveyance_configuration");
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
  //Payment
  exports.browsePayment= asyncHandler(async (req, res) => {
    try {
      const { filter_value, page_number, page_size, sort_column, sort_order } =
        req.query;
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("global",filter_value)
            .execute("browse_payment_new");
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
  exports.insertPayment= asyncHandler(async (req, res) => {
    try {
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("payment_id",req.body.payment_id)
          .input("description",req.body.description)
          .input("payment_name",req.body.payment_name)
          .input("user_id",req.body.user_id)
          // .input("user_name",req.body.user_name)
          .output("new_identity")
            .execute("insert_payment_master");
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
  exports.deletePayment= asyncHandler(async (req, res) => {
    try {
     
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("payment_id",req.body.payment_id)
            .execute("delete_payment ");
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
  exports.previewPayment= asyncHandler(async (req, res) => {
    try {
    
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("payment_id",req.body.payment_id)
            .execute("preview_payment");
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
  //Salestax
  exports.browseSalestax= asyncHandler(async (req, res) => {
    try {
      const { filter_value, page_number, page_size, sort_column, sort_order } =
        req.query;
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("global",filter_value)
            .execute("browse_salestax_new");
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
  exports.insertSalestax= asyncHandler(async (req, res) => {
    try {
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("salestax_id",req.body.salestax_id)
          .input("description",req.body.description)
          .input("salestax_name",req.body.salestax_name)
          .input("user_id",req.body.user_id)
          // .input("user_name",req.body.user_name)
          .output("new_identity")
            .execute("insert_salestax_master");
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
  exports.deleteSalestax= asyncHandler(async (req, res) => {
    try {
     
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("salestax_id",req.body.salestax_id)
            .execute("delete_salestax ");
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
  exports.previewSalestax= asyncHandler(async (req, res) => {
    try {
    
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("salestax_id",req.body.salestax_id)
            .execute("preview_salestax");
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
  //Exciseduty
  exports.browseExciseduty= asyncHandler(async (req, res) => {
    try {
      const { filter_value, page_number, page_size, sort_column, sort_order } =
        req.query;
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("global",filter_value)
            .execute("browse_exciseduty_new");
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
  exports.insertExciseduty= asyncHandler(async (req, res) => {
    try {
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("exciseduty_id ",req.body.exciseduty_id )
          .input("description",req.body.description)
          .input("exciseduty_name",req.body.exciseduty_name)
          .input("costing_tabs_details",sql.TVP,tabDetail)
          .input("user_id",req.body.user_id)
          // .input("user_name",req.body.user_name)
          .output("new_identity")
            .execute("insert_exciseduty_master");
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
  exports.deleteExciseduty= asyncHandler(async (req, res) => {
    try {
     
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("exciseduty_id",req.body.exciseduty_id)
            .execute("delete_exciseduty ");
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
  exports.previewExciseduty= asyncHandler(async (req, res) => {
    try {
    
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("exciseduty_id",req.body.exciseduty_id)
            .execute("preview_exciseduty");
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
  //Servicetax
  exports.browseServicetax= asyncHandler(async (req, res) => {
    try {
      const { filter_value, page_number, page_size, sort_column, sort_order } =
        req.query;
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("global",filter_value)
            .execute("browse_servicetax_new");
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
  exports.insertServicetax= asyncHandler(async (req, res) => {
    try {
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("servicetax_id",req.body.servicetax_id)
          .input("description",req.body.description)
          .input("servicetax_name",req.body.servicetax_name)
          .input("user_id",req.body.user_id)
          // .input("user_name",req.body.user_name)
          .output("new_identity")
            .execute("insert_servicetax_master");
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
  exports.deleteServicetax= asyncHandler(async (req, res) => {
    try {
     
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("servicetax_id",req.body.servicetax_id)
            .execute("delete_servicetax ");
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
  exports.previewServicetax= asyncHandler(async (req, res) => {
    try {
    
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("servicetax_id",req.body.servicetax_id)
            .execute("preview_servicetax");
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
//delivery
exports.browseDelivery= asyncHandler(async (req, res) => {
    try {
      const { filter_value, page_number, page_size, sort_column, sort_order } =
        req.query;
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("global",filter_value)
            .execute("browse_delivery_new");
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
  exports.insertDelivery= asyncHandler(async (req, res) => {
    try {
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("delivery_id",req.body.delivery_id)
          .input("description",req.body.description)
          .input("delivery_name",req.body.delivery_name)
          .input("user_id",req.body.user_id)
          // .input("user_name",req.body.user_name)
          .output("new_identity")
            .execute("insert_delivery_master");
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
  exports.deleteDelivery= asyncHandler(async (req, res) => {
    try {
     
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("delivery_id",req.body.delivery_id)
            .execute("delete_delivery ");
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
  exports.previewDelivery= asyncHandler(async (req, res) => {
    try {
    
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("delivery_id",req.body.delivery_id)
            .execute("preview_delivery");
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
  //Validity
  exports.browseValidity= asyncHandler(async (req, res) => {
    try {
      const { filter_value, page_number, page_size, sort_column, sort_order } =
        req.query;
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("global",filter_value)
            .execute("browse_validity_new");
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
  exports.insertValidity= asyncHandler(async (req, res) => {
    try {
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("validity_id",req.body.validity_id)
          .input("description",req.body.description)
          .input("validity_name",req.body.validity_name)
          .input("user_id",req.body.user_id)
          // .input("user_name",req.body.user_name)
          .output("new_identity")
            .execute("insert_validity_master");
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
  exports.deleteValidity= asyncHandler(async (req, res) => {
    try {
     
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("validity_id",req.body.validity_id)
            .execute("preview_validity ");
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
  exports.previewValidity= asyncHandler(async (req, res) => {
    try {
    
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("validity_id",req.body.validity_id)
            .execute("preview_validity");
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
  //mode
  exports.browseMode= asyncHandler(async (req, res) => {
    try {
      const { filter_value, page_number, page_size, sort_column, sort_order } =
        req.query;
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("global",filter_value)
            .execute("browse_mode_of_dispatch_new");
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
  exports.insertMode= asyncHandler(async (req, res) => {
    try {
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("mode_of_dispatch_id",req.body.mode_of_dispatch_id)
          .input("description",req.body.description)
          .input("mode_of_dispatch_name",req.body.mode_of_dispatch_name)
          .input("user_id",req.body.user_id)
          // .input("user_name",req.body.user_name)
          .output("new_identity")
            .execute("insert_mode_of_dispatch_master");
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
  exports.deleteMode= asyncHandler(async (req, res) => {
    try {
     
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("mode_of_dispatch_id",req.body.mode_of_dispatch_id)
            .execute("delete_mode_of_dispatch ");
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
  exports.previewMode= asyncHandler(async (req, res) => {
    try {
    
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("mode_of_dispatch_id",req.body.mode_of_dispatch_id)
            .execute("preview_mode_of_dispatch");
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
  //Inspection
  exports.browseInspection= asyncHandler(async (req, res) => {
    try {
      const { filter_value, page_number, page_size, sort_column, sort_order } =
        req.query;
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("global",filter_value)
            .execute("browse_inspection_new");
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
  exports.insertInspection= asyncHandler(async (req, res) => {
    try {
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("inspection_id",req.body.inspection_id)
          .input("description",req.body.description)
          .input("inspection_name",req.body.inspection_name)
          .input("user_id",req.body.user_id)
          // .input("user_name",req.body.user_name)
          .output("new_identity")
            .execute("insert_inspection_master");
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
  exports.deleteInspection= asyncHandler(async (req, res) => {
    try {
     
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("inspection_id",req.body.inspection_id)
            .execute("delete_inspection ");
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
  exports.previewInspection= asyncHandler(async (req, res) => {
    try {
    
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("inspection_id",req.body.inspection_id)
            .execute("preview_inspection_master");
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