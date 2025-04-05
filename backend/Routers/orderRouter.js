const express = require("express");
const router = express.Router();
const {
  createOrder,
  searchOrder,
  updatestatusOrder,
  getOrder,
  getOrderStatistics,
  Removeorder,
} = require("../controller/orderController");
const {
  authmiddleware,
  adminmiddleware,
  managermiddleware,
} = require("../middleware/Authmiddleware");

router.post("/createorder",authmiddleware, createOrder);
router.get("/getorders", authmiddleware, getOrder);
router.delete("/removeorder/:OrdertId", authmiddleware, Removeorder);
router.put("/updatestatusOrder/:OrderId", authmiddleware,updatestatusOrder);
router.get("/Searchdata", authmiddleware, searchOrder);
router.get("/graphstatusorder",authmiddleware, getOrderStatistics);


module.exports = router;
