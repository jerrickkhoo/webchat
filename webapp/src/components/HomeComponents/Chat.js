import { useState, useEffect } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";
import SendIcon from "@material-ui/icons/Send";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import Edit from "@material-ui/icons/Edit";

const Chat = ({ chatClicked }) => {
  console.log('chatclicked',chatClicked);
  const [messages, setMessages] = useState([]);
  const [friendData, setFriendData] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  
  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get(`/api/messages/${chatClicked?._id}`);
        console.log(response?.data?.message);
        setMessages(response?.data?.message);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [chatClicked]);
  
  useEffect(() => {
    const friendID = chatClicked.participants.find((ID) => ID !== user._id);
    const getFriend = async () => {
      try {
        const response = await axios.get(`/api/users/${friendID}`);
        setFriendData(response?.data?.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriend();
  }, [chatClicked.participants, user._id]);
  
  // handleDelete = (e) => {
    //   e.preventDefault()
    //   await axios.post(`/api/messages/`)
    //     .then((response) => {
      //       console.log(response);
      //       setFoundUsers(response?.data?.data)
      //     })
      //     .catch((err) => {
        //       alert(err.response.data.message);
        //     });
        // }
        
        const userMessages = messages.map((item, index) => {
          console.log(item)
          if (item?.senderID === user._id) {
            const deletedMessage = {
              body: 'Message deleted'
            };
          
            return (
              <p className="chatmessage chatsend">
          <div className="show">
            <span className="chatname">{item?.senderName}</span>
            {item?.body}
            <span className="chattimestamp">{item?.updatedAt}</span>
          </div>
          <div className="hide">
            {/* <EditIcon
              className="edit"
              onClick={async (e) => {
                e.preventDefault();
                await axios
                .put(`/api/messages/${item?._id}`, e.target.body.value)
                .then((response) => {
                  console.log(response);
                })
                .catch((err) => {
                  alert(err.response.data.message);
                });
              }}
              /> */}
              <DeleteIcon
                className="delete"
                onClick={async (e) => {
                  e.preventDefault();
                  await axios
                    .put(`/api/messages/delete/${item?._id}`, deletedMessage)
                    .then((response) => {
                      console.log(response);
                    })
                    .catch((err) => {
                      alert(err.response.data.message);
                    });
                }}
              />
              </div>
            
        </p>
      );
    } else {
      return (
        <p className="chatmessage">
          <div className="show">
            <span className="chatname">{item?.senderName}</span>
            {item?.body}
            <span className="chattimestamp">{item?.updatedAt}</span>
          </div>
        </p>
      );
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      body: e.target.body.value,
      chatID: chatClicked?._id,
      senderName: user.username,
      senderID: user._id
    };
    await axios
      .post(`/api/messages/`, body)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
      e.target.body.value=''
  };

  console.log(friendData);
  return (
    <div className="chat">
      <div className="chatheader">
        <Avatar src={friendData.img} />
        <div className="chatheaderinfo">
          <h3 id="chatheaderinfoh3">{friendData.username}</h3>
          {/* <p id="chatheaderinfop">Last seen at...</p> */}
        </div>
        <div className="chatheaderright">
          <IconButton>
            <SearchIcon />
          </IconButton>
        </div>
      </div>
      <div className="chatbody">{userMessages}</div>
      <div className="chatfooter">
        <form id="chatfooterform" onSubmit={handleSubmit}>
          <input
            id="chatfooterinput"
            placeholder="type here"
            type="text"
            name="body"
          />
          <IconButton type="submit">
            <SendIcon />
          </IconButton>{" "}
        </form>
      </div>
    </div>
  );
};

export default Chat;
