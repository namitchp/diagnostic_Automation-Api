const { config } = require("../../config/config");
const express=require("express")

const ioniaRoutes=express.Router();
const sql=require("mssql");
const path=require("path");
const multer=require("multer")
require('dotenv').config();
const axios=require("axios");
const sendWhatsapp = async (mobile, name,link="https://diagnodeapi.quickgst.in") => {

    var msg = `Dear ${name.toUpperCase()},                                                                                                                       Thank you for the registration.                                                                                                                        IONIA INDIA Welcomes you on the Distributor's meet.                                                                                                                        For more event details please check the video.                                                                                                                                                                                                                                                  Thanks and Regards!                                                                                                                      TEAM IONIA`;
    token = process.env.TOKEN || 2334
    await axios.get("https://md1.enotify.app/api/sendText?token=" + token + "&phone=91" + mobile + "&link=" + link + "&message=" + msg + "")
        .then(response => {
            console.log(response.data.status)
       
        })
};

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // Uploads is the Upload_folder_name
        cb(null, 'uploads');
    },
    // dest: './uploads/',
    filename: function(req, file, cb) {
        var ext = path.extname(file.originalname);
        if (ext == '.pdf') {
            var f_name = 'file';
        } else {
            var f_name = 'image';
        }
     
        cb(null, f_name + '-' + Date.now() + ext);
    },
});

// Define the maximum size for uploading
// picture i.e. 12 MB. it is optional
const maxSize = 12 * 1024 * 1024;

var upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function(req, file, cb) {
        // Set the filetypes, it is optional
        var filetypes = /jpeg|jpg|png|pdf/;
        var mimetype = filetypes.test(file.mimetype);

        var extname = filetypes.test(
            path.extname(file.originalname).toLowerCase()
        );

        if (mimetype && extname) {
            return cb(null, true);
        }

        cb(
            'Error: File upload only supports the ' +
            'following filetypes - ' +
            filetypes
        );
    },
});

ioniaRoutes.post("/file",upload.single("file_path"),(req,res)=>{
   
    
    try{
      
        res.json({
            status:200,
            message:"Ionia",
            file_name:req.file
             
        })
    }catch(err){
      
        res.send({
            message:""+err,
            status:500
        })
    }
  
});
ioniaRoutes.post('/insert',upload.single("file_path"),async(req,res)=>{
try{
let eventPerson=new sql.Table("ionia_event_registration_person")
  eventPerson.columns.add("person_name",sql.NVarChar(100))
  eventPerson.columns.add("mobile",sql.NVarChar(100))
  eventPerson.columns.add("file_path",sql.NVarChar(sql.MAX))
  req.body.person.forEach(item => {
    eventPerson.rows.add(
    item.person_name,
    item.mobile,
    item.file_path,
    )
  });

    sql.connect(config)
    .then(pool=>{
        return pool.request()
        .input("tran_id",req.body.tran_id)
        .input("name",req.body.name)
        .input("mobile",req.body.mobile)
        .input("email",req.body.email)
        .input("company_name",req.body.company_name)
        .input("address",req.body.address)
        .input("city",req.body.city)
        .input("state",req.body.state)
        .input("stay_required",req.body.stay_required)
        .input("brand",req.body.brand)
        .input("cert_company_name",req.body.cert_company_name)
        .input("cert_owner_name",req.body.cert_owner_name)
        .input("cert_gstin",req.body.cert_gstin)
        .input("cert_address",req.body.cert_address)
        .input("cert_city",req.body.cert_city)
        .input("cert_state",req.body.cert_state)
        .input("cert_pin",req.body.cert_pin)
        .input("ionia_event_registration_person",sql.TVP,eventPerson)
        .output("new_identity")
        .execute("insert_ionia_event_registration")
    }).then(result=>{
        if(result.recordset.length>0){
            result.recordset.forEach(val=>{
                   sendWhatsapp(val.mobile,val.person_name);
            })
        }
        // sendWhatsapp(result.recordset[0].mobile, result.recordset[0].otp);
        res.status(200).json({
            status:200,
            message:"success",
            data:result.recordset
        })
    }).catch(err=>{
        res.status(400).json({
            status:400,
            message:""+err
        }) 
    })

}catch(err){
    res.status(500).json({
        status:500,
        message:err
    })
}
});



module.exports={ioniaRoutes}