import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [signingUp, setSigningUp] = useState(false);
  const handleFormDataChange = (e) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, username, password, confirmPassword } = formData;
    if (
      name.length < 2 ||
      username.length < 2 ||
      password.length < 7 ||
      password !== confirmPassword
    ) {
      alert("Wrong data my boy;");
      return;
    }
    (async () => {
      try {
        setSigningUp(true);
        const response = await api.post("/users/signup", formData);
        const data = response.data;
        alert(data.message);
        setFormData({
          name: "",
          username: "",
          password: "",
          confirmPassword: "",
        });
      } catch (err) {
        console.error(`Error: ${err.response.data.message}`);
      } finally {
        setSigningUp(false);
      }
    })();
  };
  useEffect(() => {
    console.log(formData);
  });
  return (
    <section className="flex flex-col justify-center items-center gap-4 max-w-2xl px-4 py-16 mx-auto min-h-[calc(100vh-64px)]">
      <h2 className="text-2xl">Get Started on Pulse</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-75">
        <input
          type="text"
          placeholder="Jone Doe"
          name="name"
          value={formData.name}
          onChange={handleFormDataChange}
          className="text-sm px-4 py-2 outline-none rounded-sm border"
        />
        <input
          type="text"
          placeholder="username"
          name="username"
          value={formData.username}
          onChange={handleFormDataChange}
          className="text-sm px-4 py-2 outline-none rounded-sm border"
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={formData.password}
          onChange={handleFormDataChange}
          className="text-sm px-4 py-2 outline-none rounded-sm border"
        />
        <input
          type="password"
          placeholder="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleFormDataChange}
          className="text-sm px-4 py-2 outline-none rounded-sm border"
        />
        <button
          className={`text-sm text-[#333] font-medium px-4 py-2 outline-none rounded-sm ${signingUp ? "bg-black" : "bg-lime-400 cursor-pointer"}`}
          disabled={signingUp}
        >
          {signingUp ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      <p className="text-sm">
        Already have an account? <Link to="/auth/login">Log in</Link>
      </p>
    </section>
  );
};

export default SignUp;
