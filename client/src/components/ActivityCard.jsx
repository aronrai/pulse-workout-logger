import { IoTrashBin } from "react-icons/io5";
import useLogStore from "../store/useLogStore";

const ActivityCard = ({ log }) => {
  const deleteLog = useLogStore((state) => state.deleteLog);
  return (
    <div className="flex justify-between items-center py-4 border-b border-[#333]">
      <p>
        <span className="text-sm">{log.exercise}</span>{" "}
        <span className="text-xs">
          {log.kg}kg * {log.reps} reps
        </span>
      </p>
      <button onClick={() => deleteLog(log._id, log.volume)}>
        <IoTrashBin className="cursor-pointer hover:text-red-500 transition-colors" />
      </button>
    </div>
  );
};

export default ActivityCard;
