const { TransactionType } = require("../models");

class ControllerTransactionType {
  // GET /transactionTypes
  static async getAllType(req, res) {
    try {
      const type = await TransactionType.findAll({
        order: [["createdAt", "DESC"]],
      });

      res.status(200).json(type);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // POST /transactionTypes
  static async createType(req, res) {
    try {
      const { code, name } = req.body;

      if (!code || !name) {
        return res.status(400).json({
          message: "Code and name are required",
        });
      }

      const newType = await TransactionType.create({
        code,
        name,
      });

      res.status(201).json(newType);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // DELETE /transactionTypes/:id
  static async deleteType(req, res) {
    try {
      const { id } = req.params;

      const type = await TransactionType.findByPk(id);

      if (!type) {
        return res.status(404).json({ message: "Transaction Type not found" });
      }

      await type.destroy();

      res
        .status(200)
        .json({ message: "Transaction Type deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = ControllerTransactionType;
