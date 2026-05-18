import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import nameInitial from "../utils/nameInitial";

const Header = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <header className="flex justify-between items-center h-16 max-w-2xl px-4 mx-auto border-b border-zinc-900">
      <div className="text-2xl">PULSE</div>
      <nav>
        <ul className="text-sm text-zinc-300 flex items-center gap-4">
          <li>
            <Link to="/">Home</Link>
          </li>
          {user ? (
            <li>
              <div className="h-8 w-8 bg-[#222] rounded-full flex justify-center items-center cursor-pointer">
                <Link to="/profile" className="text-xs">
                  {nameInitial(user.name)}
                </Link>
              </div>
            </li>
          ) : (
            <>
              <li>
                <Link to="/auth/signup">Get Started</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
