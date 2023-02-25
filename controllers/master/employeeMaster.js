const { config } = require("../../config/config");
const sql=require("mssql");
const asyncHandler=require("express-async-handler");
//
exports.browseEmployeeMaster= asyncHandler(async (req, res) => {
    try {
      const { filter_value, page_number, page_size, sort_column, sort_order } =
        req.query;
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("global",filter_value)
            .execute("list_employee_master_new");
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
  exports.listDepartmentIncharge= asyncHandler(async (req, res) => {
    try {
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .execute("list_department_incharge");
        })
        .then((result) => {
          res.send({
            status: 200,
            message:"success",
            incharge:result.recordset,
            department:req.department,
            designation:req.designation
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
  exports.insertEmployeeMaster= asyncHandler(async (req, res) => {
    try {
    let userRight=new sql.Table("user_rights");
    userRight.columns.add("transaction_id",sql.Int);
    userRight.columns.add("transaction_name",sql.VarChar(sql.MAX));
    userRight.columns.add("edit_button",sql.Bit);
    userRight.columns.add("view_right",sql.Bit);
    userRight.columns.add("insert_right",sql.Bit);
    userRight.columns.add("update_right",sql.Bit);
    userRight.columns.add("delete_right",sql.Bit);
    userRight.columns.add("print_right",sql.Bit);
    userRight.columns.add("approve_right",sql.Bit);
    userRight.columns.add("revise_right",sql.Bit);
    userRight.columns.add("allocation_right",sql.Bit);
    userRight.columns.add("high_priority_right",sql.Bit);
    userRight.columns.add("special_column",sql.Bit);
     req.body.userRight.forEach(element => {
      userRight.rows.add(
        element.transaction_id,
        element.transaction_name,
        element.edit_button,
        element.view_right,
        element.insert_right,
        element.update_right,
        element.delete_right,
        element.print_right,
        element.approve_right,
        element.revise_right,
        element.allocation_right,
        element.high_priority_right,
        element.special_column,
      )
     });
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("user_id",req.body.user_id)
          .input("user_code",req.body.user_code)
          .input("attendance_emp_code",req.body.attendance_emp_code)
          .input("ctc_per_day",req.body.ctc_per_day)
          .input("card_no",req.body.card_no)
          .input("short_name",req.body.short_name)
          .input("first_name",req.body.first_name)
          .input("last_name",req.body.last_name)
          .input("f_h_name",req.body.f_h_name)
          .input("mother_name",req.body.mother_name)
          .input("m_status",req.body.m_status)
          .input("gender",req.body.gender)
          .input("dob",req.body.dob)
          .input("pr_add1",req.body.pr_add1)
          .input("pr_phone",req.body.pr_phone)
          .input("pr_mobile",req.body.pr_mobile)
          .input("pt_add1",req.body.pt_add1)
          .input("pt_phone",req.body.pt_phone)
          .input("pt_mobile",req.body.pt_mobile)
          .input("department_id",req.body.department_id)
          .input("department_name",req.body.department_name)
          .input("designation_id",req.body.designation_id)
          .input("designation_name",req.body.designation_name)
          .input("joining_date",req.body.joining_date)
          .input("leaving_date",req.body.leaving_date)
          .input("leaving_reason",req.body.leaving_reason)
          .input("dispensary",req.body.dispensary)
          .input("remarks",req.body.remarks)
          .input("department_inch_id",req.body.department_inch_id)
          .input("department_incharge",req.body.department_incharge)
          .input("user_name",req.body.user_name)
          .input("password",req.body.password)
          .input("email",req.body.email)
          .input("pf_code",req.body.pf_code)
          .input("esi_code",req.body.esi_code)
          .input("pan_no",req.body.pan_no)
          .input("salary_p_mode",req.body.salary_p_mode)
          .input("account_no",req.body.account_no)
          .input("bank_name",req.body.bank_name)
          .input("nominee",req.body.nominee)
          .input("edit_button",req.body.edit_button)
          .input("disable",req.body.disable)
          .input("login_user_id",req.body.login_user_id)
          .input("login_user_name",req.body.login_user_name)
          .input("sign_path",req.body.sign_path)
          .input("user_rights",sql.TVP,userRight)
          .output("new_identity")
            .execute("insert_employee_master ");
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
      console.log(error)
      res.status(500).send({
        status: 500,
        message: error,
      });
    }
  });
  exports.deleteEmployeemaster= asyncHandler(async (req, res,next) => {
    try {
    
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("user_id",req.body.user_id)
            .execute("delete_employee_master");
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
  exports.previewEmployeemaster= asyncHandler(async (req, res,next) => {
    try {
      await sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
          .input("user_id",req.body.user_id)
            .execute("preview_employee_master");
        })
        .then((result) => {
          res.send({
          status: 200,
          message:"success",
          data:result.recordset[0]
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
  //department list
