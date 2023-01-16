const jsonRoute = require("express").Router();
const fs = require("fs");
const jsonFile = "./jsonData/jsonfile.json";
const jsonWriteFile = (users, res) => {
    fs.writeFile(jsonFile, JSON.stringify(users), (err) => {
        if (err) {
            res.status(500).json({
                message: `Error writing file ${err}`,
                status: 500,
            });
        } else {
            res.status(200).json({
                message: "Successfully wrote file",
                status: 200,
            });
        }
    });
};
jsonRoute.post("/read_json", async (req, res) => {
    try{
    const {user_id,browse_id}=req.query
    fs.readFile(jsonFile, "utf8", function (err, data) {
        if (err) throw err;
        const [users] =JSON.parse(data).filter((val)=>val.user_id==user_id&&val.browse_id==browse_id)
        if(users!="undefined"){
        res.status(200).json({
            message:"success",
            status:200,
            data:users
        })
    }
        // console.log(users)
    });
    
}catch(err){
    res.json({
        message:err,
        status:500
    })
}
}
);



jsonRoute.post("/write_json", async (req, res) => {
    try{
    const jsonData = req.body;
    if (jsonData.user_id && jsonData.browse_id) {
        fs.readFile(jsonFile, "utf8", function (err, data) {
            if (err) throw err;
            let users = JSON.parse(data);
            const indexOfArray = users.findIndex((val) => {
                return (
                    val.user_id == jsonData.user_id && val.browse_id == jsonData.browse_id
                );
            });
            if (indexOfArray > -1) {
                users.splice(indexOfArray, 1, jsonData);
                jsonWriteFile(users, res);
            } else {
                users.push(jsonData);
                jsonWriteFile(users, res);
            }
        });
    }else{
        throw "please enter valid user id and browse id"
    }
   
}catch(err){
    res.json({
        message:err,
        status:500
    })
}
});
module.exports = { jsonRoute };
