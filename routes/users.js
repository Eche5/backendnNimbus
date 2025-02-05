const { Router } = require("express");
const controller = require("../controller/usersController");

const router = Router();

router.route("/user").post(controller.getUserData);
router.route("/users").get(controller.getAllCustomers);
router.route("/customers").post(controller.createUsers);
module.exports = router;
