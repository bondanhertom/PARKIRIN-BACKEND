const { TransactionSource } = require("../models");

class ControllerTransactionSource {
  // GET /transactionSource
  static async getAllSource(req, res) {
    try {
      const source = await TransactionSource.findAll({
        order: [["createdAt", "DESC"]],
      });

      res.status(200).json(source);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // POST /transactionSource
  static async createSource(req, res) {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ message: "Name is required" });
      }

      const newSource = await TransactionSource.create({
        name,
      });

      res.status(201).json(newSource);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // DELETE /transactionSource/:id
  static async deleteSource(req, res) {
    try {
      const { id } = req.params;

      const source = await TransactionSource.findByPk(id);

      if (!source) {
        return res.status(404).json({ message: "Source not found" });
      }

      await source.destroy();

      res.status(200).json({ message: "Source deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = ControllerTransactionSource;
