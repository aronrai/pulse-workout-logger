import useLogStore from "../store/useLogStore";
import ActivityCard from "../components/ActivityCard";
import { useEffect } from "react";

const LogHistory = () => {
  const logs = useLogStore((state) => state.logs);
  const fetchLogs = useLogStore((state) => state.fetchLogs);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  if (!logs) {
    return (
      <section className="max-w-2xl px-4 py-16 mx-auto min-h-[calc(100vh-64px)]">
        <h1 className="text-2xl">Loading Logs</h1>{" "}
      </section>
    );
  }
  return (
    <section className="max-w-2xl px-4 py-16 mx-auto min-h-[calc(100vh-64px)]">
      <h1 className="text-2xl mb-4">History</h1>
      <div className="flex flex-col gap-4">
        {logs.map((log) => (
          <ActivityCard key={log._id} log={log} />
        ))}
      </div>
    </section>
  );
};

export default LogHistory;
