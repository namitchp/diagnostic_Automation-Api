const { browseCourier, previewCourier, insertCourier, deleteCourier } = require('../controllers/master/configuration/courier/courier');
const { browseDepartment, insertDepartment, previewDepartment, deleteDepartment } = require('../controllers/master/configuration/account/department');
const { browseDesignation, insertDesignation, previewDesignation, deleteDesignation } = require('../controllers/master/configuration/account/designation');
const { browseGroup, insertGroup, previewGroup, deleteGroup } = require('../controllers/master/configuration/account/group');
const { browsePinCode, insertPinCode, previewPinCode, deletePinCode } = require('../controllers/master/configuration/account/pinCode');
const { browseQuo, insertQuo, previewQuo, deleteQuo } = require('../controllers/master/configuration/quotation/quotation');
const { browseRating, insertRating, previewRating, deleteRating } = require('../controllers/master/configuration/account/rating');
const { browseRegion, insertRegion, previewRegion, deleteRegion } = require('../controllers/master/configuration/account/region');
const { browseSiemen, insertSiemen, previewSiemen, deleteSiemen } = require('../controllers/master/configuration/account/siemens');
const { browseSupply, insertSupply, previewSupply, deleteSupply } = require('../controllers/master/configuration/account/supply');
const { browseLedger, insertLedger, previewLedger, deleteLedger, browseFinance, insertFinance, previewFinance, deleteFinance, browseTabs, insertTabs, previewTabs, deleteTabs } = require('../controllers/master/configuration/costing/allCosting');
const { browseCategory, insertCategory, previewCategory, deleteCategory } = require('../controllers/master/configuration/product/category');
const { browseGg, insertGg, previewGg, deleteGg } = require('../controllers/master/configuration/product/gg');
const { browsePGroup, insertPGroup, previewPGroup, deletePGroup } = require('../controllers/master/configuration/product/group');
const { browseItem, insertItem, previewItem, deleteItem } = require('../controllers/master/configuration/product/item'); 
const { browseUnit, insertUnit, previewUnit, deleteUnit } = require('../controllers/master/configuration/product/unit'); 
const { browseType, insertType, previewType, deleteType, browsePriority, insertPriority, previewPriority, deletePriority, browseStatus, insertStatus, previewStatus, deleteStatus, browseReference, insertReference, previewReference, deleteReference } = require('../controllers/master/configuration/salesEnquiry/allEnquiry');
const { browseClause, insertClause, previewClause, deleteClause, browseFreight, insertFreight, previewFreight, deleteFreight, browseInsurance, insertInsurance, previewInsurance, deleteInsurance, browseOctroi, insertOctroi, previewOctroi, deleteOctroi, browsePf, insertPf, previewPf, deletePf, browseLoading, insertLoading, previewLoading, deleteLoading, browseBoarding, insertBoarding, previewBoarding, deleteBoarding, browseTravel, insertTravel, previewTravel, deleteTravel, browseConveyance, insertConveyance, previewConveyance, deleteConveyance, browsePayment, insertPayment, previewPayment, deletePayment, browseSalestax, insertSalestax, previewSalestax, deleteSalestax, browseExciseduty, insertExciseduty, previewExciseduty, deleteExciseduty, browseDelivery, insertDelivery, previewDelivery, deleteDelivery, browseValidity, insertValidity, previewValidity, deleteValidity, browseMode, insertMode, previewMode, deleteMode, browseInspection, insertInspection, previewInspection, deleteInspection } = require('../controllers/master/configuration/salesOrder/allSalesOrder');
const { browseMenu, UpdateMenu, listTransection } = require('../controllers/master/configuration/menuStructure');
const { groupList, regionList, listGroupFilterMarketingEngg, browseAccountMaster, insertAccountMaster, pincode, designation, department, rating, siemensEngg, exciseDuty, pf, saleTax, serviceTax, travel, conveyance, freight, loading, insurance, boarding, inspection, ld, modeOfDispatch, validity, delivery, payment, octroi, finance, dropdownTermAndCondition, browseAccountMasterTcs, updateAccountMasterTcs, deleteAccountMasterTcs, supplierlist, listAccountMasterTcsCustomer, previewAccountMaster, deleteAccountMaster } = require('../controllers/master/accountMaster/customer');
const { upload } = require('../files/file');
const { insertProductMaster, browseProduct, lpList, uomList, pgroupList, dropdownList, ggList, updateProductEdit, updateProductMoving, updateProductlp, updateProductListPrice, listItem, listAi, listDi, listDo, listFc, listAo, listFm, deleteProductmaster, previewProductmaster } = require('../controllers/master/productMaster/productMaster');
const { browseMaterialCode, insertMaterialCode, partyNameList, pickCustomer, pickItem, deleteMaterialCode, previewMaterialCodeProduct, previewMaterialCodeCustomer, previewMaterialCodeMain } = require('../controllers/master/materialCode');
const { browseEmployeeMaster, insertEmployeeMaster, previewEmployeemaster, deleteEmployeemaster, listDepartmentIncharge, listDepartment } = require('../controllers/master/employeeMaster');
const masterRoutes=require('express').Router();
//file upload api
masterRoutes.post("/file",upload.single("file_path"),(req,res)=>{
    try{
        res.json({
            status:200,
            message:"success",
            file_name:req.file
        })
    }catch(err){
      
        res.send({
            message:""+err,
            status:500
        })
    }
})
///employee master 
masterRoutes.post("/browse_employee_master",browseEmployeeMaster);
masterRoutes.post("/insert_employee_master",insertEmployeeMaster);
masterRoutes.post("/delete_employee_master",deleteEmployeemaster);
masterRoutes.post("/preview_employee_master",previewEmployeemaster);
masterRoutes.post("/dropdown_employee",designation,department,listDepartmentIncharge);
// masterRoutes.post("/list_department",listDepartment);

