import useLogStore from "../store/useLogStore";
import ActivityCard from "../components/ActivityCard";
import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const LogHistory = () => {
  const logs = useLogStore((state) => state.logs);
  const fetchLogs = useLogStore((state) => state.fetchLogs);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  if (!logs) {
    return (
      <section className="max-w-2xl px-4 py-16 mx-auto min-h-[calc(100vh-64px)]">
        <Loading />
      </section>
    );
  }
  return (
    <section className="max-w-2xl px-4 py-16 mx-auto min-h-[calc(100vh-64px)]">
      <Link to="/profile">
        <FaArrowLeft className="text-base mb-8" />
      </Link>
      <h1 className="text-base font-medium mb-4">Log History</h1>
      <div className="flex flex-col gap-4">
        {logs.map((log) => (
          <ActivityCard key={log._id} log={log} history={true} />
        ))}
      </div>
    </section>
  );
};

export default LogHistory;
