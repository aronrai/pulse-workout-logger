const nameInitial = (name) => {
  return name.split(" ").map((w) => w.charAt(0));
};

export default nameInitial;
