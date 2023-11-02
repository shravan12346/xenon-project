import React from "react";
import "./register.css";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    const { name, email, password } = data;
    try {
      const { data } = await axios.post("/register", {
        name,
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({
          name: "",
          email: "",
          password: "",
        });

        toast.success("Register successfull, Welcome");
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="form-container
    "
    >
      <form onSubmit={handleRegister} className="form">
        <div className="form-row">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            placeholder="Enter name..."
          />
        </div>

        <div className="form-row">
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            placeholder="Enter email..."
          />
        </div>

        <div className="form-row">
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            placeholder="Enter password..."
          />
        </div>

        <button type="submit" className="btn">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
