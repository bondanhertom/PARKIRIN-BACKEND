const { Transaction, User, ExpenseCategory } = require("../models");
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
        expenseCategoryId,
        page = 1,
        limit = 10,
      } = req.query;

      const whereClause = {};

      if (type) {
        whereClause.type = type;
      }

      if (expenseCategoryId) {
        whereClause.expenseCategoryId = expenseCategoryId;
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
            model: ExpenseCategory,
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
      const { type, amount, description, expenseCategoryId } = req.body;

      if (!type || !amount) {
        return res
          .status(400)
          .json({ message: "Type and amount are required" });
      }

      // Create transaction
      const newTransaction = await Transaction.create({
        type,
        amount,
        description,
        expenseCategoryId,
        userId: req.user.id,
        updatedBy: req.user.id,
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
      const { type, amount, description, expenseCategoryId } = req.body;

      const transaction = await Transaction.findByPk(id);

      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }

      await transaction.update({
        type,
        amount,
        description,
        expenseCategoryId,
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
}

module.exports = ControllerTransaction;
