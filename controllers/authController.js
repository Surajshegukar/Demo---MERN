const authModel = require("../models/authModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ms = require("ms");

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
    const passwordMatch = user && await bcrypt.compare(password, user.password);

    if (!user || !passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
        data: null,
      });
    }

    const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: ms(process.env.ACCESS_TOKEN_DURATION),
    });

    const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: ms(process.env.REFRESH_TOKEN_DURATION),
    });

  
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: ms(process.env.ACCESS_TOKEN_DURATION),
    });

      res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: ms(process.env.REFRESH_TOKEN_DURATION),
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
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

const refreshToken = async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "No refresh token provided",
      data: null,
    });
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET,
      { expiresIn: ms(process.env.ACCESS_TOKEN_DURATION) }
    );

    // Optionally: Rotate the refresh token
    const newRefreshToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET,
      { expiresIn: ms(process.env.REFRESH_TOKEN_DURATION) }
    );

    // Set updated cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      data: { accessToken },
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Invalid refresh token",
      data: null,
    });
  }
};

const fetchSession = async (req, res) => {
  const accessToken = req.cookies?.accessToken;
  if (!accessToken) {
    return res.status(401).json({
      success: false,
      message: "No access token provided",
      data: null,
    });
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    const user = await authModel.findByPk(decoded.userId, {
      attributes: ["id", "name", "email"],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Session fetched successfully",
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

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
      data: null,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: err,
    });
  }
};


module.exports = {
  registerUser,
  loginUser,
  refreshToken,
  fetchSession,
  logoutUser,
};
