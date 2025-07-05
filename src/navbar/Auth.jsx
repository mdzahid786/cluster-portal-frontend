import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Link, Routes } from "react-router-dom";
import Home from "../components/Home";
import Dashboard from "../components/Dashboard";
import AuthUser from "../components/AuthUser";

function Auth() {
  const { getToken, logout } = AuthUser();
  const logoutUser = () => {
    if (getToken != undefined) {
      logout();
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark ">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <button type="button" className="nav-link" onClick={logoutUser}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </>
  );
}

export default Auth;
