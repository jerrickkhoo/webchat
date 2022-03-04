import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));

  console.log(user);
  console.log(token)

  const handleLogOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
          localStorage.setItem("loggedin", JSON.stringify(false));
    localStorage.removeItem("chat");
    navigate('/login', {replace: true})

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
    e.preventDefault()
    navigate('/settings', {replace: true})
  }

  return (
    <div>
      <h1>Profile</h1>
      <img style={{height: '200px'}}src={user?.img} alt='profile pic'/>
      <h2>Username: {user?.username}</h2>
      <h2>E-mail: {user?.email}</h2>

      <button onClick={handleSettings}>Settings</button>
      <button onClick={handleLogOut}>Log Out</button>
      <button onClick={handleDelete}>Delete account</button>
    </div>
  );
};

export default MyProfile;
