import { IoTrashBin } from "react-icons/io5";
import useLogStore from "../store/useLogStore";

const ActivityCard = ({ log, history }) => {
  const deleteLog = useLogStore((state) => state.deleteLog);
  return (
    <div className="flex justify-between items-center py-4 border-b border-[#333]">
      <p className="text-sm text-zinc-300">
        <span>{log.exercise}</span>
        {" ~ "}
        <span>
          {log.kg}kg * {log.reps} reps
        </span>
        {history && (
          <>
            {" ~ "}
            <span>{new Date(log.createdAt).toDateString()}</span>
          </>
        )}
      </p>
      <button onClick={() => deleteLog(log._id, log.volume)}>
        <IoTrashBin className="hover:text-red-500 transition-colors cursor-pointer" />
      </button>
    </div>
  );
};

export default ActivityCard;
