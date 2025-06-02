const { ExpenseCategory } = require("../models");

class ControllerCategory {
  // GET /categories
  static async getAllCategories(req, res) {
    try {
      const categories = await ExpenseCategory.findAll({
        order: [["createdAt", "DESC"]],
      });

      res.status(200).json(categories);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // POST /categories
  static async createCategory(req, res) {
    try {
      const { name, description } = req.body;

      if (!name) {
        return res.status(400).json({ message: "Name is required" });
      }

      const newCategory = await ExpenseCategory.create({
        name,
        description,
      });

      res.status(201).json(newCategory);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = ControllerCategory;
