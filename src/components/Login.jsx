import { useState } from "react";
import AuthUser from "./AuthUser";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { http, setToken } = AuthUser();
  const submitEvent = () => {
    const basicAuth = btoa(`${username}:${password}`);
    http
      .get("/login", {
        username: username,
        password: password,
        headers: { Authorization: `Basic ${basicAuth}` },
      })
      .then((res) => {
        if (!res.data) throw new Error("Invalid credentials");
        setToken(basicAuth, res.data);
      });
  };
  return (
    <div className="row justify-content-center pt-5">
      <div className="col-sm-6">
        <div className="card p-4">
          <div className="mt-3">
            <label className="form-label">Username:</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className=" mt-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              id="pwd"
              placeholder="Enter password"
              name="pswd"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={submitEvent}
            type="button"
            className="btn btn-primary mt-3"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
