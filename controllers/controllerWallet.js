const { Wallet } = require("../models");

class ControllerWallet {
  // GET /wallets
  static async getAllWallet(req, res) {
    try {
      const wallet = await Wallet.findAll({
        order: [["createdAt", "DESC"]],
      });

      res.status(200).json(wallet);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // POST /wallets
  static async createWallet(req, res) {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ message: "Name is required" });
      }

      const newWallet = await Wallet.create({
        name,
      });

      res.status(201).json(newWallet);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // DELETE /wallets/:id
  static async deleteWallet(req, res) {
    try {
      const { id } = req.params;

      const wallet = await Wallet.findByPk(id);

      if (!wallet) {
        return res.status(404).json({ message: "Wallet not found" });
      }

      await wallet.destroy();

      res.status(200).json({ message: "Wallet deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = ControllerWallet;
