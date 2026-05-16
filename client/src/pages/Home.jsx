import { Link } from "react-router-dom";
import DisplayCard from "../components/DisplayCard";
import ActivityCard from "../components/ActivityCard";
import useAuthStore from "../store/useAuthStore";
import useLogStore from "../store/useLogStore";
import { useEffect, useState } from "react";

const Home = () => {
  let user = useAuthStore((state) => state.user);
  const currentVolume = useLogStore((state) => state.currentVolume);
  const fetchCurrentVolume = useLogStore((state) => state.fetchCurrentVolume);
  const currentLogs = useLogStore((state) => state.currentLogs);
  const fetchCurrentLogs = useLogStore((state) => state.fetchCurrentLogs);
  const createLog = useLogStore((state) => state.createLog);

  useEffect(() => {
    fetchCurrentVolume();
  }, [fetchCurrentVolume]);

  useEffect(() => {
    fetchCurrentLogs();
  }, [fetchCurrentLogs]);

  const [formData, setFormData] = useState({
    exercise: "",
    kg: "",
    reps: "",
  });

  const handleFormDataChange = (e) => {
    console.log(formData);
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { exercise, kg, reps } = formData;
    if (exercise.length === 0 || kg < 1 || reps < 1) {
      alert("Check values again.");
      return;
    }
    createLog(formData);
    setFormData({
      exercise: "",
      kg: "",
      reps: "",
    });
  };

  if (!user) {
    return (
      <section className="flex flex-col gap-8 max-w-2xl px-4 py-16 mx-auto min-h-[calc(100vh-64px)]">
        <h1 className="text-4xl font-bold italic tracking-tight uppercase">
          Less tapping.
          <br />
          <span className="text-zinc-500">More lifting.</span>
        </h1>
        <p className="text-base">
          Pulse is a high-velocity workout logger designed to stay out of your
          way. Track your volume and streaks without the digital bloat.
        </p>
        <Link
          to="/auth/signup"
          className="w-fit text-sm text-[#111] font-medium bg-lime-400 px-4 py-2 rounded-sm"
        >
          Start Logging
        </Link>
      </section>
    );
  }
  return (
    <section className="flex flex-col gap-8 max-w-2xl px-4 py-16 mx-auto min-h-[calc(100vh-64px)]">
      <div className="flex items-center gap-4">
        <DisplayCard
          a="Today's Volume"
          b={currentVolume ? currentVolume : currentVolume === 0 ? 0 : "- - -"}
          c="kg"
        />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Exercise (e.g. Dumbell Press)"
          name="exercise"
          value={formData.exercise}
          onChange={handleFormDataChange}
          className="text-sm outline-none p-4 bg-[#222] rounded-lg w-full"
        />
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="kg"
            name="kg"
            value={formData.kg}
            onChange={handleFormDataChange}
            className="flex-1 text-sm outline-none p-4 bg-[#222] rounded-lg min-w-0"
          />
          <input
            type="number"
            placeholder="reps"
            name="reps"
            value={formData.reps}
            onChange={handleFormDataChange}
            className="flex-1 text-sm outline-none p-4 bg-[#222] rounded-lg min-w-0"
          />
          <button className="flex-1 text-sm text-[#333] font-medium p-4 rounded-lg bg-lime-400 cursor-pointer">
            Add
          </button>
        </div>
      </form>
      <div>
        <h3 className="text-sm mb-4">Today's Activity</h3>
        {currentLogs ? (
          <div className="flex flex-col gap-2">
            {currentLogs?.map((log) => (
              <ActivityCard key={log._id} log={log} />
            ))}
          </div>
        ) : (
          <p className="text-sm uppercase animate-pulse tracking-widest">
            Loading
          </p>
        )}
      </div>
    </section>
  );
};

export default Home;
