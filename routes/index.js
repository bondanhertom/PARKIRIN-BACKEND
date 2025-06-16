const express = require("express");
const router = express.Router();
const ControllerUser = require("../controllers/controllerUser");
const ControllerCategory = require("../controllers/controllerCategory");
const ControllerTransaction = require("../controllers/controllerTransaction");
const { authentication } = require("../middlewares/authentication");

router.post("/register", ControllerUser.register);
router.post("/login", ControllerUser.login);

router.post("/categories", authentication, ControllerCategory.createCategory);
router.get("/categories", authentication, ControllerCategory.getAllCategories);

router.post(
  "/transactions",
  authentication,
  ControllerTransaction.createTransaction
);

router.get(
  "/transactions",
  authentication,
  ControllerTransaction.getAllTransaction
);

router.put(
  "/transactions/:id",
  authentication,
  ControllerTransaction.updateTransaction
);

router.delete(
  "/transactions/:id",
  authentication,
  ControllerTransaction.deleteTransaction
);

router.delete(
  "/categories/:id",
  authentication,
  ControllerCategory.deleteCategory
);

module.exports = router;
