const { Transaction, User, SubType } = require("../models");
const { Op } = require("sequelize");

class ControllerTransaction {
  // GET /transaction
  static async getAllTransaction(req, res) {
    try {
      // Query parameters
      const {
        type,
        startDate,
        endDate,
        subTypeId,
        page = 1,
        limit = 10,
      } = req.query;

      const whereClause = {};

      if (type) {
        whereClause.type = type;
      }

      if (subTypeId) {
        whereClause.subTypeId = subTypeId;
      }

      if (startDate && endDate) {
        whereClause.createdAt = {
          [Op.between]: [new Date(startDate), new Date(endDate)],
        };
      } else if (startDate) {
        whereClause.createdAt = {
          [Op.gte]: new Date(startDate),
        };
      } else if (endDate) {
        whereClause.createdAt = {
          [Op.lte]: new Date(endDate),
        };
      }

      const offset = (parseInt(page) - 1) * parseInt(limit);

      const { count, rows: transactions } = await Transaction.findAndCountAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: offset,
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: User,
            as: "Updater",
            attributes: ["id", "name", "email"],
          },
          {
            model: SubType,
            attributes: ["id", "name"],
          },
        ],
      });

      res.status(200).json({
        totalData: count,
        currentPage: parseInt(page),
        totalPages: Math.ceil(count / limit),
        data: transactions,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // POST /transaction
  static async createTransaction(req, res) {
    try {
      const { type, amount, description, subTypeId, cashType, date } = req.body;

      if (!type || !amount || !date) {
        return res.status(400).json({
          message: "Type, amount, and date are required",
        });
      }

      // Format date untuk pastikan hanya YYYY-MM-DD
      const formattedDate = new Date(date).toISOString().split("T")[0];

      // Create transaction
      const newTransaction = await Transaction.create({
        type,
        amount,
        description,
        subTypeId,
        userId: req.user.id,
        cashType,
        updatedBy: req.user.id,
        createdAt: formattedDate,
        updatedAt: formattedDate,
      });

      const transactionWithUser = await Transaction.findOne({
        where: { id: newTransaction.id },
        include: [
          {
            model: User,
            attributes: ["id", "name", "email"],
          },
        ],
      });

      res.status(201).json(transactionWithUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // PUT /transaction/:id
  static async updateTransaction(req, res) {
    try {
      const { id } = req.params;
      const { type, amount, description, subTypeId, cashType } = req.body;

      const transaction = await Transaction.findByPk(id);

      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }

      await transaction.update({
        type,
        amount,
        description,
        subTypeId,
        cashType,
        updatedBy: req.user.id,
      });

      const updated = await transaction.reload({
        include: [
          {
            model: User,
            as: "Updater",
            attributes: ["id", "name", "email"],
          },
        ],
      });

      res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // DELETE /transaction/:id
  static async deleteTransaction(req, res) {
    try {
      const { id } = req.params;

      const transaction = await Transaction.findByPk(id);

      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }

      await transaction.destroy();

      res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = ControllerTransaction;
