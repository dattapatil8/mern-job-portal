import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const res = await API.get(`/jobs/${id}`);
      setJob(res.data.job);
    } catch (error) {
      console.log(error);
    }
  };

  if (!job) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 border rounded p-6 shadow">
      <h1 className="text-3xl font-bold">{job.title}</h1>

      <p className="mt-4">
        <strong>Company:</strong> {job.company}
      </p>

      <p>
        <strong>Location:</strong> {job.location}
      </p>

      <p>
        <strong>Salary:</strong> ₹{job.salary}
      </p>

      <p className="mt-4">{job.description}</p>

      <Link
        to="/jobs"
        className="bg-blue-600 text-white px-4 py-2 rounded mt-5 inline-block"
      >
        Back
      </Link>
    </div>
  );
}

export default JobDetails;