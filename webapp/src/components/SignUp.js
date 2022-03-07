import React from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";



const SignUp = () => {
  const navigate = useNavigate();


const handleSignUp = async (e) => {
  e.preventDefault()
    const newUser = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    await axios
      .post("/api/users/signup", newUser)
      .then((response) => {
          console.log(response)
        alert(response?.data?.message);
        navigate("/login", { replace: true });
      })
      .catch((err) => {
        alert(err.response.data.message);
      });

}


  return (
    <div className="login">
      <div className="logincontainer">
        <h1>Join Us</h1>
        <br />
      <div>
        <form onSubmit={handleSignUp}>
          <div>
            <label>Username: </label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              />
          </div>

          <div>
            <label id="font">E-Mail: </label>
            <input type="text" name="email" placeholder="E-Mail" required />
          </div>

          <div>
            <label id="font">Password: </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              />
          </div>

          <button type="submit" className='loginbutton'>
            Submit
          </button>
        </form>
        <a href="/login">Log In</a>
        </div>
      </div>
    </div>
  );
}

export default SignUp