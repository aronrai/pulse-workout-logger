import { IoTrashBin } from "react-icons/io5";
import useLogStore from "../store/useLogStore";
import formatDate from "../utils/formatDate";

const ActivityCard = ({ log, history }) => {
  const deleteLog = useLogStore((state) => state.deleteLog);
  return (
    <div className="flex justify-between items-center py-4 border-b border-zinc-900">
      <p className="text-sm text-zinc-300">
        <span>{log.exercise}</span>
        {" ~ "}
        <span>
          {log.kg}kg * {log.reps} reps
        </span>
        {history && (
          <>
            {" ~ "}
            <span>{formatDate(log.createdAt)}</span>
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
