const salesRoute=require("express").Router();

const { browseCosting, currentFy, previewCostingTabs, generateCostNo, pickcCosting, getCosting } = require("../controllers/sales/costing");


salesRoute.post('/browse_cos',browseCosting)

salesRoute.post("/current_fy",currentFy)
salesRoute.post("/preview_costing",previewCostingTabs)
salesRoute.post("/generate_cost",generateCostNo)
salesRoute.post("/pick_cost",pickcCosting)
salesRoute.post("/get_cost",getCosting)




module.exports={salesRoute};