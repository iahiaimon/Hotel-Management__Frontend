import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function User_Registration() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    address: "",
    password: "",
    confirm_password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    

    if (formData.password !== formData.confirm_password) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:8000/register/", {
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        password: formData.password,
        confirm_password: formData.confirm_password
      });
      setMessage(res.data.message || "Registered successfully!");
      navigate("/login")
    } catch (err) {
      if (err.response) {
        setMessage(err.response.data.error || "Something went wrong");
      } else {
        setMessage("Server not reachable");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        {/* Title */}
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 tracking-wide">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="input validator flex items-center gap-2 rounded-lg border px-3 py-2">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Username"
                className="w-full outline-none"
                pattern="[A-Za-z][A-Za-z0-9\-]*"
                minLength="3"
                maxLength="30"
                title="Only letters, numbers or dash"
              />
            </label>
          </div>

          {/* Email */}
          <div>
            <label className="input validator flex items-center gap-2 rounded-lg border px-3 py-2">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="mail@site.com"
                required
                className="w-full outline-none"
              />
            </label>
          </div>

          {/* Phone */}
          <div>
            <label className="input validator flex items-center gap-2 rounded-lg border px-3 py-2">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Phone"
                className="w-full outline-none"
                pattern="[0-9]*"
                minLength="10"
                maxLength="10"
                title="Must be 10 digits"
              />
            </label>
          </div>

          {/* Address */}
          <div>
            <label className="input validator flex items-center gap-2 rounded-lg border px-3 py-2">
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Address"
                className="w-full outline-none"
              />
            </label>
          </div>

          {/* Password */}
          <div>
            <label className="input validator flex items-center gap-2 rounded-lg border px-3 py-2">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Password"
                className="w-full outline-none"
                minLength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must include number, lowercase, uppercase"
              />
            </label>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="input validator flex items-center gap-2 rounded-lg border px-3 py-2">
              <input
                type="password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                required
                placeholder="Confirm Password"
                className="w-full outline-none"
                minLength="8"
              />
            </label>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-[#1a70cc] px-4 py-2 font-medium text-white shadow-md transition-colors duration-200 hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>

        {/* Error or success message */}
        {message && (
          <p className="mt-4 text-center text-sm text-red-500">{message}</p>
        )}

        {/* Register link */}
        <div className="text-center text-sm text-gray-600 pt-3">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
