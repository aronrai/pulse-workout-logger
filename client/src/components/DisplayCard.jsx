const DisplayCard = ({ a, b, c }) => {
  return (
    <div className="flex-1 p-4 bg-[#222] rounded-2xl flex flex-col gap-1">
      <p className="text-sm">{a}</p>
      <p>
        <span className="text-2xl font-bold">{b}</span>{" "}
        <span className="text-sm">{c}</span>
      </p>
    </div>
  );
};

export default DisplayCard;
