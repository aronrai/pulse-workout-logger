import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { useEffect } from "react";
import useAuthStore from "./store/useAuthStore";
import Loading from "./components/Loading";
import ProtedtedRoutes from "./components/ProtectedRoutes";
import LogHistory from "./pages/LogHistory";

const App = () => {
  const isInitialising = useAuthStore((state) => state.isInitialising);
  const fetchUser = useAuthStore((state) => state.fetchUser);
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (isInitialising) {
    return <Loading />;
  }
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtedtedRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/log-history" element={<LogHistory />} />
        </Route>
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
