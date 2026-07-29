import { Link } from "react-router-dom";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5">
      <h1 className="text-4xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="border rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold">
          Welcome {user?.name}
        </h2>

        <p className="mt-3">
          <strong>Email:</strong> {user?.email}
        </p>

        <p className="mt-2">
          <strong>Role:</strong> {user?.role}
        </p>

        <div className="mt-6 flex gap-4">
          <Link
            to="/create-job"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Create Job
          </Link>

          <Link
            to="/jobs"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            View Jobs
          </Link>

          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;