import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import useAuthStore from "../store/useAuthStore";

const Login = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loggingIn, setLoggingIn] = useState(false);
  const navigate = useNavigate();
  const handleFormDataChange = (e) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = formData;
    if (username.length < 3 || password.length < 8) {
      alert("Bad data my boy;");
      return;
    }
    (async () => {
      try {
        setLoggingIn(true);
        const response = await api.post("/users/login", formData);
        const data = response.data;
        setUser(data.data);
        navigate("/");
        localStorage.setItem("token", data.token);
      } catch (err) {
        alert(err.response.data.message);
        console.error(`Error: ${err.response.data.message}`);
      } finally {
        setLoggingIn(false);
      }
    })();
  };
  return (
    <section className="flex flex-col justify-center items-center gap-4 max-w-2xl px-4 py-16 mx-auto min-h-[calc(100vh-64px)]">
      <h2 className="text-2xl">Log in to Pulse</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 w-full max-w-75"
      >
        <input
          type="text"
          placeholder="username"
          name="username"
          value={formData.username}
          onChange={handleFormDataChange}
          required
          className="text-sm px-4 py-2 outline-none rounded-sm border"
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={formData.password}
          onChange={handleFormDataChange}
          required
          className="text-sm px-4 py-2 outline-none rounded-sm border"
        />
        <button
          className={`text-sm text-[#333] font-medium px-4 py-2 outline-none rounded-sm ${loggingIn ? "bg-black" : "bg-lime-400 cursor-pointer"}`}
        >
          {loggingIn ? "Logging In..." : "Login"}
        </button>
      </form>
      <p className="text-sm">
        Don't have an account? <Link to="/auth/signup">Sign Up</Link>
      </p>
    </section>
  );
};

export default Login;
