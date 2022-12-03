const { browseGroup, insertGroup, previewGroup, deleteGroup } = require('../controllers/master/configuration/account/group');
const { browsePinCode, insertPinCode, previewPinCode, deletePinCode } = require('../controllers/master/configuration/account/pinCode');

const masterRoutes=require('express').Router();
///group
masterRoutes.post("/browse_group",browseGroup);
masterRoutes.post("/insert_group",insertGroup);
masterRoutes.post("/preview_group",previewGroup);
masterRoutes.post("/delete_group",deleteGroup);
//pincode
masterRoutes.post("/browse_pincode",browsePinCode);
masterRoutes.post("/insert_pincode",insertPinCode);
masterRoutes.post("/preview_pincode",previewPinCode);
masterRoutes.post("/delete_pincode",deletePinCode);
module.exports={masterRoutes};