import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function CreateJob() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post("/jobs", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Job Created Successfully");
      navigate("/jobs");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Create Job</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Job Title"
          onChange={handleChange}
          className="border w-full p-2 rounded"
        />

        <input
          type="text"
          name="company"
          placeholder="Company"
          onChange={handleChange}
          className="border w-full p-2 rounded"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleChange}
          className="border w-full p-2 rounded"
        />

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          onChange={handleChange}
          className="border w-full p-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="border w-full p-2 rounded"
        ></textarea>

        <button
          className="bg-green-600 text-white px-5 py-2 rounded"
        >
          Create Job
        </button>

      </form>
    </div>
  );
}

export default CreateJob;