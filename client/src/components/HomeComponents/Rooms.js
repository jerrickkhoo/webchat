import { useState, useEffect } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import SearchIcon from "@material-ui/icons/Search";
import RoomChat from "./RoomChat";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Rooms = ({ setChatClicked }) => {
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState(false);
  const [foundUsers, setFoundUsers] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const navigate = useNavigate();

  //get chats for userID
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const chats = await axios.get(`/api/chats/${user?._id}`);
        // console.log(chats)
        setRooms(chats.data.reverse());
      } catch (err) {
        console.log(err);
      }
    };
    fetchChats();
  }, [user?._id]);

  console.log("rooms", rooms);

  const userChats = rooms.map((item, index) => {
    //  localStorage.setItem(
    //    String(`${item?._id}`),
    //    JSON.stringify('')
    //  );
    return (
      <div
        onClick={async (e) => {
          setChatClicked(item);
          localStorage.setItem("chatClicked", JSON.stringify(item));
          e.preventDefault();
          if (user._id === item.participants[0]) {
            await axios
              .put(`/api/chats/1/del/${item._id}`)
              .then((response) => {
                console.log(response);
              })
              .catch((err) => {
                alert(err.response.data.message);
              });
          }
          if (user._id === item.participants[1]) {
            await axios
              .put(`/api/chats/2/del/${item._id}`)
              .then((response) => {
                console.log(response);
              })
              .catch((err) => {
                alert(err.response.data.message);
              });
          }

          // localStorage.setItem(
          //   String(`${item?._id}`),
          //   JSON.stringify([])
          // );
        }}
      >
        <RoomChat chats={item} />
      </div>
    );
  });

  const settings = () => {
    navigate("/myprofile", { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearch(true);
    await axios
      .get(`/api/users/search/${e.target.search.value}`)
      .then((response) => {
        console.log(response);
        setFoundUsers(response?.data?.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  console.log("rooms", rooms);
  console.log("foundusers", foundUsers);

  const searchUsers = foundUsers.map((item, index) => {
    const body = {
      senderID: user._id,
      receiverID: item?._id,
    };
    return (
      <div
        onClick={async (e) => {
          e.preventDefault();
          await axios
            .post("/api/chats", body)
            .then((response) => {
              console.log(response);
              // setFoundUsers(response?.data?.data);
              // localStorage.setItem(
              //   String(`${response?.data?.data?._id}`),
              //   JSON.stringify([])
              // );
            })
            .catch((err) => {
              console.log(err);
            });
          window.location.reload();
        }}
      >
        <div className="roomchat">
          <Avatar src={item?.img} />
          <div className="roomchatinfo">
            <h2 id="roomchath2">{item?.username}</h2>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="rooms">
      <div className="roomsheader">
        <Avatar src={user?.img} />
        <div className="roomsheaderright">
          <span>{user?.username}</span>
          <IconButton onClick={settings}>
            <SettingsIcon />
          </IconButton>
        </div>
      </div>
      <div className="roomssearch">
        <div className="roomssearchcontainer">
          <SearchIcon id="searchicon" />
          <form onSubmit={handleSubmit}>
            <input
              id="searchinput"
              placeholder="search for users"
              type="text"
              name="search"
            />
          </form>
        </div>
      </div>
      {search ? (
        <div className="roomschat">{searchUsers}</div>
      ) : (
        <div className="roomschat">{userChats}</div>
      )}
    </div>
  );
};

export default Rooms;
