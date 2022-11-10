const sql = require("mssql");
const config = require("../../../config/config.js")
const asyncHandler = require("express-async-handler")
exports.getJw = asyncHandler(async (req, res, next) => {
    res.send("jw Get")
});