///material code
masterRoutes.post("/browse_material_code",browseMaterialCode);
masterRoutes.post("/preview_material_code",previewMaterialCodeCustomer,previewMaterialCodeProduct,previewMaterialCodeMain);
masterRoutes.post("/insert_material_code",insertMaterialCode);
masterRoutes.post("/delete_material_code",deleteMaterialCode);
masterRoutes.post("/party_name_list",partyNameList);
masterRoutes.post("/pick_customer",pickCustomer);
masterRoutes.post("/pick_item",pickItem);
//product master
//drop techenical list
masterRoutes.post("/dropdown_techenical",listAi,listDi,listDo,listFc,listAo,listFm);
masterRoutes.post("/insert_product_master",insertProductMaster);
masterRoutes.post("/preview_product_master",previewProductmaster);
masterRoutes.post("/delete_product_master",deleteProductmaster);
masterRoutes.post("/browse_product_master",browseProduct);
masterRoutes.post("/dropdown_product",ggList,lpList,uomList,pgroupList,listItem,dropdownList);
masterRoutes.post("/update_product_edit",updateProductEdit);
masterRoutes.post("/update_product_moving",updateProductMoving);
masterRoutes.post("/update_product_lp",updateProductlp);
masterRoutes.post("/update_product_list_price",updateProductListPrice);

//Account Master customer  supplier and tcs
// tcs
masterRoutes.post("/list_account_master_tcs",supplierlist,listAccountMasterTcsCustomer);
masterRoutes.post("/browse_account_master_tcs",browseAccountMasterTcs);
masterRoutes.post("/insert_account_master_tcs",updateAccountMasterTcs);
masterRoutes.post("/delete_account_master_tcs",deleteAccountMasterTcs);

