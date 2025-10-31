
import React, { useEffect, useState } from "react";
import { getCurrentUser, updateUser } from "../services/auth";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const u = getCurrentUser();
    if (u) {
      setUser(u);
      setForm(u);
    }
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    try {
      updateUser(form);
      setUser(form);
      setEdit(false);
      setMessage("Profile updated successfully!");
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      setMessage(err.message);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="col-md-6">
      <h3>Profile</h3>
      {message && <div className="alert alert-info">{message}</div>}

      {!edit ? (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button className="btn btn-outline-primary" onClick={() => setEdit(true)}>
            Edit
          </button>
        </div>
      ) : (
        <div>
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
          <button className="btn btn-primary me-2" onClick={handleSave}>
            Save
          </button>
          <button className="btn btn-secondary" onClick={() => setEdit(false)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
