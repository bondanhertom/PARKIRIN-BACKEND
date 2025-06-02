const express = require("express");
const router = express.Router();
const ControllerUser = require("../controllers/controllerUser");
const ControllerCategory = require("../controllers/controllerCategory");
const ControllerTransaction = require("../controllers/controllerTransaction");
const { authentication } = require("../middlewares/authentication");

router.post("/register", ControllerUser.register);
router.post("/login", ControllerUser.login);

router.post("/category", authentication, ControllerCategory.createCategory);
router.get("/category", authentication, ControllerCategory.getAllCategories);

router.post(
  "/transaction",
  authentication,
  ControllerTransaction.createTransaction
);

router.get(
  "/transaction",
  authentication,
  ControllerTransaction.getAllTransaction
);

router.put(
  "/transaction/:id",
  authentication,
  ControllerTransaction.updateTransaction
);

module.exports = router;
