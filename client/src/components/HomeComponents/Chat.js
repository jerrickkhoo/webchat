import { useState, useEffect } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";
import SendIcon from "@material-ui/icons/Send";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import Edit from "@material-ui/icons/Edit";
import Pusher from "pusher-js";
import dayjs from "dayjs";

const Chat = ({ chatClicked }) => {
  // console.log('chatclicked',chatClicked);
  const [messages, setMessages] = useState([]);
  const [friendData, setFriendData] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("chatclicked", chatClicked);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get(`/api/messages/${chatClicked?._id}`);
        // console.log(response?.data?.message);
        setMessages(response?.data?.message);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [chatClicked._id]);

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

  // console.log(messages)

  useEffect(
    (e) => {
      const pusher = new Pusher("37faff3d0d75937717d5", {
        cluster: "ap1",
      });
      const channel = pusher.subscribe("messages");
      channel.bind("inserted", function (data) {
        console.log(data);
        if (data?.chatID === chatClicked?._id) {
          setMessages([...messages, data])};

        if (data?.senderID === chatClicked?.participants[0]) {
            const updateNoti2 = async () => {
              try {
                const response = await axios.put(`/api/chats/2/${data?.chatID}`);
                console.log(response?.data?.data);
              } catch (err) {
                console.log(err);
              }
            };
            updateNoti2();
        }
        if (data?.senderID === chatClicked?.participants[1]) {
          const updateNoti1 = async () => {
            try {
              const response = await axios.put(`/api/chats/1/${data?.chatID}`);
              console.log(response?.data?.data);
            } catch (err) {
              console.log(err);
            }
          };
          updateNoti1();
        }
      });
      return () => {
        channel.unbind_all();
        channel.unsubscribe();
      };
    },
    [messages, chatClicked._id, chatClicked.participants]
  );

  const userMessages = messages.map((item, index) => {
    // console.log(messages)
    if (item?.senderID === user._id) {
      const deletedMessage = {
        body: "Message deleted",
      };
     
      return (
        <p className="chatmessage chatsend">
          <div className="show">
            <span className="chatname">{item?.senderName}</span>
            {item?.body}
            <span className="chattimestamp">
              {dayjs(item?.updatedAt).format("MMMM D, YYYY h:mm A	")}
            </span>
          </div>
          <div className="hide">
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
            <span className="chattimestamp">
              {dayjs(item?.updatedAt).format("MMMM D, YYYY h:mm A	")}
            </span>
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
      senderID: user._id,
    };
    await axios
      .post(`/api/messages/`, body)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
    e.target.body.value = "";
  };

//  window.setTimeout(function () {
//    window.location.reload();
//  }, 30000);

  return (
    <div className="chat">
      <div className="chatheader">
        <Avatar src={friendData.img} />
        <div className="chatheaderinfo">
          <h3 id="chatheaderinfoh3">{friendData.username}</h3>
          {/* <p id="chatheaderinfop">Last seen at...</p> */}
        </div>
        {/* <div className="chatheaderright">
        </div> */}
      </div>
      <div className="chatbody">
        <div className="chatbody2">{userMessages}</div>
      </div>
      <div className="chatfooter">
        <form id="chatfooterform" onSubmit={handleSubmit}>
          <input
            id="chatfooterinput"
            placeholder="type here"
            type="text"
            name="body"
            required
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
