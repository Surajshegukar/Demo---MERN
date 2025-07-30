const { Op, where } = require("sequelize");
const departmentModel = require("../models/departmentModel");



const getAlldepartments = async (req, res) => {
  try {
    const departments = await departmentModel.findAll();

    res.status(200).json({
      success: true,
      message: "Record fetched successfully",
      data: departments,
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

const getdepartmentById = async (req, res) => {
  const { id } = req.params;

  try {
    const department = await departmentModel.findByPk(id);
    if (!department) {
      res.status(404).json({
        success: false,
        message: "Record not found",
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      message: "Record found successfully",
      data: department,
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

const createdepartment = async (req, res) => {
  try {
    const newdepartment = await departmentModel.create({
      ...req.body,
    });
    res.status(201).json({
      success: true,
      message: "Record Added Successfully",
      data: newdepartment,
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

const updatedepartment = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedData = {
      ...req.body,
    };

    const [updated] = await departmentModel.update(updatedData, {
      where: { id },
    });

    if (updated === 0) {
      res.status(200).json({
        success: true,
        message: "No changes made; data already up to date.",
        data: null,
      });
    }
  

    const updateddepartment = await departmentModel.findByPk(id);
    res.status(200).json({
      success: true,
      message: "Record updated Successfully",
      data: updateddepartment,
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

const deletedepartment = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await departmentModel.destroy({
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

const getAjaxdepartments = async (req, res) => {
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
    "department_name",
    "status",
  ];
  const sortField = columns[colIndex] || "department_name";



  let whereClause = {};
  if (searchValue) {
    whereClause[Op.or] = [
      { department_name: { [Op.like]: `%${searchValue}%` } },
    ];
  }
  whereClause.is_deleted = "0"; // Ensure we only fetch non-deleted records
  // Add status filter if not 'all'
  if (statusFilter !== "all") {
    whereClause.status = statusFilter;
  }

  const total = await departmentModel.count();
  const filtered = await departmentModel.count({ where: whereClause });


  const docs = await departmentModel.findAll({
    where: whereClause,
    order: [[sortField, dir]],
    offset: start,
    limit: length,

  });

  const data = docs.map((user, i) => [
    start + i + 1,
    user.department_name,
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
  getAlldepartments,
  getdepartmentById,
  createdepartment,
  updatedepartment,
  deletedepartment,
  getAjaxdepartments,
};
