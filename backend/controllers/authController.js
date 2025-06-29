const authModel = require("../models/authModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register Route
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await authModel.findOne({ where: { email } });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await authModel.create({ name, email, password: hashed });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: err,
    });
  }
};

// Login Route
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authModel.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
        data: null,
      });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      // expiresIn: process.env.TOKEN_DURATION,
    });


    res.json({
      success: true,
      message: "Login sucessfully",
      data: {
        user,
        token
      },
    }); 
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: err,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
