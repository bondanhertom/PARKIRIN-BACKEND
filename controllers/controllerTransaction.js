const {
  Transaction,
  User,
  TransactionType,
  TransactionSource,
} = require("../models");
const { Op } = require("sequelize");

class ControllerTransaction {
  // GET /transaction
  static async getAllTransaction(req, res) {
    try {
      // Query parameters
      const {
        transactionTypeId,
        transactionSourceId,
        startDate,
        endDate,
        page = 1,
        limit = 10,
      } = req.query;

      const whereClause = {};

      // Filter by transaction source
      if (transactionSourceId) {
        whereClause.transactionSourceId = transactionSourceId;
      }

      // Filter by transaction type
      if (transactionTypeId) {
        whereClause.transactionTypeId = transactionTypeId;
      }

      // Filter by date range
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

      const pageInt = parseInt(page);
      const limitInt = parseInt(limit);
      const offset = (pageInt - 1) * limitInt;

      // Query transactions
      const { count, rows: transactions } = await Transaction.findAndCountAll({
        where: whereClause,
        limit: limitInt,
        offset,
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: User,
            attributes: ["id", "name", "email"],
          },
          {
            model: TransactionType,
            attributes: ["id", "name"],
          },
          {
            model: TransactionSource,
            attributes: ["id", "name"],
          },
        ],
      });

      res.status(200).json({
        totalData: count,
        currentPage: pageInt,
        totalPages: Math.ceil(count / limitInt),
        data: transactions,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // POST /transaction
  static async createTransaction(req, res) {
    try {
      const {
        amount,
        description,
        transactionTypeId,
        transactionSourceId,
        walletId,
      } = req.body;

      if (!amount || !transactionTypeId || !transactionSourceId || !walletId) {
        return res.status(400).json({
          message: "Please fill in all required fields",
        });
      }

      // Create transaction
      const newTransaction = await Transaction.create({
        amount,
        description,
        transactionTypeId,
        transactionSourceId,
        walletId,
        userId: req.user.id,
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
  // static async updateTransaction(req, res) {
  //   try {
  //     const { id } = req.params;
  //     const { type, amount, description, subTypeId, cashType } = req.body;

  //     const transaction = await Transaction.findByPk(id);

  //     if (!transaction) {
  //       return res.status(404).json({ message: "Transaction not found" });
  //     }

  //     await transaction.update({
  //       type,
  //       amount,
  //       description,
  //       subTypeId,
  //       cashType,
  //       updatedBy: req.user.id,
  //     });

  //     const updated = await transaction.reload({
  //       include: [
  //         {
  //           model: User,
  //           as: "Updater",
  //           attributes: ["id", "name", "email"],
  //         },
  //       ],
  //     });

  //     res.status(200).json(updated);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: "Internal Server Error" });
  //   }
  // }

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