//customer  supplier
masterRoutes.post("/browse_account_master",browseAccountMaster);
masterRoutes.post("/insert_account_master",insertAccountMaster);
masterRoutes.post("/preview_account_master",previewAccountMaster);
masterRoutes.post("/delete_account_master",deleteAccountMaster);
masterRoutes.post("/listGroupFilterMarketingEngg",groupList,regionList,pincode,designation,department,rating,siemensEngg,listGroupFilterMarketingEngg);
masterRoutes.post("/dropdown_term_and_condition", exciseDuty,pf,saleTax,serviceTax,travel,conveyance,freight,loading,insurance,boarding,inspection,ld,modeOfDispatch,validity,delivery,payment,octroi,finance);

///configure master
//menu stracture
masterRoutes.post("/browse_menu",browseMenu);
masterRoutes.post("/insert_menu",UpdateMenu);
masterRoutes.post("/list_transection",listTransection);
///group  Account
masterRoutes.post("/browse_group",browseGroup);
masterRoutes.post("/insert_group",insertGroup);
masterRoutes.post("/preview_group",previewGroup);
masterRoutes.post("/delete_group",deleteGroup);
//pincode
masterRoutes.post("/browse_pincode",browsePinCode);
masterRoutes.post("/insert_pincode",insertPinCode);
masterRoutes.post("/preview_pincode",previewPinCode);
masterRoutes.post("/delete_pincode",deletePinCode);
//region
masterRoutes.post("/browse_region",browseRegion);
masterRoutes.post("/insert_region",insertRegion);
masterRoutes.post("/preview_region",previewRegion);
masterRoutes.post("/delete_region",deleteRegion);
//department
masterRoutes.post("/browse_department",browseDepartment);
masterRoutes.post("/insert_department",insertDepartment);
masterRoutes.post("/preview_department",previewDepartment);
masterRoutes.post("/delete_department",deleteDepartment);
//designation
masterRoutes.post("/browse_designation",browseDesignation);
masterRoutes.post("/insert_designation",insertDesignation);
masterRoutes.post("/preview_designation",previewDesignation);
masterRoutes.post("/delete_designation",deleteDesignation);
//rating
masterRoutes.post("/browse_rating",browseRating);
masterRoutes.post("/insert_rating",insertRating);
masterRoutes.post("/preview_rating",previewRating);
masterRoutes.post("/delete_rating",deleteRating);
//region
masterRoutes.post("/browse_region",browseRegion);
masterRoutes.post("/insert_region",insertRegion);
masterRoutes.post("/preview_region",previewRegion);
masterRoutes.post("/delete_region",deleteRegion);
//siemens
masterRoutes.post("/browse_siemens",browseSiemen);
masterRoutes.post("/insert_siemens",insertSiemen);
masterRoutes.post("/preview_siemens",previewSiemen);
masterRoutes.post("/delete_siemens",deleteSiemen);
// supply
masterRoutes.post("/browse_supply",browseSupply);
masterRoutes.post("/insert_supply",insertSupply);
masterRoutes.post("/preview_supply",previewSupply);
masterRoutes.post("/delete_supply",deleteSupply);

