const { Op } = require("sequelize");
const studentModel = require("../models/studentModel");

const getAllStudents = async (req, res) => {
  try {
    const students = await studentModel.findAll();

    res.status(200).json({
      success: true,
      message: "Record fetched successfully",
      data: students,
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

const getStudentById = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await studentModel.findByPk(id);
    if (!student) {
      res.status(404).json({
        success: false,
        message: "Record not found",
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      message: "Record found successfully",
      data: student,
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

const createStudent = async (req, res) => {
  try {
    console.log("req body", req.body);
    const newStudent = await studentModel.create({
      ...req.body,
      profile: req.file?.filename || null,
    });
    res.status(201).json({
      success: true,
      message: "Record Added Successfully",
      data: newStudent,
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

const updateStudent = async (req, res) => {
  const { id } = req.params;
  
  try {
     const updatedData = {
      ...req.body,
    };

    // 🔧 Attach uploaded filename if present
    if (req.file) {
      updatedData.profile = req.file.filename;
    }

 const [updated] = await studentModel.update(updatedData, {
      where: { id },
    });

    if (!updated) {
      res.status(404).json({
        success: false,
        message: "Record not found",
        data: null,
      });
    }
    const updatedStudent = await studentModel.findByPk(id);
    res.status(200).json({
      success: true,
      message: "Record updated Successfully",
      data: updatedStudent,
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

const deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await studentModel.destroy({
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

const getAjaxStudents = async (req, res) => {
  const draw = parseInt(req.body.draw) || 1;
  const start = parseInt(req.body.start) || 0;
  const length = parseInt(req.body.length) || 10;
  const order = req.body.order || [];
  const searchValue = req.body.search?.value || "";

  const colIndex = order[0]?.column || 0;
  const dir = order[0]?.dir === "asc" ? "ASC" : "DESC";
  const columns = [
    "first_name",
    "last_name",
    "dob",
    "profile",
    "email",
    "mobile_no",
    "address",
    "status",
  ];
  const sortField = columns[colIndex] || "first_name";

  const whereClause = searchValue
    ? {
        [Op.or]: [
          { first_name: { [Op.like]: `%${searchValue}%` } },
          { last_name: { [Op.like]: `%${searchValue}%` } },
          { dob: { [Op.like]: `%${searchValue}%` } },
          { email: { [Op.like]: `%${searchValue}%` } },
          { mobile_no: { [Op.like]: `%${searchValue}%` } },
          { address: { [Op.like]: `%${searchValue}%` } },
        ],
      }
    : {};

  const total = await studentModel.count();
  const filtered = await studentModel.count({ where: whereClause });

  const docs = await studentModel.findAll({
    where: whereClause,
    order: [[sortField, dir]],
    offset: start,
    limit: length,
  });

  const data = docs.map((user, i) => [
    start + i + 1,
    user.first_name,
    user.last_name,
    user.dob,
    user.profile,
    user.email,
    user.mobile_no,
    user.address,
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
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getAjaxStudents,
};
