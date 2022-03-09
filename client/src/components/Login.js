import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    await axios
      .post("/api/users/login", user, {})
      .then((response) => {
        if (response.data.accessToken) {
          console.log(response);
          localStorage.setItem("user", JSON.stringify(response.data.data));
          localStorage.setItem(
            "token",
            JSON.stringify(response.data.accessToken)
          );
          localStorage.setItem(
            "loggedIn",
            JSON.stringify(true)
          );
        }
        navigate("/", { replace: true });
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <div className="login">
      <div className="logincontainer">
        <h1>Log In </h1>
        <br />
        <form onSubmit={handleSubmit} >
          <div style={{ paddingBottom: "20px" }}>
            <label>E-Mail: </label>
            <input type="text" name="email" placeholder="E-Mail" />
          </div>

          <div>
            <label>Password: </label>
            <input type="password" name="password" placeholder="Password" />
          </div>

          <button className="loginbutton">Submit</button>
        </form>
        <a href="/signup">Create an Account</a>
      </div>
    </div>
  );
};

export default Login;
