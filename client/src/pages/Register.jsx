import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "jobseeker",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/register", formData);

      alert(res.data.message);

      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16">
      <h1 className="text-3xl font-bold mb-5">
        Register
      </h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="border p-3 w-full mb-4 rounded"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          className="border p-3 w-full mb-4 rounded"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          className="border p-3 w-full mb-4 rounded"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <select
          name="role"
          className="border p-3 w-full mb-4 rounded"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="jobseeker">Job Seeker</option>
          <option value="employer">Employer</option>
        </select>

        <button
          type="submit"
          className="bg-green-600 w-full text-white p-3 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;