//product //category
masterRoutes.post("/browse_category",browseCategory);
masterRoutes.post("/insert_category",insertCategory);
masterRoutes.post("/preview_category",previewCategory);
masterRoutes.post("/delete_category",deleteCategory);
// product gg
masterRoutes.post("/browse_gg",browseGg);
masterRoutes.post("/insert_gg",insertGg);
masterRoutes.post("/preview_gg",previewGg);
masterRoutes.post("/delete_gg",deleteGg);
//product group
masterRoutes.post("/browse_pgroup",browsePGroup);
masterRoutes.post("/insert_pgroup",insertPGroup);
masterRoutes.post("/preview_pgroup",previewPGroup);
masterRoutes.post("/delete_pgroup",deletePGroup);
// product item
masterRoutes.post("/browse_item",browseItem);
masterRoutes.post("/insert_item",insertItem);
masterRoutes.post("/preview_item",previewItem);
masterRoutes.post("/delete_item",deleteItem);
// product unit
masterRoutes.post("/browse_unit",browseUnit);
masterRoutes.post("/insert_unit",insertUnit);
masterRoutes.post("/preview_unit",previewUnit);
masterRoutes.post("/delete_unit",deleteUnit);
//enquiry type
masterRoutes.post("/browse_enq_type",browseType);
masterRoutes.post("/insert_enq_type",insertType);
masterRoutes.post("/preview_enq_type",previewType);
masterRoutes.post("/delete_enq_type",deleteType);
//enquiry priority
masterRoutes.post("/browse_enq_priority",browsePriority);
masterRoutes.post("/insert_enq_priority",insertPriority);
masterRoutes.post("/preview_enq_priority",previewPriority);
masterRoutes.post("/delete_enq_priority",deletePriority);
//enquiry status
masterRoutes.post("/browse_enq_status",browseStatus);
masterRoutes.post("/insert_enq_status",insertStatus);
masterRoutes.post("/preview_enq_status",previewStatus);
masterRoutes.post("/delete_enq_status",deleteStatus);
//enquiry reference
masterRoutes.post("/browse_enq_reference",browseReference);
masterRoutes.post("/insert_enq_reference",insertReference);
masterRoutes.post("/preview_enq_reference",previewReference);
masterRoutes.post("/delete_enq_reference",deleteReference);
//costing leader
masterRoutes.post("/browse_cos_ledger",browseLedger);
masterRoutes.post("/insert_cos_ledger",insertLedger);
masterRoutes.post("/preview_cos_ledger",previewLedger);
masterRoutes.post("/delete_cos_ledger",deleteLedger);
//costing finance
masterRoutes.post("/browse_cos_finance",browseFinance);
masterRoutes.post("/insert_cos_finance",insertFinance);
masterRoutes.post("/preview_cos_finance",previewFinance);
masterRoutes.post("/delete_cos_finance",deleteFinance);
//costing tab
masterRoutes.post("/browse_cos_tab",browseTabs);
masterRoutes.post("/insert_cos_tab",insertTabs);
masterRoutes.post("/preview_cos_tab",previewTabs);
masterRoutes.post("/delete_cos_tab",deleteTabs);

// sales order  clasue
masterRoutes.post("/browse_sale_clasue",browseClause);
masterRoutes.post("/insert_sale_clasue",insertClause);
masterRoutes.post("/preview_sale_clasue",previewClause);
masterRoutes.post("/delete_sale_clasue",deleteClause);
//sales freight
masterRoutes.post("/browse_sale_freight",browseFreight);
masterRoutes.post("/insert_sale_freight",insertFreight);
masterRoutes.post("/preview_sale_freight",previewFreight);
masterRoutes.post("/delete_sale_freight",deleteFreight);

//sales insurance
masterRoutes.post("/browse_sale_insurance",browseInsurance);
masterRoutes.post("/insert_sale_insurance",insertInsurance);
masterRoutes.post("/preview_sale_insurance",previewInsurance);
masterRoutes.post("/delete_sale_insurance",deleteInsurance);
//sales octroi
masterRoutes.post("/browse_sale_octroi",browseOctroi);
masterRoutes.post("/insert_sale_octroi",insertOctroi);
masterRoutes.post("/preview_sale_octroi",previewOctroi);
masterRoutes.post("/delete_sale_octroi",deleteOctroi);
//sales pf
masterRoutes.post("/browse_sale_pf",browsePf);
masterRoutes.post("/insert_sale_pf",insertPf);
masterRoutes.post("/preview_sale_pf",previewPf);
masterRoutes.post("/delete_sale_pf",deletePf);
//sales loading
masterRoutes.post("/browse_sale_loading",browseLoading);
masterRoutes.post("/insert_sale_loading",insertLoading);
masterRoutes.post("/preview_sale_loading",previewLoading);
masterRoutes.post("/delete_sale_loading",deleteLoading);
//sales boarding
masterRoutes.post("/browse_sale_boarding",browseBoarding);
masterRoutes.post("/insert_sale_boarding",insertBoarding);
masterRoutes.post("/preview_sale_boarding",previewBoarding);
masterRoutes.post("/delete_sale_boarding",deleteBoarding);
//sales travel
masterRoutes.post("/browse_sale_travel",browseTravel);
masterRoutes.post("/insert_sale_travel",insertTravel);
masterRoutes.post("/preview_sale_travel",previewTravel);
masterRoutes.post("/delete_sale_travel",deleteTravel);
//sales Conveyance
masterRoutes.post("/browse_sale_conveyance",browseConveyance);
masterRoutes.post("/insert_sale_conveyance",insertConveyance);
masterRoutes.post("/preview_sale_conveyance",previewConveyance);
masterRoutes.post("/delete_sale_conveyance",deleteConveyance);

