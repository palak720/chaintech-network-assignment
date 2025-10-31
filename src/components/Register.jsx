
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/auth";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (!form.name || !form.email || !form.password)
        throw new Error("All fields are required");
      register(form);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="row justify-content-center align-items-center vh-100">
      <div className="col-md-6 p-3 rounded shadow-sm bg-gray">
        <h3 className="text-center mb-4">Register</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Name</label>
            <input
              name="name"
              className="form-control"
              onChange={handleChange}
              value={form.name}
            />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              onChange={handleChange}
              value={form.email}
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              onChange={handleChange}
              value={form.password}
            />
          </div>
          <button className="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  );
}
