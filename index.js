const express = require("express");
const { dcRouter } = require("./controllers/logistics/DC/diagDcRouter");
const { dc } = require("./controllers/logistics/delivery-challan/dc");
const { mdc } = require("./controllers/logistics/delivery-challan/mdc/mdc");
const { menu } = require("./controllers/menulist/menu");
const logisticRoute = require("./routes/logisticRoutes");
const { userRoute } = require("./controllers/user/user");
const { salesRoute } = require("./routes/sales");
const { masterRoutes } = require("./routes/master");
const { jsonRoute } = require("./controllers/json/json");
// const { ioniaRoutes } = require("./controllers/ionia/ionia");
require("dotenv").config();
const cors = require("cors");
// const process = require("process");
// const numCPUs = require("os").cpus().length;
// const cluster = require("cluster");
// // const numCPUs = availableParallelism();
// if (cluster.isPrimary) {
//   console.log(`Primary ${process.pid} is running`);
//   for (let i = 0; i < numCPUs; i++) {
//     //make copy of your cpu throw core
//     cluster.fork();
//   }
//   //like your cpu is dead
//   cluster.on("exit", (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} died`);
//     cluster.fork();
//   });
// } else {
  // console.log(`Worker ${process.pid} started`);
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.get("/", (req, res) => {
    res.json({ message: "Diagnostic Application" });
  });
  app.use(express.static("uploads"));
  // API
  app.use((err, req, res, next) => {
    console.log(err.stack);
  });
  app.use("/dc", dcRouter);
  app.use("/logistics/dc", dc);
  app.use("/logistic/mdc", mdc);
  app.use("/menu", menu);
  app.use("/logistic", logisticRoute);
  app.use("/user", userRoute);
  app.use("/sales", salesRoute);
  app.use("/master", masterRoutes);
  app.use("/json", jsonRoute);
  // app.use("/ionia",ioniaRoutes)

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
// }
