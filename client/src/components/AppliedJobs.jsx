const AppliedJobs = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs/applied", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setApplications(data.applications));
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Jobs You Applied To</h1>

      {applications.map((app) => (
        <div key={app._id} className="bg-white p-5 mb-4 rounded-lg">
          <h2 className="text-xl font-semibold">{app.job.title}</h2>
          <p>{app.job.description}</p>
          <p>Status: {app.status}</p>
        </div>
      ))}
    </div>
  );
};
