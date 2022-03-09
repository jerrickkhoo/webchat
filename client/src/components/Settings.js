import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import DoneIcon from "@material-ui/icons/Done";


const Settings = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));

  console.log(user);

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
    <div className="settings">
      <h1>Settings</h1>
      <div className="settingscontainer">
        <div>
          <form onSubmit={handleEdit}>
        
            <div style={{ padding: "10px" }}>
              <label>Username: </label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                defaultValue={user?.username}
                required
              />
            </div>

            <div style={{ padding: "10px" }}>
              {" "}
              <label id="font">E-Mail: </label>
              <input
                type="text"
                name="email"
                placeholder="E-Mail"
                required
                defaultValue={user?.email}
              />
            </div>

            <div style={{ padding: "10px" }}>
              {" "}
              <label id="font">Profile Picture: </label>
              <input
                type="text"
                name="img"
                placeholder="Image Link"
                defaultValue={user?.img}
              />
            </div>

            <div style={{ padding: "10px" }}>
              {" "}
              <label id="font">Password: </label>
              <input
                type="password"
                name="password"
                placeholder="Please enter new password"
                required
              />
            </div>
            <DoneIcon type="submit" className="loginbutton" />
          </form>
          <div style={{ padding: "10px" }}></div>
          <a href="/myprofile" style={{ color: "green" }}>
            <ArrowBackIosIcon />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Settings;
