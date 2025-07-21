import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import StudentList from "./pages/StudentList";
import AddStudent from "./pages/AddStudent";
import Login from "./pages/Login";
import AddService from "./pages/AddService";
import ServiceList from "./pages/ServiceList";

import { store } from "./store/store";
import { setupInterceptors } from "./utils/axiosInstance";
import { useEffect } from "react";
import { fetchSession } from "./features/auth/authSlice";

setupInterceptors(store);
  
const ProtectedLayout = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// 🔧 Layout handler
const Layout = ({ children }) => {
  const location = useLocation();
  const hideLayout = location.pathname === "/login";

  return (
    <>
      {!hideLayout && <Header />}
      {!hideLayout && <div className="home-section">{children}</div>}
      {hideLayout && children}
    </>
  );
};

function App() {
  const dispatch = store.dispatch;
  useEffect(() => {
  dispatch(fetchSession()); // Validate session from cookie on mount
}, []);

  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              <ProtectedLayout>
                <Routes>
                  <Route path="/" element={<></>} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/add-student" element={<AddStudent />} />
                  <Route path="/add-student/:id" element={<AddStudent />} />
                  <Route path="/student-list" element={<StudentList />} />

                       <Route path="/add-service/" element={<AddService />} />
                  <Route path="/add-service/:id" element={<AddService />} />
                  <Route path="/service-list" element={<ServiceList />} />
                  <Route
                    path="*"
                    element={
                      <h1 className="text-2xl font-bold text-center mt-10">
                        Page Not Found
                      </h1>
                    }
                  />
                </Routes>
              </ProtectedLayout>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;