const { Op } = require("sequelize");
const serviceModel = require("../models/serviceModel");

const getAllServices = async (req, res) => {
  try {
    const services = await serviceModel.findAll();

    res.status(200).json({
      success: true,
      message: "Record fetched successfully",
      data: services,
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

const getServiceById = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await serviceModel.findByPk(id);
    if (!service) {
      res.status(404).json({
        success: false,
        message: "Record not found",
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      message: "Record found successfully",
      data: service,
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

const createService = async (req, res) => {
  try {
    console.log("req body", req.body);
    const newService = await serviceModel.create({
      ...req.body,
      service_img: req.file?.filename || null,
    });
    res.status(201).json({
      success: true,
      message: "Record Added Successfully",
      data: newService,
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

const updateService = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedData = {
      ...req.body,
    };

    // 🔧 Attach uploaded filename if present
    if (req.file) {
      updatedData.service_img = req.file.filename;
    }

    const [updated] = await serviceModel.update(updatedData, {
      where: { id },
    });

    if (updated === 0) {
      res.status(200).json({
        success: true,
        message: "No changes made; data already up to date.",
        data: null,
      });
    }
  

    const updatedService = await serviceModel.findByPk(id);
    res.status(200).json({
      success: true,
      message: "Record updated Successfully",
      data: updatedService,
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

const deleteService = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await serviceModel.destroy({
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

const getAjaxServices = async (req, res) => {
  const draw = parseInt(req.body.draw) || 1;
  const start = parseInt(req.body.start) || 0;
  const length = parseInt(req.body.length) || 10;
  const order = req.body.order || [];
  const searchValue = req.body.search?.value || "";

  const colIndex = order[0]?.column || 0;
  const dir = order[0]?.dir === "asc" ? "ASC" : "DESC";
  const columns = [
    "service_name",
    "service_description",
    "service_img",
    "status",
  ];
  const sortField = columns[colIndex] || "first_name";

  const whereClause = searchValue
    ? {
        [Op.or]: [
          { service_name: { [Op.like]: `%${searchValue}%` } },
          { service_description: { [Op.like]: `%${searchValue}%` } },
        ],
      }
    : {};

  const total = await serviceModel.count();
  const filtered = await serviceModel.count({ where: whereClause });

  const docs = await serviceModel.findAll({
    where: whereClause,
    order: [[sortField, dir]],
    offset: start,
    limit: length,
  });

  const data = docs.map((user, i) => [
    start + i + 1,
    user.service_name,
    user.service_description,
    user.service_img,
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
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  getAjaxServices,
};
