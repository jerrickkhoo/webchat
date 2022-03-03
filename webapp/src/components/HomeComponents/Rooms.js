import React from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import SettingsIcon from "@material-ui/icons/Settings";
import SearchIcon from "@material-ui/icons/Search";
import RoomChat from './RoomChat'

const Rooms = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user)

  return (
    <div className="rooms">
      <div className="roomsheader">
        <Avatar src={user.img} />
        <div className="roomsheaderright">
          <span>{user.username}</span>
          <IconButton>
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
        <RoomChat />
        <RoomChat />
      </div>
    </div>
  );
}

export default Rooms