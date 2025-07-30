const { Op, where } = require("sequelize");
const designationModel = require("../models/designationModel");



const getAlldesignations = async (req, res) => {
  try {
    const designations = await designationModel.findAll();

    res.status(200).json({
      success: true,
      message: "Record fetched successfully",
      data: designations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: null,
      error: error,
    });
  }
};

const getdesignationById = async (req, res) => {
  const { id } = req.params;

  try {
    const designation = await designationModel.findByPk(id);
    if (!designation) {
      res.status(404).json({
        success: false,
        message: "Record not found",
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      message: "Record found successfully",
      data: designation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: null,
      error: error,
    });
  }
};

const createdesignation = async (req, res) => {
  try {
    const newdesignation = await designationModel.create({
      ...req.body,
    });
    res.status(201).json({
      success: true,
      message: "Record Added Successfully",
      data: newdesignation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating record",
      data: null,
      error: error,
    });
  }
};

const updatedesignation = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedData = {
      ...req.body,
    };

    const [updated] = await designationModel.update(updatedData, {
      where: { id },
    });

    if (updated === 0) {
      res.status(200).json({
        success: true,
        message: "No changes made; data already up to date.",
        data: null,
      });
    }
  

    const updateddesignation = await designationModel.findByPk(id);
    res.status(200).json({
      success: true,
      message: "Record updated Successfully",
      data: updateddesignation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating record",
      data: null,
      error: error,
    });
  }
};

const deletedesignation = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await designationModel.destroy({
      where: { id },
    });
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Record not Found",
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      status: 200,
      message: "Record deleted successfully",
      data: {
        id: id,
      },
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
      error: error,
    });
  }
};  

const getAjaxdesignations = async (req, res) => {
  const draw = parseInt(req.body.draw) || 1;
  const start = parseInt(req.body.start) || 0;
  const length = parseInt(req.body.length) || 10;
  const order = req.body.order || [];
  const searchValue = req.body.search?.value || "";
  // Get status filter from query params (for GET) or body (for POST)
  const statusFilter = req.query.status || req.body.status || "all";

  const colIndex = order[0]?.column || 0;
  const dir = order[0]?.dir === "asc" ? "ASC" : "DESC";
  const columns = [
    "designation_name",
    "status",
  ];
  const sortField = columns[colIndex] || "designation_name";



  let whereClause = {};
  if (searchValue) {
    whereClause[Op.or] = [
      { designation_name: { [Op.like]: `%${searchValue}%` } },
    ];
  }
  whereClause.is_deleted = "0"; // Ensure we only fetch non-deleted records
  // Add status filter if not 'all'
  if (statusFilter !== "all") {
    whereClause.status = statusFilter;
  }

  const total = await designationModel.count();
  const filtered = await designationModel.count({ where: whereClause });


  const docs = await designationModel.findAll({
    where: whereClause,
    order: [[sortField, dir]],
    offset: start,
    limit: length,

  });

  const data = docs.map((user, i) => [
    start + i + 1,
    user.designation_name,
    user.status,
    user.id,
  ]);

  res.json({
    draw,
    recordsTotal: total,
    recordsFiltered: filtered,
    data,
  });
};

module.exports = {
  getAlldesignations,
  getdesignationById,
  createdesignation,
  updatedesignation,
  deletedesignation,
  getAjaxdesignations,
};
