import React from "react";
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import SendIcon from "@material-ui/icons/Send";

const Chat = () => {
  return (
    <div className="chat">
      <div className="chatheader">
        <Avatar />
        <div className="chatheaderinfo">
          <h3 id="chatheaderinfoh3">FriendName</h3>
          <p id="chatheaderinfop">Last seen at...</p>
        </div>
        <div className="chatheaderright">
          <IconButton>
            <SearchIcon />
          </IconButton>
        </div>
      </div>
      <div className="chatbody">
        <p className="chatmessage">
          <span className="chatname">FriendName</span>
          Message body
          <span className="chattimestamp">timestamp</span>
        </p>

        <p className="chatmessage">
          <span className="chatname">FriendName</span>
          Message body
          <span className="chattimestamp">timestamp</span>
        </p>

        <p className="chatsend chatmessage">
          <span className="chatname">MyName</span>
          Message body
          <span className="chattimestamp">timestamp</span>
        </p>
      </div>
      <div className="chatfooter">
        <form id='chatfooterform'>
          <input id='chatfooterinput' placeholder="type here" type="text" />
          <IconButton type='submit'>
            <SendIcon />
          </IconButton>{" "}
        </form>
      </div>
    </div>
  );
};

export default Chat;
