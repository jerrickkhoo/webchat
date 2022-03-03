import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
const token = JSON.parse(localStorage.getItem("token"));

  console.log(user)

  const handleEdit = async (e) => {
    e.preventDefault();
    const userEdit = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      img: e.target.img.value,
    };
    await axios
      .put(`/api/users/${user?._id}`, userEdit, {
        headers: { authorization: `bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        alert(response?.data?.message);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        navigate("/myprofile", { replace: true });
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <div>
      <div>
        <h1>Join Us</h1>
      </div>
      <div>
        <form onSubmit={handleEdit}>
          <div>
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              defaultValue={user?.username}
              required
            />
          </div>

          <div>
            <label id="font">E-Mail</label>
            <input
              type="text"
              name="email"
              placeholder="E-Mail"
              required
              defaultValue={user?.email}
            />
          </div>

          <div>
            <label id="font">Profile Picture</label>
            <input type="text" name="img" placeholder="Image Link"  defaultValue={user?.img}/>
          </div>

          <div>
            <label id="font">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Please enter new password"
              required
            />
          </div>

          <button type="submit" id="font">
            Submit
          </button>
        </form>
        <a href="/myprofile">Back</a>
      </div>
    </div>
  );
};

export default Settings;
