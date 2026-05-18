import { useEffect, useState } from "react";
import DisplayCard from "../components/DisplayCard";
import formatDate from "../utils/formatDate";
import useAuthStore from "../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import useLogStore from "../store/useLogStore";
import nameInitial from "../utils/nameInitial";

const Profile = () => {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const totalVolume = useLogStore((state) => state.totalVolume);
  const fetchTotalVolume = useLogStore((state) => state.fetchTotalVolume);

  useEffect(() => {
    fetchTotalVolume();
  }, [fetchTotalVolume]);

  const [logoutMenu, setLogoutMenu] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/auth/login");
  };

  return (
    <section className="flex flex-col gap-8 max-w-2xl px-4 py-16 mx-auto min-h-[calc(100vh-64px)]">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 flex justify-center items-center bg-[#222] rounded-full">
          <p className="text-2xl">{nameInitial(user.name)}</p>
        </div>
        <div className="felx flex-col gap-2">
          <p className="text-sm text-zinc-300">{user.name}</p>
          <p className="text-sm text-zinc-300">
            Member since {formatDate(user.createdAt)}
          </p>
        </div>
      </div>
      {/* <div className="flex items-center gap-2 "> */}
      <DisplayCard
        a="Total Volume"
        b={totalVolume ? totalVolume : totalVolume === 0 ? 0 : "- - -"}
        c="kg"
      />
      {/* </div> */}
      <div className="w-full h-px bg-zinc-900 mt-8"></div>
      <Link to="/log-history" className="text-sm text-zinc-300">
        Log History
      </Link>
      {logoutMenu ? (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-zinc-300">Are you sure?</p>
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 cursor-pointer"
            >
              Yes
            </button>
            <button
              onClick={() => setLogoutMenu(false)}
              className="text-sm text-zinc-300 cursor-pointer"
            >
              No
            </button>
          </div>
        </div>
      ) : (
        <button
          className="text-sm text-red-500 w-fit cursor-pointer"
          onClick={() => setLogoutMenu(true)}
        >
          Logout
        </button>
      )}
    </section>
  );
};

export default Profile;
