// components/Login.js
import React, { useState } from "react";
import "../assets/css/login.css";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(adminLogin({ email, password }));
    if (adminLogin.fulfilled.match(result)) {
      const token = result.payload.token; // ✅ safer access
      setMessage("Login successfully !");
      setTimeout(() => {
        setMessage("");
        localStorage.setItem("token", token);
        navigate("/dashboard");
      }, 2000);
    }
    if (adminLogin.rejected.match(result)) {
      setMessage("Error : Invalid credentials");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };

  return (
    <div id="center">
      <div className="login-container">
        <div class="img-container ">
        <img src="/logo.png" alt="" />
        </div>
        <h2 className="login-title mt-3">Welcome back</h2>
        <p className="login-subtitle">Login to the Dashboard</p>

        {message && <Alert message={message} />}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
            />
          </div>

          <div
            className="form-group password-group"
          >
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />

            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="toggle-password"
             
            >
              {passwordVisible ? <Eye /> : <EyeOff />}
            </button>
          </div>

          <button type="submit" className="login-button">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
