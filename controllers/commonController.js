const express = require("express");
const router = express.Router();

deleteItem = async (req, res) => {
  const { model, id } = req.params;
  try {
    const item = await req.app.get("db").models[model].findByPk(id);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: `${model} not found` });
    }
    item.is_deleted = "1"; 
    await item.save();

    return res
      .status(200)
      .json({ success: true, message: `${model} deleted successfully` });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
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