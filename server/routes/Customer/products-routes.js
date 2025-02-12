const express = require("express");

const {
  getFilteredProducts,
 
} = require("../../controllers/Customer/Products-controller");

const router = express.Router();

router.get("/get",getFilteredProducts);


module.exports = router;
