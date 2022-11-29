const { getCcr, browseCcrIn, browseCCrOut } = require("../controllers/logistics/ccr/ccr");
const { browseCourierIn, browseCourierOut, browseCourierInvoice } = require("../controllers/logistics/courier/courier");
const { browseJwIn, browseJwOut } = require("../controllers/logistics/jw/jw");

const { browseMrnDc, prevMrnMainDetailDc, prevMrnItemDetailDc, insertMrnMainDetailDc, pickDcInMrn, DcDetailInMrn, getMrn, browseMrnPo } = require("../controllers/logistics/mrn/mrn");
const { browseRgp, browseRrgp } = require("../controllers/logistics/rgp/rgp");
const logisticRoute=require("express").Router();

///mrn
logisticRoute.post("/browse_mrn_dc",browseMrnDc);
logisticRoute.post("/browse_mrn_po",browseMrnPo);
logisticRoute.post("/prev_mrn_dc_main_detail",prevMrnMainDetailDc);
logisticRoute.post("/prev_mrn_dc_item_detail",prevMrnItemDetailDc);
logisticRoute.post("/insert_Mrn_main_details_dc",insertMrnMainDetailDc);
logisticRoute.get('/pick-dc-in-mrn',pickDcInMrn);
logisticRoute.get('/dc_detail_in_mrn',DcDetailInMrn);
logisticRoute.get('/get',getMrn);
//ccr
logisticRoute.get('/get_ccr',getCcr);
logisticRoute.post("/browse_ccrin",browseCcrIn);
logisticRoute.post("/browse_ccrout",browseCCrOut);
// jw
logisticRoute.post("/browse_jwout",browseJwOut);
logisticRoute.post("/browse_jwin",browseJwIn);
//courier
logisticRoute.post("/browse_courierin",browseCourierIn);
logisticRoute.post("/browse_courierout",browseCourierOut);
logisticRoute.post("/browse_courierinvoice",browseCourierInvoice);
// rgp
logisticRoute.post("/browse_rgp",browseRgp);
logisticRoute.post("/browse_rrgp",browseRrgp);


module.exports=logisticRoute;
