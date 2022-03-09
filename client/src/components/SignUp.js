import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')

   function searchEmail(e) {
    setEmail(e.target.value);
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    const newUser = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    await axios
      .post("/api/users/signup", newUser)
      .then((response) => {
        console.log(response);
        alert(response?.data?.message);
        navigate("/login", { replace: true });
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

    
    useEffect(() => {
    const sameUser = async () => {
      try {
        const response = await axios.get(`/api/users/searchemail/${email}`);
        if(response?.data?.data.length === 1){
          alert('Email has been taken')
        }
      } catch (err) {
        console.log(err);
      }
    };
    sameUser();
  }, [email]);

  return (
    <div className="login">
      <div className="logincontainer">
        <h1>Join Us</h1>
        <br />
        <div>
          <form onSubmit={handleSignUp}>
            <div style={{ paddingBottom: "20px" }}>
              <label>Username: </label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
              />
            </div>

            <div style={{ paddingBottom: "20px" }}>
              <label>E-Mail: </label>
              <input
                type="text"
                name="email"
                placeholder="E-Mail"
                required
                onChange={searchEmail}
              />
            </div>

            <div>
              <label>Password: </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>

            <button type="submit" className="loginbutton">
              Submit
            </button>
          </form>
          <a href="/login">Log In</a>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
