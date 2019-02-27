var express = require("express");
var db = require("../models");
var helpers = require("../helpers/products");

var router = express.Router();

router.route("/")
.get(helpers.getProducts)
.post(helpers.createProduct)

router.route("/:productId")
.get(helpers.getProduct)
.put(helpers.putProduct)
.delete(helpers.deleteProduct);

module.exports = router;
