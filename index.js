const express = require("express");
const cors = require("cors");
const { dcRouter } = require("./controllers/logistics/DC/diagDcRouter");

const { dc } = require("./controllers/logistics/delivery-challan/dc");
const { mdc } = require("./controllers/logistics/delivery-challan/mdc/mdc");
const { menu } = require("./controllers/menulist/menu");
const  logisticRoute  = require("./routes/logisticRoutes");
const { userRoute } = require("./controllers/user/user");
const { salesRoute } = require("./routes/sales");
const { masterRoutes } = require("./routes/master");
const { ioniaRoutes } = require("./controllers/ionia/ionia");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.json({ message: "Diagnostic Application" });
});
app.use(express.static("public"));
// API
app.use((err,req,res,next)=>{
  console.log(err.stack)
})
app.use("/dc", dcRouter);
app.use("/logistics/dc", dc);
app.use('/logistic/mdc',mdc);
app.use('/menu',menu);
app.use('/logistic',logisticRoute);
app.use('/user',userRoute);
app.use('/sales',salesRoute);
app.use('/master',masterRoutes);
app.use("/ionia",ioniaRoutes)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
