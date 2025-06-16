const { SubType } = require("../models");

class ControllerCategory {
  // GET /categories
  static async getAllCategories(req, res) {
    try {
      const categories = await SubType.findAll({
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

      const newCategory = await SubType.create({
        name,
        description,
      });

      res.status(201).json(newCategory);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // DELETE /categories/:id
  static async deleteCategory(req, res) {
    try {
      const { id } = req.params;

      const category = await SubType.findByPk(id);

      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      await category.destroy();

      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = ControllerCategory;
