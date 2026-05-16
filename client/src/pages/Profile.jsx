import { useEffect, useState } from "react";
import DisplayCard from "../components/DisplayCard";
import formatDate from "../utils/formatDate";
import useAuthStore from "../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import useLogStore from "../store/useLogStore";

const Profile = () => {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const totalVolume = useLogStore((state) => state.totalVolume);
  // const currentVolume = useLogStore((state) => state.currentVolume);
  const fetchTotalVolume = useLogStore((state) => state.fetchTotalVolume);

  useEffect(() => {
    fetchTotalVolume();
  }, [fetchTotalVolume]);

  const nameInitial = user.name.split(" ").map((w) => w.charAt(0));
  const [logoutMenu, setLogoutMenu] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/auth/login");
  };

  return (
    <section className="flex flex-col gap-8 max-w-2xl px-4 py-16 mx-auto min-h-[calc(100vh-64px)]">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 flex justify-center items-center bg-[#333] rounded-full">
          <p className="text-2xl">{nameInitial}</p>
        </div>
        <div className="felx flex-col gap-2">
          <p className="text-sm">{user.name}</p>
          <p className="text-sm">Member since {formatDate(user.createdAt)}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <DisplayCard
          a="Total Volume"
          b={totalVolume ? totalVolume : "- - -"}
          c="kg"
        />
      </div>
      <div className="w-full h-px bg-[#333]"></div>
      <button className="text-sm w-fit cursor-pointer">
        <Link to="/log-history">Log History</Link>
      </button>
      <button className="text-sm w-fit cursor-pointer">Change Password</button>
      {logoutMenu ? (
        <div className="flex flex-col gap-4">
          <p className="text-sm">Are you sure?</p>
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="text-sm px-4 py-0.5 rounded-sm border-x cursor-pointer"
            >
              Yes
            </button>
            <button
              onClick={() => setLogoutMenu(false)}
              className="text-sm px-4 py-0.5 rounded-sm border-x cursor-pointer"
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
