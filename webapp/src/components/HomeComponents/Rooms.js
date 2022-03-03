import { useState, useEffect } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import SearchIcon from "@material-ui/icons/Search";
import RoomChat from "./RoomChat";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Rooms = () => {
  const [rooms, setRooms] = useState([])
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const navigate = useNavigate();

  //get chats for userID
useEffect(() => {
  const fetchChats = async () => {
    try{
      const chats = await axios.get(`/api/chats/${user?._id}`)
      console.log(chats)
      setRooms(chats.data)
    } catch (err){
      console.log(err)
    }
    }
    fetchChats()
  },[user?._id])
  
  const userChats = rooms.map((item, index) => {
      return (<RoomChat chats={item}/>
    )})

    const settings = () => {
        navigate("/myprofile", { replace: true });
    }

  return (
    <div className="rooms">
      <div className="roomsheader">
        <Avatar src={user.img} />
        <div className="roomsheaderright">
          <span>{user.username}</span>
          <IconButton onClick={settings}>
            <SettingsIcon />
          </IconButton>
        </div>
      </div>
      <div className="roomssearch">
        <div className="roomssearchcontainer">
          <SearchIcon id="searchicon" />
          <input id="searchinput" placeholder="search for users" type="text" />
        </div>
      </div>
      <div className="roomschat">
        {userChats}
      </div>
    </div>
  );
}

export default Rooms
