import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const res = await API.get(`/jobs/${id}`);
      setForm(res.data.job);
    } catch (error) {
      console.log(error);
    }
  };

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

      await API.put(`/jobs/${id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Job Updated Successfully");
      navigate("/jobs");
    } catch (error) {
      alert(error.response?.data?.message || "Update Failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Edit Job</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="border w-full p-2 rounded"
        />

        <input
          type="text"
          name="company"
          value={form.company}
          onChange={handleChange}
          className="border w-full p-2 rounded"
        />

        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          className="border w-full p-2 rounded"
        />

        <input
          type="number"
          name="salary"
          value={form.salary}
          onChange={handleChange}
          className="border w-full p-2 rounded"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="border w-full p-2 rounded"
        />

        <button className="bg-yellow-500 text-white px-5 py-2 rounded">
          Update Job
        </button>

      </form>
    </div>
  );
}

export default EditJob;