import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data.jobs);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteJob = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Job Deleted Successfully");
      fetchJobs();

    } catch (error) {
      alert(error.response?.data?.message || "Delete Failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-8">All Jobs</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="border rounded-lg shadow-md p-5"
          >
            <h2 className="text-2xl font-bold">{job.title}</h2>

            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Salary:</strong> ₹{job.salary}</p>

            <p className="mt-3 text-gray-600">
              {job.description}
            </p>

            <div className="flex gap-2 mt-4 flex-wrap">
              <Link
                to={`/jobs/${job._id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                View Details
              </Link>

              <Link
                to={`/edit-job/${job._id}`}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Edit
              </Link>

              <button
                onClick={() => deleteJob(job._id)}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Jobs;