const express = require("express");
const router = express.Router();
const {
  Addproduct,
  getTopProductsByQuantity,
  RemoveProduct,
  SearchProduct,
  EditProduct,
  getProduct,
  importProducts,
  exportProducts,
} = require("../controller/productController");
const {
  authmiddleware,
  adminmiddleware,
  managermiddleware,
} = require("../middleware/Authmiddleware");
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/addproduct", authmiddleware, Addproduct);
router.delete("/removeproduct/:productId", authmiddleware, RemoveProduct);
router.get("/getproduct", authmiddleware, getProduct);
router.get("/searchproduct", authmiddleware, SearchProduct);
router.put("/editproduct/:productId", authmiddleware, EditProduct);
router.get(
  "/getTopProductsByQuantity",
  authmiddleware,
  getTopProductsByQuantity,
);
router.post(
  "/import",
  authmiddleware,
  adminmiddleware,
  upload.single("file"),
  importProducts,
);
router.get("/export", authmiddleware, exportProducts);

module.exports = router;
