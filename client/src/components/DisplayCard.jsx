const DisplayCard = ({ a, b, c }) => {
  return (
    <div className="flex-1 p-4 bg-[#222] rounded-2xl flex flex-col gap-1">
      <p className="text-sm text-zinc-300">{a}</p>
      <p>
        <span className="text-2xl font-bold">{b}</span>{" "}
        <span className="text-sm text-zinc-300">{c}</span>
      </p>
    </div>
  );
};

export default DisplayCard;
