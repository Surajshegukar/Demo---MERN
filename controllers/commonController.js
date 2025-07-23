const express = require("express");
const router = express.Router();

const deleteItem = async (req, res) => {
  const { model, id } = req.params;

  try {
    // Validate model existence
    const dbModels = req.app.get("db").models;
    if (!dbModels[model]) {
      return res.status(400).json({
        success: false,
        message: `Invalid model name '${model}'`,
        data: null,
      });
    }

    // Find item by ID
    const item = await dbModels[model].findByPk(id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: `${model} with ID ${id} not found`,
        data: null,
      });
    }

    // Soft delete
    item.is_deleted = "1";

    // Save changes
    await item.save();

    return res.status(200).json({
      success: true,
      message: `${model} with ID ${id} deleted successfully`,
      data: null,
    });
  } catch (error) {
    console.error('DeleteItem Error:', error); // Log the error stack

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message || "Unknown error",
    });
  }
};

activateItem = async (req, res) => {
  const { model, id } = req.params;
  try {
    const item = await req.app.get("db").models[model].findByPk(id);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: `${model} not found` });
    }
    item.status = "1";
    await item.save();

    return res
      .status(200)
      .json({ success: true, message: `${model} activated successfully` });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

deactivateItem = async (req, res) => {
  const { model, id } = req.params;
  try {
    const item = await req.app.get("db").models[model].findByPk(id);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: `${model} not found` });
    }
    item.status = "inactive";
    await item.save();

    return res
      .status(200)
      .json({ success: true, message: `${model} deactivated successfully` });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

module.exports = {
  deleteItem,
  activateItem,
  deactivateItem

};