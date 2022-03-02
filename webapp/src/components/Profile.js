import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user.accessToken);

  const handleLogOut = () => {
    localStorage.removeItem("user");
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await axios
      .delete(`/api/users/${user?.data?._id}`, {
        headers: { authorization: `bearer ${user.accessToken}` },
      })
      .then((response) => {
        alert(response?.data?.message);
        navigate("/login", { replace: true });
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <div>
      <h1>Profile</h1>
      <h2>Name: {user?.data?.username}</h2>
      <button onClick={handleLogOut}>Log Out</button>
      <button onClick={handleDelete}>Delete account</button>
    </div>
  );
};

export default Profile;