//sales payment
masterRoutes.post("/browse_sale_payment",browsePayment);
masterRoutes.post("/insert_sale_payment",insertPayment);
masterRoutes.post("/preview_sale_payment",previewPayment);
masterRoutes.post("/delete_sale_payment",deletePayment);
//sales Salestax
masterRoutes.post("/browse_sale_salestax",browseSalestax);
masterRoutes.post("/insert_sale_salestax",insertSalestax);
masterRoutes.post("/preview_sale_salestax",previewSalestax);
masterRoutes.post("/delete_sale_salestax",deleteSalestax);
//saLes Exciseduty
masterRoutes.post("/browse_sale_exciseduty",browseExciseduty);
masterRoutes.post("/insert_sale_exciseduty",insertExciseduty);
masterRoutes.post("/preview_sale_exciseduty",previewExciseduty);
masterRoutes.post("/delete_sale_exciseduty",deleteExciseduty);

//sales Servicetax
masterRoutes.post("/browse_sale_servicetax",browseExciseduty);
masterRoutes.post("/insert_sale_servicetax",insertExciseduty);
masterRoutes.post("/preview_sale_servicetax",previewExciseduty);
masterRoutes.post("/delete_sale_servicetax",deleteExciseduty);
// slaes  delivery
masterRoutes.post("/browse_sale_delivery",browseDelivery);
masterRoutes.post("/insert_sale_delivery",insertDelivery);
masterRoutes.post("/preview_sale_delivery",previewDelivery);
masterRoutes.post("/delete_sale_delivery",deleteDelivery);
//sales validity
masterRoutes.post("/browse_sale_validity",browseValidity);
masterRoutes.post("/insert_sale_validity",insertValidity);
masterRoutes.post("/preview_sale_validity",previewValidity);
masterRoutes.post("/delete_sale_validity",deleteValidity);
// sales mode 
masterRoutes.post("/browse_sale_mode",browseMode);
masterRoutes.post("/insert_sale_mode",insertMode);
masterRoutes.post("/preview_sale_mode",previewMode);
masterRoutes.post("/delete_sale_mode",deleteMode);
//sales inspection
masterRoutes.post("/browse_sale_inspection",browseInspection);
masterRoutes.post("/insert_sale_inspection",insertInspection);
masterRoutes.post("/preview_sale_inspection",previewInspection);
masterRoutes.post("/delete_sale_inspection",deleteInspection);
//courier
masterRoutes.post("/browse_courier",browseCourier);
masterRoutes.post("/insert_courier",insertCourier);
masterRoutes.post("/preview_courier",previewCourier);
masterRoutes.post("/delete_courier",deleteCourier);
//quotation
masterRoutes.post("/browse_quot",browseQuo);
masterRoutes.post("/insert_quot",insertQuo);
masterRoutes.post("/preview_quot",previewQuo);
masterRoutes.post("/delete_quot",deleteQuo);
module.exports={masterRoutes};
