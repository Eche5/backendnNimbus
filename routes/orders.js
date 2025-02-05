const { Router } = require("express");
const controller = require("../controller/ordersController");
const router = Router();

router.route("/orders").get(controller.getAllOrder);

router.route("/customer_order").post(controller.getUserOrder);

router.route("/order").post(controller.GetOrder);

module.exports = router;
