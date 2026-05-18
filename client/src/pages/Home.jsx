import { Link } from "react-router-dom";
import DisplayCard from "../components/DisplayCard";
import ActivityCard from "../components/ActivityCard";
import useAuthStore from "../store/useAuthStore";
import useLogStore from "../store/useLogStore";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

const Home = () => {
  let user = useAuthStore((state) => state.user);
  const currentVolume = useLogStore((state) => state.currentVolume);
  // const fetchCurrentVolume = useLogStore((state) => state.fetchCurrentVolume);
  const currentLogs = useLogStore((state) => state.currentLogs);
  // const fetchCurrentLogs = useLogStore((state) => state.fetchCurrentLogs);
  const createLog = useLogStore((state) => state.createLog);
  const fetchData = useLogStore((state) => state.fetchData);

  // useEffect(() => {
  //   fetchCurrentVolume(user);
  // }, [fetchCurrentVolume, user]);

  // useEffect(() => {
  //   fetchCurrentLogs(user);
  // }, [fetchCurrentLogs, user]);

  useEffect(() => {
    fetchData(user);
  }, [fetchData, user]);

  const [formData, setFormData] = useState({
    exercise: "",
    kg: "",
    reps: "",
  });

  const handleFormDataChange = (e) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { exercise, kg, reps } = formData;
    if (exercise.length === 0) {
      alert("Please enter the name of the exercise.");
      return;
    }
    if (exercise.length < 3) {
      alert("Exercise name is too short (min 3 characters).");
      return;
    }
    if (exercise.length > 30) {
      alert("Exercise name is to long (max 30 characters).");
      return;
    }
    if (kg < 1) {
      alert("Weight should be a positive value.");
      return;
    }
    if (reps < 1) {
      alert("Add atleast 1 rep.");
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
        <h1 className="text-4xl font-black italic tracking-tight uppercase">
          Less tapping.
          <br />
          <span className="text-zinc-500">More lifting.</span>
        </h1>
        <p className="text-sm text-zinc-300">
          Pulse is a high-velocity workout logger designed to stay out of your
          way. Track your volume without the digital bloat.
        </p>
        <Link
          to="/auth/login"
          className="w-fit text-sm text-[#111] font-medium bg-lime-400 px-4 py-2 rounded-lg"
        >
          Start Logging
        </Link>
        <div className="grid grid-cols-3 gap-4 pt-12 border-t border-zinc-900 mt-12">
          <div>
            <h3 className="text-xs uppercase tracking-wider text-zinc-300 font-medium">
              Real-Time
            </h3>
            <p className="text-xs text-zinc-500 mt-1 font-light">
              Instant volume aggregation.
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-wider text-zinc-300 font-medium">
              Zero Bloat
            </h4>
            <p className="text-xs text-zinc-500 mt-1 font-light">
              No ads, templates, or noise.
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-wider text-zinc-300 font-medium">
              Persistent
            </h4>
            <p className="text-xs text-zinc-500 mt-1 font-light">
              Lifetime training archiving.
            </p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="flex flex-col gap-8 max-w-2xl px-4 py-16 mx-auto min-h-[calc(100vh-64px)]">
      <DisplayCard
        a="Today's Volume"
        b={currentVolume ? currentVolume : currentVolume === 0 ? 0 : "- - -"}
        c="Kg"
      />
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Exercise (e.g. Dumbell Press)"
          name="exercise"
          value={formData.exercise}
          onChange={handleFormDataChange}
          className="text-sm text-zinc-300 outline-none p-4 bg-[#222] rounded-lg w-full"
        />
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="kg"
            name="kg"
            value={formData.kg}
            onChange={handleFormDataChange}
            className="flex-1 text-sm text-zinc-300 outline-none p-4 bg-[#222] rounded-lg min-w-0"
          />
          <input
            type="number"
            placeholder="reps"
            name="reps"
            value={formData.reps}
            onChange={handleFormDataChange}
            className="flex-1 text-sm text-zinc-300 outline-none p-4 bg-[#222] rounded-lg min-w-0"
          />
          <button className="flex-1 text-sm text-[#111] font-medium p-4 rounded-lg bg-lime-400 cursor-pointer">
            Add
          </button>
        </div>
      </form>
      <div>
        <h3 className="text-base font-medium mb-4">
          {!currentLogs || currentLogs.length === 0
            ? "No Activity Today"
            : "Today's Activity"}
        </h3>
        {currentLogs ? (
          <div className="flex flex-col gap-2">
            {currentLogs?.map((log) => (
              <ActivityCard key={log._id} log={log} />
            ))}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </section>
  );
};

export default Home;
