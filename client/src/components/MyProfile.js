import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import SettingsIcon from "@material-ui/icons/Settings";
import DeleteIcon from "@material-ui/icons/Delete";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";


const MyProfile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));

  // console.log(user);
  // console.log(token)

  const handleLogOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.setItem("loggedIn", JSON.stringify(false));
    localStorage.removeItem("chat");
    localStorage.removeItem('chatClicked')
    navigate("/login", { replace: true });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await axios
      .delete(`/api/users/${user?._id}`, {
        headers: { authorization: `bearer ${token}` },
      })
      .then((response) => {
        alert(response?.data?.message);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("loggedIn");
        navigate("/login", { replace: true });
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const handleSettings = (e) => {
    e.preventDefault();
    navigate("/settings", { replace: true });
  };

  return (
    <div className="profile">
      <h1> My Profile</h1>
      <div className="profilecontainer">
        <div className="profileimg">
          <img
            style={{ height: "200px", borderRadius: "50%" }}
            src={user?.img}
            alt="profile pic"
          />
        </div>
        <div className="profilebody">
          <div>
            <h2>{user?.username}</h2>
            <h2>{user?.email}</h2>
          </div>
          <div className="profilebuttons">
            <SettingsIcon onClick={handleSettings} style={{ color: "grey" }} />
            <DeleteIcon onClick={handleDelete} style={{ color: "red" }} />
            <ExitToAppIcon onClick={handleLogOut} style={{ color: "green" }} />
          </div>
        </div>
      </div>
      <a href="/" style={{ color: "green" }}>
        <ArrowBackIosIcon />
      </a>
    </div>
  );
};

export default MyProfile;
