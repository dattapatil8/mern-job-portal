function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-[80vh]">

      <h1 className="text-5xl font-bold text-blue-600">
        Welcome To Job Portal
      </h1>

      <p className="mt-5 text-gray-600 text-xl">
        Find your dream job today 🚀
      </p>

      <button className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
        Browse Jobs
      </button>

    </div>
  );
}

export default Home;