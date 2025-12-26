const express = require("express");
const router = express.Router();
const ControllerUser = require("../controllers/controllerUser");
const ControllerTransactionType = require("../controllers/controllerTransactionType");
const ControllerTransaction = require("../controllers/controllerTransaction");
const ControllerTransactionSource = require("../controllers/controllerTransactionSource");
const ControllerWallet = require("../controllers/controllerWallet");
const { authentication } = require("../middlewares/authentication");

router.post("/register", ControllerUser.register);
router.post("/login", ControllerUser.login);

router.post(
  "/transactionTypes",
  authentication,
  ControllerTransactionType.createType
);
router.get(
  "/transactionTypes",
  authentication,
  ControllerTransactionType.getAllType
);

router.post(
  "/transactionSources",
  authentication,
  ControllerTransactionSource.createSource
);
router.get(
  "/transactionSources",
  authentication,
  ControllerTransactionSource.getAllSource
);

router.post("/wallets", authentication, ControllerWallet.createWallet);
router.get("/wallets", authentication, ControllerWallet.getAllWallet);

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

// router.put(
//   "/transactions/:id",
//   authentication,
//   ControllerTransaction.updateTransaction
// );

router.delete(
  "/transactions/:id",
  authentication,
  ControllerTransaction.deleteTransaction
);

router.delete(
  "/transactionTypes/:id",
  authentication,
  ControllerTransactionType.deleteType
);

router.delete(
  "/transactionSources/:id",
  authentication,
  ControllerTransactionSource.deleteSource
);

module.exports = router;
